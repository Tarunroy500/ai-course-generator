// import React from 'react';

// function Header({ onBack }) {
//   return (
//     <header className="bg-blue-600 p-4 shadow-md">
//       <div className="max-w-6xl mx-auto flex justify-end items-center">
//         <button
//           className="bg-white text-blue-600 py-2 px-4 rounded-lg font-semibold hover:bg-gray-100 transition"
//           onClick={onBack}
//         >
//           Back to Dashboard
//         </button>
//       </div>
//     </header>
//   );
// }

// export default Header;


import { UserButton } from '@clerk/nextjs'
import React from 'react'

function Header({ onBack }) {
  return (
    <div className='flex justify-between items-center p-5 shadow-sm'>
        <button
          className="bg-white text-blue-600 py-2 px-4 rounded-lg font-semibold hover:bg-gray-100 transition"
          onClick={onBack}
        >
          Back to Dashboard
        </button>
        <UserButton/>
    </div>
  )
}

export default Header