import HeroBanner from "@/components/HeroBanner";
import Wrapper from "@/components/Wrapper";
import SliderNames from "@/components/SliderNames";
import HomeCategories from "@/components/HomeCategories";
import { fetchDataApi } from "@/utils/api";

export default function Home({hero,homeCategory}) {

  
  return (
    <>
      <main>
      <Wrapper>
        <HeroBanner hero={hero} /> 
        {/* heading & paragraph */}
          <div className="text-center max-w-[800px] mx-auto my-[50px] ">
            <div className="text-[28px] md:text-[34px] mb-5 font-semibold leading-tight">
          Elevate Your Style with Exceptional Accessories            </div>
            <div className="text-md md:text-xl"> 
            Explore our curated collection today and embrace the beauty of fashion fusion with Embilish. Elevate your style with our exceptional accessories.
            </div>
          </div>
          {/* heading & paragraph */}
           <HomeCategories homeCategory={homeCategory}/> 

      </Wrapper>
          <SliderNames />
      </main>
    </>
  );
}
export const getStaticProps = async () => {
  const hero = await fetchDataApi("/api/herobanners?populate=*");

  const homeCategory = await fetchDataApi("/api/homecategoryimgs?populate=*");

  return {
    props: {
      hero,
      homeCategory
    },
  };
};

