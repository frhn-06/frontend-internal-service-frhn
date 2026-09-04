import { Label, ListBox, Select } from "@heroui/react";

interface TypeProps {
  currentSelect?: string;
  handleSelect?: (value: string) => void;
  label?: string;
  listSelect?: {
    id: string;
    label: string;
  }[];
}

const SelectUi = (props: TypeProps) => {
  const {
    currentSelect,
    handleSelect,
    label = "Status",
    listSelect = []
  } = props;

  return (
    <Select
      className="w-[256px]"
      value={currentSelect}
      onChange={(key) => {
        if (key) { 
          handleSelect?.(key.toString()); 
        }
      }}
      selectionMode="single"
    >
      <Label>
        {label}
      </Label>
                
      <Select.Trigger>
        <Select.Value>
          {listSelect.find((item) => {
            console.log(item.id);
            console.log(currentSelect)
            return  item.id === currentSelect
          })?.label}
        </Select.Value>
        <Select.Indicator />
      </Select.Trigger>
                
      <Select.Popover>
        <ListBox>
          {listSelect.map((item) => (
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

export default SelectUi;