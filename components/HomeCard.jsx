import Link from "next/link";
import React from "react";
import Image from "next/image";
const HomeCard = ({ data: { attributes: p, id } }) => {
  return (
    <>
      
         <div className="p-4 text-black/[0.9]">
        <Image
          width={500}
          height={500}
          src={p.image.data.attributes.url}
          alt="bags"
        />
          <Link href={p.url} className="relative mt-4 inline-block px-4 py-2 font-medium group">
                <span className="absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-black group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
                <span className="absolute inset-0 w-full h-full bg-white border-2 border-black group-hover:bg-black"></span>
                <span className="relative text-black group-hover:text-white">{p.name}</span>
                </Link>
        </div>
    </>
  );
};

export default HomeCard;
