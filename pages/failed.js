import React from "react";
import Wrapper from "@/components/Wrapper";
import Link from "next/link";

const Failed = () => {
    return (
        <div className="min-h-[650px] flex items-center">
            <Wrapper>
                <div className="max-w-[600px] rounded-lg p-5 border border-red-400 mx-auto flex flex-col">
                    <div className="text-2xl font-bold text-red-700">Payment failed!</div>
                    <div className="text-base mt-5">
                        For any product not query, drop an email to
                    </div>
                    <div className="underline">embellishstore11.pk@gmail.com</div>

                    <Link href="/" className="font-bold mt-5">
                        Continue Shopping
                    </Link>
                </div>
            </Wrapper>
        </div>
    );
};

export default Failed;