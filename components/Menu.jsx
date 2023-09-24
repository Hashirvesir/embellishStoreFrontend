import React from "react";
import Link from "next/link";
import { BsChevronDown } from "react-icons/bs";

const Menu = ({
  showCatMenu,
  setShowCatMenu,
  categories,
  bagCategory,
  showBagCategory,
  setShowBagCategory,
  otherCategory,
  showOtherCategory,
  setShowOtherCategory,
}) => {
  const data = [
    { id: 1, name: "Home", url: "/" },
    { id: 3, name: "Shoes", subMenu: true },
    { id: 4, name: "Bags", bagmenus: true },
    { id: 5, name: "Others", othermenus: true },
  ];
  // console.log(otherCategory)
  return (
    <ul className="hidden md:flex items-center gap-8 font-medium text-black">
      {data.map((item) => {
        return (
          <React.Fragment key={item.id}>
            {!!item?.subMenu ? (
              <li
                className="cursor-pointer flex items-center gap-2 relative"
                onMouseEnter={() => setShowCatMenu(true)}
                onMouseLeave={() => setShowCatMenu(false)}
              >
                {item.name}
                <BsChevronDown size={14} />
                {showCatMenu && (
                  <ul className="bg-white absolute top-6 left-0 min-w-[250px] px-1 py-1 text-black shadow-lg ">
                    {categories?.map(({ attributes: c, id }) => {
                      return (
                        <Link
                          href={`/category/${c.slug}`}
                          key={id}
                          onClick={() => setShowCatMenu(false)}
                        >
                          <li
                            className="h-12 flex justify-between items-center
                                                px-3 hover:bg-black/[0.03] rounded-md "
                          >
                            {c.name}
                          </li>
                        </Link>
                      );
                    })}
                  </ul>
                )}
              </li>
            ) : !!item?.bagmenus ? (
              <li
                className="cursor-pointer flex items-center gap-2 relative"
                onMouseEnter={() => setShowBagCategory(true)}
                onMouseLeave={() => setShowBagCategory(false)}
              >
                {item.name}
                <BsChevronDown size={14} />
                {showBagCategory && (
                  <ul className="bg-white absolute top-6 left-0 min-w-[250px] px-1 py-1 text-black shadow-lg ">
                    {bagCategory?.map(({ attributes: b, id }) => {
                      return (
                        <Link
                          href={`/bag/${b.slug}`}
                          key={id}
                          onClick={() => setShowBagCategory(false)}
                        >
                          <li
                            className="h-12 flex justify-between items-center
                                                px-3 hover:bg-black/[0.03] rounded-md "
                          >
                            {b.name}
                          </li>
                        </Link>
                      );
                    })}
                  </ul>
                )}
              </li>
            ) : !!item?.othermenus ? (
              <li
                className="cursor-pointer flex items-center gap-2 relative"
                onMouseEnter={() => setShowOtherCategory(true)}
                onMouseLeave={() => setShowOtherCategory(false)}
              >
                {item.name}
                <BsChevronDown size={14} />
                {showOtherCategory && (
                  <ul className="bg-white absolute top-6 left-0 min-w-[250px] px-1 py-1 text-black shadow-lg ">
                  {Array.isArray(otherCategory) ? (
                    otherCategory?.map(({ attributes: o, id }) => {
                      return (
                        <Link
                          href={`/other/${o.slug}`}
                          key={id}
                          onClick={() => setShowOtherCategory(false)}
                        >
                          <li
                            className="h-12 flex justify-between items-center
                                                px-3 hover:bg-black/[0.03] rounded-md "
                          >
                            {o.name}
                          </li>
                        </Link>
                      );
                    })
                  ):(
                    console.log("error")
                  )
                    }
                  </ul>
                )}
              </li>
            ) : (
              <li className="cursor-pointer hover:opacity-70">
                <Link href={item.url}>{item.name}</Link>
              </li>
            )}
          </React.Fragment>
        );
      })}
    </ul>
  );
};

export default Menu;
