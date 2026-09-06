"use client";

import { selectStatusMyTicket } from "@/configs/inputFormConfig";
import { ITicket } from "@/types/ticket";
import Convert from "@/utils/convert.";
import { Button, Card, Chip, Dropdown, Header} from "@heroui/react";
import useInfoMyTicket from "./useInfoMyTicket";
import { useEffect } from "react";

interface TypeProps {
  data: ITicket;
  refetch: () => void;
}


const InfoMyTicket = (props: TypeProps) => {
  const {
    data,
    refetch,
  } = props;

  const {
    isPendingChangeStatusReOpen,
    isSuccessChangeStatusReOpen,

    isPendingChangeStatusClose,
    isSuccessChangeStatusClose,

    isPendingChangeStatusCancel,
    isSuccessChangeStatusCancel,

    onReOpen,
    onClose,
    onCancel,
  } = useInfoMyTicket(`${data?.id}`);


  const handleChangeStatus = (key:string) => {
    switch(key) {
      case "IN_PROGRESS" :
        onReOpen();
        break;
      case "CLOSED" :
        onClose();
        break;
      case "CANCELLED" :
        onCancel();
        break;
    }
  }

  const isPending = isPendingChangeStatusCancel || isPendingChangeStatusClose || isPendingChangeStatusReOpen

  const isSuccess = isSuccessChangeStatusCancel || isSuccessChangeStatusClose || isSuccessChangeStatusReOpen


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

              <Dropdown>
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
              </Dropdown>
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
                  Agent
                </h1>
                <p>
                  {data?.agent?.name ?? "-"}
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
            </div>
          </Card.Content>
        </Card>
      </div>
    </div>
  );
};

export default InfoMyTicket;







// "use client";

// import { selectStatusMyTicket } from "@/configs/inputFormConfig";
// import { ITicket } from "@/types/ticket";
// import Convert from "@/utils/convert.";
// import { Button, Card, Chip, Dropdown, Header} from "@heroui/react";
// import useInfoMyTicket from "./useInfoMyTicket";
// import ModalChangeStatus from "./ModalChangeStatus";
// import { useState } from "react";

// interface TypeProps {
//   data: ITicket;
//   refetch: () => void;
// }

// interface IIsiModal {
//   key: "IN_PROGRESS" | "CLOSED" | "CANCELLED";
//   title: string;
//   description: string;
//   isPending: boolean;
//   isSuccess: boolean;
//   isError: boolean;
// }

// const InfoMyTicket = (props: TypeProps) => {
//   const {
//     data,
//     refetch,
//   } = props;

//   const {
//     isPendingChangeStatusReOpen,
//     isSuccessChangeStatusReOpen,
//     isErrorChangeStatusReOpen,

//     isPendingChangeStatusClose,
//     isSuccessChangeStatusClose,
//     isErrorChangeStatusClose,

//     isPendingChangeStatusCancel,
//     isSuccessChangeStatusCancel,
//     isErrorChangeStatusCancel,

//     onReOpen,
//     onClose,
//     onCancel,
//   } = useInfoMyTicket(`${data?.id}`);

//   const [isiModal, setIsiModal] = useState<IIsiModal | null>(null);

//   const [isOpenModal, setisOpenModal] = useState(false);

//   const handleSelect = (key: string) => {
//     switch (key) {
//       case "IN_PROGRESS":
//         setIsiModal({
//           key: "IN_PROGRESS",
//           title: "Change Ticket Status",
//           description: "Anda yakin ingin membuka kembali ticket ini?",
//           isPending: isPendingChangeStatusReOpen,
//           isSuccess: isSuccessChangeStatusReOpen,
//           isError: isErrorChangeStatusReOpen
//         });
//         break;

//       case "CLOSED":
//         setIsiModal({
//           key: "CLOSED",
//           title: "Change Ticket Status",
//           description: "Anda yakin ingin menutup status ticket ini?",
//           isPending: isPendingChangeStatusClose,
//           isSuccess: isSuccessChangeStatusClose,
//           isError: isErrorChangeStatusClose
//         });
//         break;

//       case "CANCELLED":
//         setIsiModal({
//           key: "CANCELLED",
//           title: "Change Ticket Status",
//           description: "Anda yakin ingin membatalkan ticket ini?",
//           isPending: isPendingChangeStatusCancel,
//           isSuccess: isSuccessChangeStatusCancel,
//           isError: isErrorChangeStatusCancel
//         });
//         break;
//     }
//   };

//   const handleChangeStatus = (key: string) => {
//     handleSelect(key);
//     setisOpenModal(true);
//   };

//   const handleCloseModal = () => {
//     setisOpenModal(false);
//     setIsiModal(null);
//   };

//   return (
//     <div className="flex flex-col gap-8">

//       {/* ticket Header */}
//       <Card className="w-full shadow-xl">
//         <Card.Content>
//           <div className="flex flex-col md:flex-row gap-2 justify-between">
//             <div>
//               <h1 className="font-bold text-foreground text-xl">
//                 {data?.title}
//               </h1>
//               <p className="text-foreground">
//                 {data?.number}
//               </p>
//             </div>

//             <div className="flex flex-col gap-2">
//               <Chip
//                 size="lg"
//                 className="bg-background-element text-white"
//               >
//                 {data?.status}
//               </Chip>

//               <Dropdown>
//                 <Button
//                   aria-label="Status"
//                   size="sm"
//                   variant="secondary"
//                 >
//                   Change Status
//                 </Button>
//                 <Dropdown.Popover className="min-w-[256px]">
//                   <Dropdown.Menu
//                     selectedKeys={
//                       new Set([`${data?.status}`])
//                     }
//                     selectionMode="single"
//                     disabledKeys={["OPEN"]}
//                     onSelectionChange={(key) => {
//                       const selectedKey =
//                         Array.from(key)[0];
//                       if (!selectedKey) return;
//                       handleChangeStatus(`${selectedKey}`);
//                     }}
//                   >
//                     <Dropdown.Section>
//                       <Header>
//                         Select a Status
//                       </Header>
//                       {selectStatusMyTicket.map((status) => (
//                         <Dropdown.Item
//                           key={status.id}
//                           id={status.id}
//                           textValue={status.label}
//                         >
//                           <Dropdown.ItemIndicator />
//                           {status.label}
//                         </Dropdown.Item>
//                       ))}
//                     </Dropdown.Section>
//                   </Dropdown.Menu>
//                 </Dropdown.Popover>
//               </Dropdown>
//             </div>
//           </div>
//         </Card.Content>
//       </Card>

//       {/* ticket Info */}
//       <div className="flex flex-col lg:flex-row gap-8">
//         <Card className="shadow-xl flex-3 h-fit">
//           <Card.Header>
//             <h1 className="text-foreground text-xl font-semibold">
//               Ticket Information
//             </h1>
//           </Card.Header>
//           <Card.Content>
//             <div className="flex flex-col gap-4 justify-between">
//               <div>
//                 <h1 className="text-text-abu font-semibold">
//                   Description
//                 </h1>
//                 <p>
//                   {data?.description}
//                 </p>
//               </div>

//               <div>
//                 <h1 className="text-text-abu font-semibold">
//                   Department
//                 </h1>
//                 <p>
//                   {data?.department?.name}
//                 </p>
//               </div>

//               <div>
//                 <h1 className="text-text-abu font-semibold">
//                   Category
//                 </h1>
//                 <p>
//                   {data?.category?.name}
//                 </p>
//               </div>
//             </div>
//           </Card.Content>
//         </Card>

//         {/* Ticket Status */}
//         <Card className="shadow-xl flex-2 h-fit">
//           <Card.Header>
//             <h1 className="text-foreground text-xl font-semibold">
//               Ticket Status
//             </h1>
//           </Card.Header>
//           <Card.Content>
//             <div className="flex flex-col gap-4 justify-between">
//               <div>
//                 <Chip
//                   size="lg"
//                   color="success"
//                 >
//                   {data?.status}
//                 </Chip>
//               </div>

//               <div>
//                 <h1 className="text-text-abu font-semibold">
//                   Agent
//                 </h1>
//                 <p>
//                   {data?.agent?.name ?? "-"}
//                 </p>
//               </div>

//               <div>
//                 <h1 className="text-text-abu font-semibold">
//                   Priority
//                 </h1>
//                 <p>
//                   {data?.priority}
//                 </p>
//               </div>

//               <div>
//                 <h1 className="text-text-abu font-semibold">
//                   Created
//                 </h1>
//                 <p>
//                   {Convert.dateToLocal(`${data?.createdAt}`)}
//                 </p>
//               </div>
//             </div>
//           </Card.Content>
//         </Card>
//       </div>


//       {/* Modal */}
//       {isiModal && (
//         <ModalChangeStatus
//           isOpen={isOpenModal}
//           title={isiModal.title}
//           description={isiModal.description}

//           isPendingChange={isiModal.isPending}
//           isSuccessChange={isiModal.isSuccess}
//           isErrorChange={isiModal.isError}

//           refetch={refetch}

//           onClose={handleCloseModal}

//           onChangeStatus={
//             isiModal.key === "IN_PROGRESS"
//               ? onReOpen
//               : isiModal.key === "CANCELLED"
//               ? onCancel
//               : isiModal.key === "CLOSED"
//               ? onClose
//               : () => {}
//           }
//         />
//       )}

//     </div>
//   );
// };

// export default InfoMyTicket;


