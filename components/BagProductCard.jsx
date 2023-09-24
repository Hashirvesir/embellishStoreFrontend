import Link from "next/link";
import React from "react";
import Image from "next/image";
import { discountedPercentage } from "@/utils/helper";
const BagProductCard = ({ data: { attributes: p, id } }) => {
  return (
    <>
      <Link
        href={`/bagproduct/${p.slug}`}
        className="transform overflow-hidden hover:scale-105 cursor-pointer duration-200"
      >
        <Image
          width={500}
          height={500}
          src={p?.thumbnail?.data?.attributes?.url}
          alt={p?.name}
        />
        <div className="p-4 text-black/[0.9]">
          <h2 className="text-lg font-medium">{p.name}</h2>
          <div className="flex items-center text-black/[0.5]">
            <p className="mr-2 text-mdfont-semibold ">Rs:{p.price}</p>
             {p.orignal_price && (
              <>
                <p className="text-base font-medium line-through">
                  Rs:{p.orignal_price}
                </p>
                <p className="ml-auto text-base font-medium text-green-500">
                  {discountedPercentage(p.price, p.orignal_price)}% OFF
                </p>
              </>
            )}
          </div>
        </div>
      </Link>
    </>
  );
};

export default BagProductCard;
