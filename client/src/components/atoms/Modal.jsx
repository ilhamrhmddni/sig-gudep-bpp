// // src/components/Modal.js
// import React from "react";

// const Modal = ({ message, onConfirm, onCancel, isVisible }) => {
//   if (!isVisible) return null;

//   return (
//     <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
//       <div className="bg-white rounded-lg p-6 w-1/3">
//         <h3 className="text-xl font-semibold">{message}</h3>
//         <div className="mt-4 flex justify-between">
//           <button
//             onClick={onCancel}
//             className="bg-gray-300 px-4 py-2 rounded-md hover:bg-gray-400"
//           >
//             Cancel
//           </button>
//           <button
//             onClick={onConfirm}
//             className="bg-[#9500FF] text-white px-4 py-2 rounded-md hover:bg-[#9500FF]"
//           >
//             Confirm
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Modal;
