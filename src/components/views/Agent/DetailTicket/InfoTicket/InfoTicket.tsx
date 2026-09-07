"use client";

import { selectStatusMyTicket, selectStatusTicket } from "@/configs/inputFormConfig";
import { ITicket } from "@/types/ticket";
import Convert from "@/utils/convert.";
import { Button, Card, Chip, Dropdown, Header, Label, ListBox, Select} from "@heroui/react";
import { useEffect, useMemo } from "react";
import useInfoTicket from "./useInfoTicket";

interface TypeProps {
  data: ITicket;
  refetch: () => void;
}


const InfoTicket = (props: TypeProps) => {
  const {
    data,
    refetch,
  } = props;

  const {
    isPendingChangeStatusTake,
    isSuccessChangeStatusTake,

    isPendingChangeStatusNextProgress,
    isSuccessChangeStatusNextProgress,
    isErrorChangeStatusNextProgress,

    isPendingChangeStatusAwait,
    isSuccessChangeStatusAwait,
    isErrorChangeStatusAwait,

    isPendingChangeStatusResolve,
    isSuccessChangeStatusResolve,
    isErrorChangeStatusResolve,

    onTake,
    onnextProgress,
    onAwait,
    onResolve,
  } = useInfoTicket(`${data?.id}`);


  const handleChangeStatus = (key:string) => {
    switch(key) {
      case "IN_PROGRESS" :
        onnextProgress();
        break;
      case "WAITING" :
        onAwait();
        break;
      case "RESOLVED" :
        onResolve();
        break;
    }
  }

  const isPending = isPendingChangeStatusResolve || isPendingChangeStatusNextProgress || isPendingChangeStatusAwait

  const isSuccess = isSuccessChangeStatusResolve || isSuccessChangeStatusNextProgress || isSuccessChangeStatusAwait

  const isError = isErrorChangeStatusResolve || isErrorChangeStatusNextProgress || isErrorChangeStatusAwait

  useEffect(() => {
    if(isSuccess) {
      refetch();
    }
  },[isSuccess])



  return (
    <div className="flex flex-col gap-8">

      {/* ticket Header */}
      <Card className="w-full shadow-xl">
        <Card.Content>
          <div className="flex flex-col md:flex-row gap-2 justify-between">
            <div>
              <h1 className="font-bold text-foreground text-xl">
                {data?.title}
              </h1>
              <p className="text-foreground">
                {data?.number}
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <Chip
                size="lg"
                className="bg-background-element text-white"
              >
                {data?.status}
              </Chip>

              <Select 
                className="w-[256px]" 
                placeholder="Select one"
                value={data.status}
                isDisabled={isPending}
                onChange={(value) => {
                  if(value) handleChangeStatus(`${value}`)}
                }
                disabledKeys={selectStatusTicket.filter((status) => {
                  return status.type !== "agent"
                }).map(status => status.id)}
              >
                <Label>
                  {isPending ? "Loading..." : "Change Status"}
                </Label>
                <Select.Trigger>
                  <Select.Value />
                  <Select.Indicator />
                </Select.Trigger>
                <Select.Popover>
                  <ListBox>
                    {selectStatusTicket.map((status) => (
                      <ListBox.Item key={status.id} id={status.id} textValue={status.label}>
                        {status.label}
                        <ListBox.ItemIndicator />
                      </ListBox.Item>
                    ))}
                  </ListBox>
                </Select.Popover>
              </Select>

              {/* <Dropdown>
                <Button
                  aria-label="Status"
                  className="w-40"
                  size="sm"
                  variant="secondary"
                  isDisabled={isPending}
                >
                  { isPending ? "Loading..." : "Change Status"}
                </Button>
                <Dropdown.Popover className="min-w-[256px]">
                  <Dropdown.Menu
                    selectedKeys={
                      new Set([`${data?.status}`])
                    }
                    selectionMode="single"
                    disabledKeys={["OPEN"]}
                    onSelectionChange={(key) => {
                      const selectedKey =
                        Array.from(key)[0];
                      if (!selectedKey) return;
                      handleChangeStatus(`${selectedKey}`);
                    }}
                  >
                    <Dropdown.Section>
                      <Header>
                        Select a Status
                      </Header>
                      {selectStatusMyTicket.map((status) => (
                        <Dropdown.Item
                          key={status.id}
                          id={status.id}
                          textValue={status.label}
                          isDisabled={isPending}
                        >
                          <Dropdown.ItemIndicator />
                          {status.label}
                        </Dropdown.Item>
                      ))}
                    </Dropdown.Section>
                  </Dropdown.Menu>
                </Dropdown.Popover>
              </Dropdown> */}
            </div>
          </div>
        </Card.Content>
      </Card>

      {/* ticket Info */}
      <div className="flex flex-col lg:flex-row gap-8">
        <Card className="shadow-xl flex-3 h-fit">
          <Card.Header>
            <h1 className="text-foreground text-xl font-semibold">
              Ticket Information
            </h1>
          </Card.Header>
          <Card.Content>
            <div className="flex flex-col gap-4 justify-between">
              <div>
                <h1 className="text-text-abu font-semibold">
                  Description
                </h1>
                <p>
                  {data?.description}
                </p>
              </div>

              <div>
                <h1 className="text-text-abu font-semibold">
                  Department
                </h1>
                <p>
                  {data?.department?.name}
                </p>
              </div>

              <div>
                <h1 className="text-text-abu font-semibold">
                  Category
                </h1>
                <p>
                  {data?.category?.name}
                </p>
              </div>
            </div>
          </Card.Content>
        </Card>

        {/* Ticket Status */}
        <Card className="shadow-xl flex-2 h-fit">
          <Card.Header>
            <h1 className="text-foreground text-xl font-semibold">
              Ticket Status
            </h1>
          </Card.Header>
          <Card.Content>
            <div className="flex flex-col gap-4 justify-between">
              <div>
                <Chip
                  size="lg"
                  color="success"
                >
                  {data?.status}
                </Chip>
              </div>

              <div>
                <h1 className="text-text-abu font-semibold">
                  Employee
                </h1>
                <p>
                  {data?.employee?.name ?? "-"}
                </p>
              </div>

              <div>
                <h1 className="text-text-abu font-semibold">
                  Priority
                </h1>
                <p>
                  {data?.priority}
                </p>
              </div>

              <div>
                <h1 className="text-text-abu font-semibold">
                  Created
                </h1>
                <p>
                  {Convert.dateToLocal(`${data?.createdAt}`)}
                </p>
              </div>
              
              <div>
                <h1 className="text-text-abu font-semibold">
                  Assigned
                </h1>
                <p>
                  {Convert.dateToLocal(`${data?.assignedAt}`)}
                </p>
              </div>
            </div>
          </Card.Content>
        </Card>
      </div>
    </div>
  );
};

export default InfoTicket;

