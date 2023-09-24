import { useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import Wrapper from "@/components/Wrapper";
import CartItem from "@/components/CartItem";
import { useSelector } from "react-redux";
// import { useRouter } from "next/router";

const Cart = () => {
  // const router =useRouter()
  const { cartItem } = useSelector((state) => state.cart);
  const subtotal = useMemo(()=>{
    return cartItem.reduce((total,val)=> total + val.attributes.price,0)
  }) 
  
  return (
    <>
      <div className="w-full md:py-20">
        <Wrapper>
          {cartItem.length > 0 && (
            <>
              {/* heading and paragraph */}
              <div className="text-center max-w-[800] mx-auto mt-8 md:mt-0">
                <div className="text-[28px] md:text-[34px] mb-5 font-semibold leading-right">
                  Shopping Cart
                </div>
              </div>
              {/* heading and paragraph */}

              {/* Cart Content start */}
              <div className="flex flex-col lg:flex-row gap-12 py-10">
                {/* cart items  */}
                <div className="flex-[2]">
                  <div className="text-lg font-bold">
                    {cartItem.map((item)=>(
                      <CartItem key={item.id}  data={item}/>
          ))}
                    
                  </div>
                </div>
                {/* cart summary  */}
                <div className="flex-[1]">
                  <div className="text-lg font-bold">Summary</div>
                  <div className="p-5 my-5 bg-black/[0.05] rounded-xl">
                    <div className="flex justify-between">
                      <div className="uppercase text-md md:text-lg font-medium text-black">
                        Subtotal
                      </div>
                      <div className="text-md md:text-lg text-black font-medium">
                        Rs: {subtotal}
                      </div>
                    </div>
                    <div className="text-sm md:text-md border-t py-5 mt-5">
                    (Free Cash On Delivery)
                    </div>
                  </div>
                  <Link href="./checkout">
                  <button className="rounded-full  w-full py-4 bg-black text-white transition-transform active:scale-95 mb-3 hover:opacity-75">
                    Checkout
                  </button>
                  </Link>
                </div>
              </div>
            </>
          )}
          {/* Cart Content end */}

          {cartItem.length < 1 &&
            (
              <div className="flex-[2] flex flex-col items-center pb-[50px] md:-mt-14">
                <Image
                  src="/empty-cart.jpg"
                  width={300}
                  height={300}
                  className="w-[300px] md:w[400px]"
                />
                <span className="text-xl font-bold">Your Cart is Empty</span>
                <span className="text-center mt-2">
                  Looks like you have not added anything in your cart
                  <br />
                  Go head and explore top categories
                </span>
                <Link href="/">
                  <button className="rounded-full  mt-2 w-full py-4 px-8 bg-black text-white transition-transform active:scale-95 mb-3 hover:opacity-75">
                    Continue Shopping
                  </button>
                </Link>
              </div>
            )}
        </Wrapper>
      </div>
    </>
  );
};

export default Cart;
