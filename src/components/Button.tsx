import React from "react";

interface ButtonProps {
  className?: string;
  title: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  style?: React.CSSProperties;
}

const Button: React.FC<ButtonProps> = (props: ButtonProps) => {
  const { className, title, onClick, type = "button", disabled, style } = props;

  return (
    <button
      type={type || "button"}
      onClick={onClick}
      disabled={disabled}
      className={`${className} bg-primary text-white px-4 py-2 rounded-lg hover:bg-[#4A9453] transition `}
      style={style}
    >
      {title}
    </button>
  );
};

export default Button;
