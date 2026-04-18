import axios, { AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios';

// ── Tipo para os itens da fila ────────────────────────────────
interface QueueItem {
  resolve: (token: string) => void;
  reject: (error: unknown) => void;
}

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
});

// ─── REQUEST: injeta o token em toda requisição ───────────────
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('accessToken');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error),
);

// ─── RESPONSE: trata erros globalmente ───────────────────────
let isRefreshing = false;
let failedQueue: QueueItem[] = [];

const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    error ? prom.reject(error) : prom.resolve(token!);
  });
  failedQueue = [];
};

// Extende o tipo de config para incluir o flag _retry
interface RetryConfig extends AxiosRequestConfig {
  _retry?: boolean;
}

api.interceptors.response.use(
  (response) => response.data,

  async (error) => {
    const originalRequest: RetryConfig = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise<string>((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers = {
              ...originalRequest.headers,
              Authorization: `Bearer ${token}`,
            };
            return api(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refreshToken = localStorage.getItem('refreshToken');
        const { data } = await axios.post<{ accessToken: string }>(
          `${import.meta.env.VITE_API_URL}/auth/refresh`,
          { refreshToken },
        );

        localStorage.setItem('accessToken', data.accessToken);
        api.defaults.headers.common.Authorization = `Bearer ${data.accessToken}`;

        processQueue(null, data.accessToken);
        return api(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        localStorage.clear();
        window.location.href = '/';
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    const message: string =
      error.response?.data?.message ?? 'Ocorreu um erro. Tente novamente.';
    return Promise.reject(new Error(message));
  },
);

export default api;
