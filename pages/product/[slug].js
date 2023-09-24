import React from "react";
import { useState } from "react";
import Wrapper from "@/components/Wrapper";
// import { IoMdHeartEmpty } from "react-icons/io";
import ProductDetailCarousel from "@/components/ProductDetailCarousel";
import RelatedProducts from "@/components/RelatedProducts";
import { fetchDataApi } from "@/utils/api";
import { discountedPercentage } from "@/utils/helper";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { useSelector, useDispatch } from "react-redux";
import { addtoCart } from "@/store/cartslice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductDetail = ({ product, relatedproducts }) => {
  const p = product?.data?.[0]?.attributes;
  const [selectedSize, setSelectedSize] = useState();
  const dispatch = useDispatch();
  const [showError, setError] = useState(false);
  const notify=()=>{
    toast.success('Added In Cart!', {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      });
  }
  return (
    <>
      <div className="w-full md:py-20 ">
      <ToastContainer/>
        <Wrapper>
          <div className="flex flex-col lg:flex-row md:px-10 gap-[50px] md:gap-[100px]">
            {/* column left start */}
            <div className="w-full md:w-auto flex-[1] max-w-[500px] lg:max-w-full mx-auto lg-mx-0">
              <ProductDetailCarousel images={p.image.data} />
            </div>
            {/* column left end */}

            {/* column right start */}
            <div className="flex-[1] py-5">
              {/* product title */}
              <div className="text-[30px] font-semibold mb-3">{p.name}</div>
              {/* product subtitle */}
              <div className="text-lg font-semibold mb-3">{p.subtitle}</div>
              {/* product price */}
              <div className="flex items-center">
                <p className="mr-2 text-lg font-semibold ">Rs:{p.price}</p>
                {p.orignal_price && (
                  <>
                    <p className="text-base font-medium  text-black/[0.5] line-through">
                      Rs:{p.orignal_price}
                    </p>
                    <p className="ml-auto text-base font-medium text-green-500">
                      {discountedPercentage(p.price, p.orignal_price)}% OFF
                    </p>
                  </>
                )}
              </div>
              <div className="text-md font-medium text-black/[0.5] ">
                incl. of taxes
              </div>
              <div className="text-md font-medium text-black/[0.5] mb-20">
                {"(Free Cash On Delivery)"}
              </div>
              {/* product size range start */}
              <div className="mb-10">
                <div className="flex mb-2">
                  {/* heading */}
                  <div className="text-md font-semibold">Select Size</div>
                </div>
                {/* heading */}

                {/* sizerange */}
                <div id="gridSizes" className="grid grid-cols-3 gap-2 ">
                  {p.size.data.map((item, i) => (
                    <button 
                      key={i}
                      className={`border rounded-md text-center py-3 font-medium ${
                        item.enabled

                          ? "hover:border-black cursor-pointer"
                          : "cursor-not-allowed opacity-50 border-none hover:border-none "
                    
                      } ${selectedSize === item.size ? "border-black" : ""} `}
                      onClick={() => {
                        setSelectedSize(item.size);
                        setError(false);
                      }}
                    >
                      {item.size}
                    </button>
                  ))}
                </div>
                {/* show error size */}
                {showError && (
                  <div className="text-red-600 mt-1"> Size Required*</div>
                )}
                {/* show error size */}

                {/* sizerange */}
              </div>
              {/* product size range end */}
              {/* add cart button */}
              <button
                className="rounded-full  w-full py-4 bg-black text-white transition-transform active:scale-95 mb-3 hover:opacity-75"
                onClick={() => {
                  if(!selectedSize) {
                    setError(true);
                    document.getElementById("gridSizes").scrollIntoView({
                      block: "center",
                      behavior: "smooth",
                    });
                  } else {
                    dispatch(addtoCart({
                        ...product?.data?.[0],
                        selectedSize,
                        oneQuantityPrice:p.price,
                      })
                    );
                      notify()
                  }
                
                }}
              >
                Add Cart
              </button>
              {/* add cart button */}
              {/* whishlist button */}
              {/* <button className="rounded-full border border-black text-lg  w-full py-4 font-medium bg-white flex justify-center items-center gap-2 text-black transition-transform active:scale-95 mb-3 hover:opacity-75">
                Whishlist
                <IoMdHeartEmpty />
              </button> */}
              {/* whishlist button */}
              <div>
                <div className="text-lg font-bold mb-5">Product Details</div>
                <div className="markdown text-md mb-5">
                  <ReactMarkdown>{p.description}</ReactMarkdown>
                </div>
              </div>
            </div>
            {/* column right end */}
          </div>
          <RelatedProducts relatedproducts={relatedproducts} />
        </Wrapper>
      </div>
    </>
  );
};

export default ProductDetail;

export const getStaticPaths = async () => {
  const products = await fetchDataApi("/api/products?populate=*");
  const paths = products.data.map((p) => ({
    params: {
      slug: p.attributes.slug,
    },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params: { slug } }) => {
  const product = await fetchDataApi(
    `/api/products?populate=*&filters[slug][$eq]=${slug}`
  );
  const relatedproducts = await fetchDataApi(
    `/api/products?populate=*&[filters][slug][$ne]=${slug}`
  );

  return {
    props: { product, relatedproducts },
  };
};
