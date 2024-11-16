import React, { useRef } from "react";

interface ButtonProps {
  variant?: "primary" | "secondary";
  outline?: boolean;
  onClick?: () => void;
  type?: "button" | "submit" | "reset" | undefined;
  className?: string;
  children: React.ReactNode;
}

const Button = ({
  variant = "primary",
  outline = false,
  onClick,
  type,
  className = "",
  children,
}: ButtonProps) => {
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const handleRipple = (event: React.MouseEvent<HTMLButtonElement>) => {
    const button = buttonRef.current;
    if (button) {
      const rect = button.getBoundingClientRect();
      const ripple = document.createElement("span");
      const size = Math.max(rect.width, rect.height);
      const x = event.clientX - rect.left - size / 2;
      const y = event.clientY - rect.top - size / 2;

      ripple.style.width = `${size}px`;
      ripple.style.height = `${size}px`;
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;
      ripple.className = "ripple";

      button.appendChild(ripple);

      ripple.addEventListener("animationend", () => {
        ripple.remove();
      });
    }
    if (onClick) onClick();
  };

  const btnClass = outline
    ? `btn btn-outline-${variant}`
    : `btn btn-${variant}`;

  return (
    <button
      ref={buttonRef}
      type={type}
      className={`${btnClass} ripple-container ${className}`}
      onClick={handleRipple}
    >
      {children}
    </button>
  );
};

export default Button;
