import React from 'react'
import ProductCard from "@/components/ProductCard";
import {fetchDataApi} from "@/utils/api"
import Wrapper from '@/components/Wrapper';
import useSWR from "swr";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

const resultMax=6
const Shoes = ({res,products}) => {
    const [pageIndex, setPageIndex] = useState(1);
  const { data, error, isLoading } = useSWR(
    `/api/products?populate=*&pagination[page]=${pageIndex}&pagination[pageSize]=${resultMax}`
    ,
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
        <Wrapper>
          {/* Products  */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 my-14 px-5 md:px-0">
          {data?.data?.map((product)=>(
            <ProductCard key={product?.id} data={product} /> 
          ))}
          </div>
           {/* PAGINATION BUTTONS START */}
           {data?.meta?.pagination?.total > resultMax && (
            <div className="flex gap-3 items-center justify-center my-16 md:my-9">
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
        </>
  )
}

export default Shoes


  export async function getServerSideProps() {
    const res = await fetchDataApi("/api/products?populate=*")

    const products = await fetchDataApi(
      `/api/products?populate=*&pagination[page]=1&pagination[pageSize]=${resultMax}`
    );
    // const projects = await res.json()
   
    return { props: { res,products } }
  }
  // Data fetch product from strapi api {end}