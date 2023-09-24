import React from "react";
import { useState, useEffect } from "react";
import Wrapper from "./Wrapper";
import Link from "next/link";
import Menu from "./Menu";
import MenuMobile from "./MenuMobile";

import { TbSearch } from 'react-icons/tb';
import { BsCart } from "react-icons/bs";
import { BiMenuAltRight } from "react-icons/bi";
import { VscChromeClose } from "react-icons/vsc";
import { fetchDataApi } from "@/utils/api";
import { useSelector } from "react-redux";
import Search from "./Search";
import Image from "next/image";
// import Category from "@/pages/category/[slug]";
const Header = () => {
  const [show, setShow] = useState("translate-y-0");
  const [lastScrollY, setLastScrollY] = useState(0);
  const [showSearch, setShowSearch] = useState(false);
  
  const [showCatMenu, setShowCatMenu] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [categories, setCategories] = useState(null);

  const [bagCategory, setBagCategory] = useState(null);
  const [showBagCategory, setShowBagCategory] = useState(false);

  const [otherCategory, setOtherCategory] = useState(null);
  const [showOtherCategory, setShowOtherCategory] = useState(false);

  const { cartItem } = useSelector((state) => state.cart);

  const controlNavbar = () => {
    if (window.scrollY > 200) {
      if (window.scrollY > lastScrollY && !mobileMenu) {
        setShow("-translate-y-[80px]");
      } else {
        setShow("shadow-sm");
      }
    } else {
      setShow("translate-y-0");
    }
    setLastScrollY(window.scrollY);
  };
  useEffect(() => {
    window.addEventListener("scroll", controlNavbar);
    return () => {
      window.removeEventListener("scroll", controlNavbar);
    };
  }, [lastScrollY]);

  // fetch data shoe Category data {start}
  useEffect(() => {
    categorydatafetching();
  }, []);

  const categorydatafetching = async () => {
    const { data } = await fetchDataApi("/api/categories?populate=*");
    setCategories(data);
  };
  // fetch data shoe Category data {end}

  // fetch data bag Category data {start}
  useEffect(() => {
    fetchdataFromBags();
  }, []);
  const fetchdataFromBags = async () => {
    const { data } = await fetchDataApi("/api/bags?populate=*");
    setBagCategory(data);
  };
    // fetch data bag Category data {end}

    // fetch data others Category data {start}
  useEffect(() => {
    fetchDataFromOther();
  }, [])
  
  const fetchDataFromOther = async ()=>{
    const {data} = await fetchDataApi("/api/others?populate=*")
     setOtherCategory(data)
  }
    // fetch data others Category data {end}

  return (
    <>
      <header
        className={`w-full h-[50px] md:h-[80px] bg-white flex items-center justify-between z-20 sticky top-0 transition-transform duration-300 ${show}`}
      >
        <Wrapper className="h-[60px] flex justify-between items-center">
          <Link href="/">
            <Image src="/trace.svg"  width={100}
      height={100} alt="logo" className="w-[75px] md:pt-0 md:w-[110px] " />
          </Link>
          <Menu
            showCatMenu={showCatMenu}
            setShowCatMenu={setShowCatMenu}
            categories={categories}

            bagCategory={bagCategory}
            showBagCategory={showBagCategory}
            setShowBagCategory={setShowBagCategory}

            otherCategory={otherCategory}
            // otherCategory={otherCategory}
            showOtherCategory={showOtherCategory}
            setShowOtherCategory={setShowOtherCategory}
          />
          {mobileMenu && (
            <MenuMobile
              showCatMenu={showCatMenu}
              setShowCatMenu={setShowCatMenu}
              setMobileMenu={setMobileMenu}
              categories={categories}

            setBagCategory={setBagCategory}
              bagCategory={bagCategory}
              showBagCategory={showBagCategory}
              setShowBagCategory={setShowBagCategory}

              otherCategory={otherCategory}
              setOtherCategory={setOtherCategory}
              showOtherCategory={showOtherCategory}
              setShowOtherCategory={setShowOtherCategory}
            />
          )}

          {/* ICONS NAVBAR */}
          <div className="flex items-center gap-2 text-black">
            {/* user START */}
            <div className="w-8 md:w-12 h-8 md:h-12 rounded-full flex justify-center items-center hover:bg-black/[0.05] cursor-pointer relative">
               <TbSearch onClick={()=>setShowSearch(true)} className="text-[19px] md:text[20px]" />
            </div>
            {/* User END */}

            {/* add cart START */}
            <Link href="/cart">
              <div className="w-8 md:w-12 h-8 md:h-12 rounded-full flex justify-center items-center hover:bg-black/[0.05] cursor-pointer relative">
                <BsCart className="text-[15px] md:text[20px]" />
                {cartItem.length > 0 && (
                  <div className="h-[14px] md:h-[18px] min-w-[14px] md:min-w-[18px] rounded-full bg-red-600 absolute top-1 left-5 md:left-7 text-white text-[10px] md:text-[12px] flex justify-center items-center px-[2] md:px-[5px] ">
                    {cartItem.length}
                  </div>
                )}
              </div>
            </Link>
            {/* add cart END */}

            {/* mobile menu START */}
            <div className="w-8 md:w-12 h-8 md:h-12 rounded-full flex justify-center items-center  cursor-pointer relative -mr-2">
              {mobileMenu ? (
                <VscChromeClose
                  className="text-[16px]  md:hidden hover:bg-black/[0.05] "
                  onClick={() => setMobileMenu(false)}
                />
              ) : (
                <BiMenuAltRight
                  className="text-[20px] md:hidden hover:bg-black/[0.05] "
                  onClick={() => setMobileMenu(true)}
                />
              )}
            </div>
            {/* mobile menu END */}
          </div>
        </Wrapper>
      </header>
      {showSearch && <Search setShowSearch={setShowSearch} /> }
    </>
  );
};

export default Header;
// export const getStaticProps = async () => {
//   const categories = await fetchDataApi("/api/categories?populate=*");
//     const bagsCategories = await fetchDataApi("/api/bags?populate=*");
//   const otherCategories = await fetchDataApi("/api/others?populate=*");

//   return {
//     props: {
//       categories,
//       bagCategory,
//       otherCategor,
//     },
//   };
// };
