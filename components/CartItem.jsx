import Image from "next/image";
// import React, { useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { updateCart ,removeFromCart} from "@/store/cartslice"
import { useDispatch } from "react-redux";

const CartItem = ({ data }) => {
  // const [selectedSize, setselectedSize] = useState()
  const p = data.attributes;
  const dispatch = useDispatch()
  const updateCartItem = (e,key) =>{
      const payload ={
        key,
        val:key ==="quantity" ?parseInt(e.target.value):(e.target.value),
        id:data.id
      }
      dispatch(updateCart(payload))
  }

  return (
    <div className="flex py-5 gap-3 md:gap-5 border-b">
      {/* image  */}
      <div className="shrink-0 aspect-square w-[50px] md:w-[120px]">
        <Image
          src={p?.thumbnail?.data?.attributes?.url}
          width={120}
          height={120}
          alt={p.name}
        />
      </div>
      <div className="w-full flex flex-col">
        <div className="flex flex-col md:flex-row justify-between">
          {/* Productcart details */}
          <div className="text-md md:text-lg font-semibold text-black/[0.8]">
            {p.name}
          </div>
          <div className="text-sm md:text-md font-semibold text-black/[0.5] block md:hidden">
            {p.subtitle}
          </div>
          <div className="text-sm md:text-md font-semibold text-black/[0.5] mt-2 ">
            Rs: {p.price}
          </div>
        </div>
        <div className="text-sm md:text-md font-semibold text-black/[0.5] hidden md:block">
          {p.subtitle}
        </div>
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-2 md:gap-10  text-black/[0.5]"> 

            <div className="flex items-center duration-200 hover:text-black cursor-pointer gap-1">
              {/* <div className="font-semibold">sizes</div>   */}
          {p?.size?.data && <select  defaultValue={data.selectedSize}  onChange={(e)=> updateCartItem(e,"selectedSize")}>
                {p.size.data.map((item, i) => {
                  return (
                    <option
                      key={i}
                      value={i}
                      disabled={!item.enabled ? true : false}
                      selected={data.selectedSize === item.size}
                    >
                      {item.size}
                    </option>
                  );
                })}
              </select>}
            </div>
            
            <div className="flex items-center duration-200 hover:text-black cursor-pointer gap-1">
              <div className="font-semibold">Qty</div>
              <select  value={data.quantity}  onChange={(e)=> updateCartItem(e,"quantity")}>
                {
                  Array.from({length:10}, (_,i)=> i + 1).map((q,i)=>{
                      return(
                            <option key={i}  selected={data.quantity===q}>{q}</option>
                      ) 
                  })
                }
              </select>
            </div>
          </div>
          <RiDeleteBin6Line 
          onClick={()=> dispatch(removeFromCart({id:data.id}))}
          className="cursor-pointer text-black/[0.5] hover:text-black text-[16px] md:text-[16px]  " />
        </div>
      </div>
    </div>
  );
};

export default CartItem;
