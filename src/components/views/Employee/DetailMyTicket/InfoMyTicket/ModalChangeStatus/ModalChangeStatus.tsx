// "use client";

// import { Button, Modal, useOverlayState } from "@heroui/react";
// import { useEffect } from "react";

// interface TypeProps {
//   isOpen: boolean;
//   title: string;
//   description: string;

//   onChangeStatus: () => void;

//   isPendingChange: boolean;
//   isSuccessChange: boolean;
//   isErrorChange: boolean;

//   refetch: () => void;

//   onClose: () => void;
// }

// const ModalChangeStatus = (props: TypeProps) => {

//   const {
//     isOpen,
//     title,
//     description,

//     onChangeStatus,

//     isPendingChange,
//     isSuccessChange,
//     isErrorChange,

//     refetch,
//     onClose,
//   } = props;


//   const state = useOverlayState();


//   useEffect(() => {
//     if (isOpen) {
//       state.open();
//     }
//   }, [isOpen]);
  

//   // useEffect(() => {
//   //   if (!isOpen && !state.isOpen) {
//   //     onClose();
//   //   }
//   // }, [isOpen, state.isOpen])

//   useEffect(() => {
//     if (isSuccessChange || isErrorChange) {
//       refetch();
//       state.close();
//       onClose();
//     }
//   }, [isSuccessChange, isErrorChange]);


//   return (
//     <Modal state={state}>
//       <Modal.Backdrop>
//         <Modal.Container>
//           <Modal.Dialog className="sm:max-w-[360px]">
//             <Modal.CloseTrigger
//               onPress={onClose}
//             />
//             <Modal.Header>
//               <Modal.Heading>
//                 {title}
//               </Modal.Heading>
//             </Modal.Header>

//             <Modal.Body>
//               <p>
//                 {description}
//               </p>
//             </Modal.Body>

//             <Modal.Footer>
//               <Button
//                 className="w-full"
//                 onPress={onChangeStatus}
//                 isDisabled={isPendingChange}
//               >
//                 {isPendingChange
//                   ? "Loading..."
//                   : "Change"
//                 }
//               </Button>
//             </Modal.Footer>
//           </Modal.Dialog>
//         </Modal.Container>
//       </Modal.Backdrop>
//     </Modal>
//   );
// };

// export default ModalChangeStatus;
