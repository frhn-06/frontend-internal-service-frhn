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
  slot?: "close"
}
const ButtonFlat = (props: TypeProps) => {
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
    href,
    slot
  } = props;



  return (
    as === "link" ? 
      <Link href={href || ""}>
        <Button 
          className={"bg-gray-200 text-text-element hover:bg-gray-250 active:bg-gray-200" + " " + className}
          onPress={onPress}
          isIconOnly={isIconOnly}
          type={type}
          fullWidth={fullWidth}
          isDisabled={isDisabled}
          size={size}
          slot={slot}
        >
          {children}
        </Button>
      </Link> :
      <Button 
        className={"bg-gray-200 text-text-element hover:bg-gray-250 active:bg-gray-200" + " " + className}
        onPress={onPress}
        isIconOnly={isIconOnly}
        type={type}
        fullWidth={fullWidth}
        isDisabled={isDisabled}
        size={size}
        slot={slot}
      >
        {children}
      </Button>
  )
}

export default ButtonFlat