import { Button } from "@heroui/react"
import Link from "next/link";

interface TypeProps {
  children: React.ReactNode;
  className?: string;
  onPress?: () => void;
  isIconOnly?: boolean;
  type?: "button" | "submit" | "reset";
  fullWidth?: boolean;
  isDisabled?: boolean;
  size?: "sm" | "md" | "lg"; 
  as?: "link" | "button";
  href?: string;
}
const ButtonSolid = (props: TypeProps) => {
  const {
    children,
    className,
    onPress,
    isIconOnly = false,
    type = "button",
    fullWidth = false,
    isDisabled,
    size = "md",
    as = "button",
    href
  } = props;



  return (
    as === "link" ? 
      <Link href={href || ""}>
        <Button 
          className={"bg-background-element hover:bg-background-element-hover active:bg-background-element" + " " + className}
          onPress={onPress}
          isIconOnly={isIconOnly}
          type={type}
          fullWidth={fullWidth}
          isDisabled={isDisabled}
          size={size}
        >
          {children}
        </Button>
      </Link> :
      <Button 
        className={"bg-background-element hover:bg-background-element-hover active:bg-background-element" + " " + className}
        onPress={onPress}
        isIconOnly={isIconOnly}
        type={type}
        fullWidth={fullWidth}
        isDisabled={isDisabled}
        size={size}
      >
        {children}
      </Button>
  )
}

export default ButtonSolid