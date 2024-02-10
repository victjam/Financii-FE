import { FC, ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  onClick: () => void;
  fontSize?: string;
  uppercase?: boolean;
  width?: string;
  color?: string;
  text: string;
}

const Button: FC<ButtonProps> = ({
  onClick,
  fontSize = "font-md",
  uppercase = false,
  width = "w-full",
  color = "from-primary via-primary to-primaryDark",
  text,
  ...props
}) => {
  const textTransform = uppercase ? "uppercase" : "none";

  return (
    <button
      onClick={onClick}
      className={`mt-10 transition-background inline-flex h-10 ${width} text-white items-center justify-center rounded-md bg-gradient-to-r ${color} bg-[length:200%_200%] bg-[0%_0%] px-6 ${fontSize} duration-500 hover:bg-[100%_200%] focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2`}
      style={{ textTransform }}
      {...props}
    >
      {text}
    </button>
  );
};

export default Button;
