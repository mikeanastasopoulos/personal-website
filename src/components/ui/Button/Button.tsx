import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';
import styles from './Button.module.css';

type Variant = 'primary' | 'ghost';

type CommonProps = {
  variant?: Variant;
  small?: boolean;
  children: ReactNode;
  className?: string;
};

type AnchorButtonProps = CommonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
  };

type NativeButtonProps = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

type ButtonProps = AnchorButtonProps | NativeButtonProps;

const classNames = (variant: Variant, small: boolean | undefined, className: string | undefined) => {
  return [styles.button, styles[variant], small ? styles.small : '', className].filter(Boolean).join(' ');
};

const Button = ({ variant = 'primary', small, children, className, ...props }: ButtonProps) => {
  const classes = classNames(variant, small, className);

  if ('href' in props && props.href !== undefined) {
    const { href, ...anchorProps } = props as AnchorButtonProps;
    return (
      <a href={href} className={classes} {...anchorProps}>
        {children}
      </a>
    );
  }

  const buttonProps = props as NativeButtonProps;
  return (
    <button type="button" className={classes} {...buttonProps}>
      {children}
    </button>
  );
};

export default Button;
