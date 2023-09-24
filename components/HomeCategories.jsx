// import Image from "next/image";
// import Link from "next/link";
// import React from "react";
// const HomeCategories = () => {
//   return (
//     <>
//       <div className="flex justify-center items-center">
//         <div className="2xl:mx-auto 2xl:container py-12 px-4 sm:px-6 xl:px-20 2xl:px-0 w-full">
//           <div className="flex flex-col jusitfy-center items-center space-y-10">
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  md:gap-x-8 w-full">
//             <Link href="/allshoes/Shoes">
//               <div className="relative group flex justify-center items-center h-full w-full">
//                 <Image
//                   className="object-center object-cover h-full w-full"
//                   src="/shoes12.jpeg"
//                   alt="girl-image"
//                   width={400}
//                   height={400}
//                 />
//                 <button className="dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 bottom-4 z-10 absolute text-base font-medium leading-none text-gray-800 py-3 w-36 bg-white">
//                   Shoes
//                 </button>
                
//               </div>
//             </Link>

//               <div className="flex flex-col space-y-4 md:space-y-8 mt-4 md:mt-0">
            
//               <Link href="/allbags/Bag">
//               <div className="relative group flex justify-center items-center h-full w-full">
//                 <Image
//                   className="object-center object-cover h-full w-full"
//                   src="/bagss.jpeg"
//                   alt="girl-image"
//                   width={400}
//                   height={400}

//                 />
//                 <button className="dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 bottom-4 z-10 absolute text-base font-medium leading-none text-gray-800 py-3 w-36 bg-white">
//                   Bags
//                 </button>
              
//               </div>
//             </Link>
                
//               </div>
//             <Link href="/allothers/Other">
//               <div className="relative group justify-center items-center h-full w-full hidden lg:flex">
//                 <Image
//                   className="object-center object-cover h-full w-full"
//                   src="/other (1).png"
//                   alt="Others"
//                   width={400}
//                   height={400}
//                 />
//                 <button className="dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 bottom-4 z-10 absolute text-base font-medium leading-none text-gray-800 py-3 w-36 bg-white">
//                   Others
//                 </button>
                
//               </div>
//             </Link>
//             <Link href="/allothers/Other">
//               <div className="relative  flex justify-center items-center h-full w-full mt-4 md:hidden md:mt-8 lg:hidden">
//                 <Image
//                   className="object-center object-cover h-full w-full hidden md:block"
//                   src="/other (1).png"
//                   alt="Others"
//                   width={400}
//                   height={400}

//                 />
//                 <Image
//                   className="object-center object-cover h-full w-full md:hidden"
//                   src="/other22 (1).png"
//                   alt="Others"
//                   width={400}
//                   height={400}
//                 />
//                 <button className="dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 bottom-4 z-10 absolute text-base font-medium leading-none text-gray-800 py-3 w-36 bg-white">
//                   Others
//                 </button>
              
//               </div>
//             </Link>

//             <Link href="/allothers/Other" >
//             <div className="relative group hidden md:flex hover:scale-105 transform justify-center items-center h-full w-full ml-[220px]  mt-4 md:mt-8 lg:hidden">
//               <Image
//                 className="object-center object-cover h-full w-full hidden md:block rounded-md"
//                 src="/other22 (1).png"
//                 alt="Others"
//                 width={400}
//                   height={400}

//               />
//               <Image
//                 className="object-center object-cover h-full w-full sm:hidden"
//                 src="/other22 (1).png"
//                 alt="Others"
//                 width={400}
//                 height={400}


//               />
//               <button className="dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 bottom-4 z-10 absolute text-base font-medium leading-none text-gray-800 py-3 w-36 bg-white">
//               Others
//               </button>
              
//             </div>
//             </Link>
//             </div>
//           </div>
//         </div>
//       </div>
     

//     </>
//   );
// };

// export default HomeCategories;
import React from 'react'

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import HomeCard from './homeCard';
const HomeCategories = ({homeCategory}) => {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
  return (
    <div className="mt-[50px] md:mt-[100px] mb-[100px] md:mb-0">
      <div className="text-2xl md:text-3xl font-extrabold mb-5">Our Categories</div>
      <Carousel
        responsive={responsive}
        containerClass="-mx-[10px]"
        itemClass="px-[10px]"

      >
       {homeCategory?.data?.map((product)=>(
            <HomeCard key={product?.id} data={product} /> 
          ))}



        {/* <HomeCard/>
        <HomeCard/>
        <HomeCard/> */}

      </Carousel>
      ;
    </div>
  );
};

export default   HomeCategories;
