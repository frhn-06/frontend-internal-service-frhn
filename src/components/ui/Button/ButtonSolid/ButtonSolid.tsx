import { Button } from "@heroui/react"

interface TypeProps {
  children: React.ReactNode;
  className?: string;
  onPress?: () => void;
  isIconOnly?: boolean;
  type?: "button" | "submit" | "reset";
  fullWidth?: boolean;
  isDisabled?: boolean
}
const ButtonSolid = (props: TypeProps) => {
  const {
    children,
    className,
    onPress,
    isIconOnly = false,
    type = "button",
    fullWidth = false,
    isDisabled
  } = props;



  return (
    <Button 
      className={"bg-background-element hover:bg-background-element-hover active:bg-background-element" + " " + className}
      onPress={onPress}
      isIconOnly={isIconOnly}
      type={type}
      fullWidth={fullWidth}
      isDisabled={isDisabled}
    >
      {children}
    </Button>
  )
}

export default ButtonSolid