interface ButtonProps {
  variant?: "primary" | "secondary";
  outline?: boolean;
  onClick?: () => void;
  type?: "button" | "submit" | "reset" | undefined;
  children: React.ReactNode;
}

const Button = ({
  variant = "primary",
  outline = false,
  onClick,
  type,
  children,
}: ButtonProps) => {
  const btnClass = outline
    ? `btn btn-outline-${variant}`
    : `btn btn-${variant}`;

  return (
    <button type={type} className={btnClass} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
