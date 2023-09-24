import React from "react";
import Wrapper from "@/components/Wrapper";
import ProductCard from "@/components/ProductCard";
import { fetchDataApi } from "@/utils/api";
import useSWR from "swr";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
const resultMax = 12;
const Category = ({ category, products, slug }) => {

  const [pageIndex, setPageIndex] = useState(1);
  const { data, error, isLoading } = useSWR(
    `/api/products?populate=*&[filters][categories][slug][$eq]=${slug}&pagination[page]=${pageIndex}&pagination[pageSize]=${resultMax}`,
    fetchDataApi,
    {
      fallbackData: products,
    }
  );
  const { query } = useRouter();
  useEffect(() => {
    setPageIndex(1);
  }, [query]);

  return (
    <>
      <div className="w-full md:py-20 relative">
        <Wrapper>
          <div className="text-center max-w-[800px] mx-auto mt-8 md:mt-0">
            <div className="text-[28px] md:text-[34px] mb-5 font-semibold">
              {category?.data?.[0]?.attributes?.name}
            </div>
          </div>
          {/* Products  */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 my-14 px-5 md:px-0">
            {data?.data?.map((product) => (
              <ProductCard key={product?.id} data={product} />
            ))}
            {/* <ProductCard /> */}
          </div>
          {/* Products  */}
          {/* PAGINATION BUTTONS START */}
          {data?.meta?.pagination?.total > resultMax && (
            <div className="flex gap-3 items-center justify-center my-16 md:my-0">
              <button
                className={`rounded py-2 px-4 bg-black text-white disabled:bg-gray-200 disabled:text-gray-500`}
                disabled={pageIndex === 1}
                onClick={() => setPageIndex(pageIndex - 1)}
              >
                Previous
              </button>

              <span className="font-bold">{`${pageIndex} of ${
                data && data.meta.pagination.pageCount
              }`}</span>

              <button
                className={`rounded py-2 px-4 bg-black text-white disabled:bg-gray-200 disabled:text-gray-500`}
                disabled={
                  pageIndex === (data && data.meta.pagination.pageCount)
                }
                onClick={() => setPageIndex(pageIndex + 1)}
              >
                Next
              </button>
            </div>
          )}
          {/* PAGINATION BUTTONS END */}
          {isLoading && (
            <div className="absolute top-0 left-0 w-full h-full bg-white/[0.5] flex flex-col gap-5 justify-center items-center">
              <img src="/logo.svg" width={150} />
              <span className="text-2xl font-medium">Loading...</span>
            </div>
          )}
        </Wrapper>
      </div>
    </>
  );
};

export default Category;

export const getStaticPaths = async () => {
  const category = await fetchDataApi("/api/categories?populate=*");
  const paths = category.data.map((c) => ({
    params: {
      slug: c.attributes.slug,
    },
  }));
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params: { slug } }) => {
  const category = await fetchDataApi(
    `/api/categories?filters[slug][$eq]=${slug}`
  );
  const products = await fetchDataApi(
    `/api/products?populate=*&[filters][categories][slug][$eq]=${slug}&pagination[page]=1 &pagination[pageSize]=${resultMax}`
  );

  return {
    props: { category, products, slug },
  };
};
