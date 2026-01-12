import Link from "next/link";
import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
  href?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const ButtonComponent = ({ children, className, ...props }: Props) => {
  if (props.href) {
    return (
      <Link className={`btn ${className}`} href={props.href}>
        {children}
      </Link>
    );
  }
  return (
    <button className={`btn ${className}`} {...props}>
      {children}
    </button>
  );
};

export default ButtonComponent;
