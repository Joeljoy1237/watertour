import React from "react";

interface ButtonProps {
  className?: string;
  title: string;
}

const Button = (props: ButtonProps) => {
  return (
    <button className={`${props.className} items-center`}>{props.title}</button>
  );
};

export default Button;
