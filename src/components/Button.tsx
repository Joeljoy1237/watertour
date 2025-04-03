import React from "react";

interface ButtonProps {
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
  title: string;
  icon?: React.ReactNode; // Use React.ReactNode for icon to support various icon types
  position?: "left" | "right";
  type?: "submit" | "reset" | "button";
}

export default function Button({
  disabled,
  className,
  onClick,
  title,
  icon,
  type = "button",
  position = "right", // Default position is now "right"
}: ButtonProps) {
  return (
    <button
      disabled={disabled}
      className={className}
      type={type}
      onClick={onClick}
    >
      {position === "left" && icon}
      {title}
      {position === "right" && icon}
    </button>
  );
}
