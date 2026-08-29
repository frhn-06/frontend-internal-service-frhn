import { ChevronLeft, ChevronRight } from "lucide-react"

interface TypeProps {
  onClick: () => void;
  sidebarActive: boolean;
}
const ToggleSidebarDekstop = (props: TypeProps) => {
  const {
    onClick,
    sidebarActive
  } = props;

  return (
    <div onClick={onClick} className="hidden lg:block rounded-full border-1 border-gray-400 shadow bg-white absolute left-0 -translate-x-1/2 top-1/2 -translate-y-1/2 cursor-pointer hover:bg-gray-100">
      {sidebarActive ? 
        <ChevronRight className="text-text-element" /> :
        <ChevronLeft className="text-text-element" />
      }
    </div>
  )
}

export default ToggleSidebarDekstop;