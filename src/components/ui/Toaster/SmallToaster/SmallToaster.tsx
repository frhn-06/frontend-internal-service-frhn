import cn from "@/utils/cn";

interface TypeProps {
  message: string;
  type: "success" | "error";
}

const SmallToaster = (props: TypeProps) => {
  const { message, type } = props;


  return (
    <div className="fixed top-0 right-0 m-4 z-50">
      <div className={cn("shadow-lg rounded-xl p-4 border-2 max-w-xs", {
        "bg-green-100 border-green-600" : type === "success",
        "bg-red-100 border-red-600" : type === "error"
      })}>
        <p className={cn({
          "text-green-600" : type === "success",
          "text-red-600" : type === "error"
        })}>
          {message}
        </p>
      </div>
    </div>
  )
}

export default SmallToaster