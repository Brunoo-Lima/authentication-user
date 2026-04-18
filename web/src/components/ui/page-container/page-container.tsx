import s from './page-container.module.css';

interface IPageContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  classNameCustom?: string;
  children: React.ReactNode;
}
export const PageContainer = ({
  classNameCustom,
  children,
}: IPageContainerProps) => {
  return (
    <section className={`${s.page__container__wrapper} ${classNameCustom}`}>
      {children}
    </section>
  );
};
