import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { BiArrowBack } from "react-icons/bi";
import Link from "next/link";
import Image from "next/image";

// import { useState, useEffect } from "react";


const HeroBanner = ({hero}) => {
  // const [data, setdata] = useState(null)
  // useEffect(() => {
  //   datafetch();
  // }, []);

  // const datafetch = async () => {
  //   const { data } = await fetchDataApi("/api/herobanners?populate=*");
  //   setdata(data);
  // };

  
  return (
    <>
      <div className="relative text-white text-[20px] m-auto w-full">
        <Carousel
          autoPlay={true}
          infiniteLoop={true}
          showThumbs={false}
          showIndicators={false}
          showStatus={false}
          renderArrowPrev={(clickHandler, hasPrev) => (
            <div
              onClick={clickHandler}
              className="absolute right-[31px] md:right[51px] bottom-0 w-[30px] md:w-[50px] h-[30px] md:h-[30px] bg-black z-10 flex items-center justify-center cursor-pointer hover:opacity-90 "
            >
              <BiArrowBack className="text-sm md:text-lg" />
            </div>
          )}
          renderArrowNext={(clickHandler, hasNext) => (
            <div
              onClick={clickHandler}
              className="absolute right-0 md:right-0 bottom-0 w-[30px] md:w-[50px] h-[30px] md:h-[30px] bg-black z-10 flex items-center justify-center cursor-pointer hover:opacity-90 "
            >
              <BiArrowBack className=" rotate-180 text-sm md:text-lg" />
            </div>
          )}
        >
         {
          hero?.data?.map(result=>{
            return(
              <div key={result?.id}>
            <Image
              src={result?.attributes?.image?.data?.attributes?.url}
              className="aspect-[16/10] md:aspect-auto object-cover "
              width={1200}
              height={700}
              alt="bannerIMG"
            />
            <Link href={result?.attributes?.url}>
            <div
              className="px-[15px] md:px-[40px] py-[10px] md:py-[25px] font-oswald bg-white absolute bottom-[25px]
                    md:bottom-[75px] left-0 text-black/[0.9] text-[15px] md:text[30px] uppercase cursor-pointer font-medium hover:opacity-90"
            >
              Shop now
            </div>
            </Link>
          </div>
          
            )
          })
         }
         
       
            
          {/* <div>
            <img
              src="/casualbanner2.jpeg"
              className="aspect-[16/10] md:aspect-auto object-cover "
            />
            <div
              className="px-[15px] md:px-[40px] py-[10px] md:py-[25px] font-oswald bg-white absolute bottom-[25px]
                    md:bottom-[75px] left-0 text-black/[0.9] text-[15px] md:text[30px] uppercase cursor-pointer font-medium hover:opacity-90"
            >
              Shop now
            </div>
          </div> */}
          {/* <div>
            <img
              src="/shoesbanner1.jpeg"
              className="aspect-[16/10] md:aspect-auto object-cover "
            />
            <div
              className="px-[15px] md:px-[40px] py-[10px] md:py-[25px] font-oswald bg-white absolute bottom-[25px]
                    md:bottom-[75px] left-0 text-black/[0.9] text-[15px] md:text[30px] uppercase cursor-pointer font-medium hover:opacity-90"
            >
              Shop now
            </div>
          </div> */}
         
        </Carousel>
      </div>
    </>
  );
};

export default HeroBanner;



