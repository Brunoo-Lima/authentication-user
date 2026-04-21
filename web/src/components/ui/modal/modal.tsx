import { RefObject, useRef, useEffect } from 'react';
import s from './modal.module.css';
import { createPortal } from 'react-dom';
import { useOutside } from '../../../hooks/use-outside';
import { Button } from '../button/button';

interface IRootProps {
  children: React.ReactNode;
  classNameCustom?: string;
  onClose?: () => void;
}

export const Root = ({ children, classNameCustom, onClose }: IRootProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const portalRef = useRef<HTMLElement | null>(null);

  useOutside(ref as RefObject<HTMLElement>, onClose as () => void);

  useEffect(() => {
    const el = document.createElement('div');
    el.setAttribute('id', 'modal-root');

    document.body.appendChild(el);
    portalRef.current = el;

    return () => {
      document.body.removeChild(el);
    };
  }, []);

  if (!portalRef.current) return null;

  return createPortal(
    <div className={s.modal__overlay}>
      <div ref={ref} className={`${s.modal__wrapper} ${classNameCustom}`}>
        {children}
      </div>
    </div>,
    portalRef.current,
  );
};

interface IHeaderProps {
  classNameCustom?: string;
  children: React.ReactNode;
}

export const Header = ({ children, classNameCustom }: IHeaderProps) => {
  return <div className={`${s.header} ${classNameCustom}`}>{children}</div>;
};

interface ITitleProps {
  children: React.ReactNode;
}

export const Title = ({ children }: ITitleProps) => {
  return <h2 className={s.title}>{children}</h2>;
};

interface IButtonCloseProps {
  children: React.ReactNode;
  onClose: () => void;
}

export const ButtonClose = ({ children, onClose }: IButtonCloseProps) => {
  return (
    <Button type="button" variant="ghost" onClick={onClose}>
      {children}
    </Button>
  );
};

interface IContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  classNameCustom?: string;
}

export const Content = ({ children, classNameCustom }: IContentProps) => {
  return <div className={`${s.content} ${classNameCustom}`}>{children}</div>;
};
