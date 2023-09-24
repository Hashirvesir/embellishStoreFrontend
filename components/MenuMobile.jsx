import React from "react";
import Link from "next/link";
import { BsChevronDown } from "react-icons/bs";

const MenuMobile = ({
  showCatMenu,
  setShowCatMenu,
  setMobileMenu,
  categories,

  bagCategory,
  showBagCategory,
  setBagCategory,
  setShowBagCategory,

  otherCategory,
  setOtherCategory,
  showOtherCategory,
  setShowOtherCategory,
}) => {
  const data = [
    { id: 1, name: "Home", url: "/" },
    { id: 3, name: "Shoes", subMenu: true },
    { id: 4, name: "Bags", bagmenus: true },
    { id: 5, name: "Others", othermenus: true },
  ];

  return (
    <ul className="flex flex-col md:hidden font-bold absolute top-[50px] left-0 w-full h-[calc(100vh-50px)] bg-white border-t text-black">
      {data.map((item) => {
        return (
          <React.Fragment key={item.id}>
            {item.subMenu ? (
              <li
                className="cursor-pointer py-4 px-5 border-b flex flex-col relative "
                onClick={() => setShowCatMenu(!showCatMenu)}
              >
                <div className="flex justify-between items-center">
                  {item.name}
                  <BsChevronDown size={14} />
                </div>
                {showCatMenu && (
                  <ul className="bg-black/[0.05] -mx-5 mt-4 -mb-4  ">
                    {categories?.map(({ attributes: m, id }) => {
                      return (
                        <Link
                          href={`/category/${m.slug}`}
                          key={id}
                          onClick={() => {
                            setShowCatMenu(false);
                            setMobileMenu(false);
                          }}
                        >
                          <li className="py-4 px-8 border-t flex justify-between">
                            {m.name}
                          </li>
                        </Link>
                      );
                    })}
                  </ul>
                )}
              </li>
            ) : item.bagmenus ? (
              <li
                className="cursor-pointer py-4 px-5 border-b flex flex-col relative "
                onClick={() => setShowBagCategory(!showBagCategory)}
              >
                <div className="flex justify-between items-center">
                  {item.name}
                  <BsChevronDown size={14} />
                </div>
                {showBagCategory && (
                  <ul className="bg-black/[0.05] -mx-5 mt-4 -mb-4  ">
                    {bagCategory?.map(({ attributes: b, id }) => {
                      return (
                        <Link
                          href={`/bag/${b.slug}`}
                          key={id}
                          onClick={() => {
                            setShowBagCategory(false);
                            setMobileMenu(false);
                          }}
                        >
                          <li className="py-4 px-8 border-t flex justify-between">
                            {b.name}
                            {/* <span className="opacity-50 text-sm">
                              {`(${m.products.data.length})`}
                            </span> */}
                          </li>
                        </Link>
                      );
                    })}
                  </ul>
                )}
              </li>
            ) : item.othermenus ? (
              <li
                className="cursor-pointer py-4 px-5 border-b flex flex-col relative "
                onClick={() => setShowOtherCategory(!showOtherCategory)}
              >
                <div className="flex justify-between items-center">
                  {item.name}
                  <BsChevronDown size={14} />
                </div>
                {showOtherCategory && (
                  <ul className="bg-black/[0.05] -mx-5 mt-4 -mb-4  ">
                    {Array.isArray(otherCategory) ? (
                      otherCategory?.map(({ attributes: b, id }) => {
                        return (
                          <Link
                            href={`/other/${b.slug}`}
                            key={id}
                            onClick={() => {
                              setShowOtherCategory(false);
                              setMobileMenu(false);
                            }}
                          >
                            <li className="py-4 px-8 border-t flex justify-between">
                              {b.name}
                              {/* <span className="opacity-50 text-sm">
                                {`(${m.products.data.length})`}
                              </span> */}
                            </li>
                          </Link>
                        );
                      })
                    ) : (
                      <li>Error: Invalid otherCategory data</li>
                    )}
                  </ul>
                )}
              </li>
            ) : (
              <li className="py-4 px-5 border-b">
                <Link href={item.url} onClick={() => setMobileMenu(false)}>
                  {item.name}
                </Link>
              </li>
            )}
          </React.Fragment>
        );
      })}
    </ul>
  );
};

export default MenuMobile;
