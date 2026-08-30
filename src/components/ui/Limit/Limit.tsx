import { listLimit } from "@/configs/tableConfig";
import { Label, ListBox, Select } from "@heroui/react";

interface TypeProps {
  currentLimit: string;
  handleLimit?: (value: string) => void;
  label?: string;
}
const Limit = (props: TypeProps) => {
  const {
    currentLimit,
    handleLimit,
    label = "Baris"
  } = props;

  return (
    <Select
      className="w-[256px]"
      value={currentLimit}
      onChange={(key) => {
        if (key) { 
          handleLimit?.(key.toString()); 
        }
      }}
      selectionMode="single"
    >
      <Label>
        {label}
      </Label>

      <Select.Trigger>
        <Select.Value>
          {currentLimit}
        </Select.Value>
        <Select.Indicator />
      </Select.Trigger>

      <Select.Popover>
        <ListBox>
          {listLimit.map((item) => (
            <ListBox.Item 
              key={item.id} 
              id={item.id} 
              textValue={item.label}
            >  
              {item.label}
  
              <ListBox.ItemIndicator />
            </ListBox.Item>
          ))}
        </ListBox>
      </Select.Popover>
    </Select>
  )
}

export default Limit;