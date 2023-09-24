import React from "react";
import { FaFacebookF, FaTwitter, FaYoutube, FaInstagram } from "react-icons/fa";
import Wrapper from "./Wrapper";
import Link from "next/link";


const Footer = () => {
    return (
        <footer className="bg-black text-white pt-14 pb-3">
            <Wrapper className="flex justify-between flex-col md:flex-row gap-[50px] md:gap-0">
                {/* LEFT START */}
                <div className="flex gap-[50px] md:gap-[75px] lg:gap-[100px] flex-col md:flex-row">
                    {/* MENU START */}
                    <div className="flex flex-col gap-3 shrink-0">
                        <div className="font-oswald font-medium uppercase text-sm cursor-pointer">
                            Contact us
                        </div>
                        <div className="font-oswald font-medium uppercase text-sm cursor-pointer">
                          +92 3318009012
                        </div>
                        <div className="font-oswald font-medium  text-sm cursor-pointer">
                        embellishstore11.pk@gmail.com                      
                          </div>
                     
                       
                    </div>
                    {/* MENU END */}

                    {/* NORMAL MENU START */}
                    <div className="flex gap-[50px] md:gap-[75px] lg:gap-[100px] shrink-0">
                        {/* MENU START */}
                        <div className="flex flex-col gap-3">
                        <Link href="/about">
                        <div className="text-sm text-white/[0.5] hover:text-white cursor-pointer">
                                About
                            </div>
                        </Link>
                            <Link href="/termCondition">
                            <div className="text-sm text-white/[0.5] hover:text-white cursor-pointer">
                                    Terms & Conditions                     
                                </div>
                            </Link>
                            <Link href="/faq">
                            <div className="text-sm text-white/[0.5] hover:text-white cursor-pointer">
                                   FAQ                     
                                </div>
                            </Link>
                        </div>
                        {/* MENU END */}

                        {/* MENU START */}
                        <div className="flex flex-col gap-3">
                            <Link href="/privacyPolicy">
                            <div className="text-sm text-white/[0.5] hover:text-white cursor-pointer">
                            Privacy Policy
                            </div>
                            </Link>
                            {/* <div className="text-sm text-white/[0.5] hover:text-white cursor-pointer">
                                Careers
                            </div>
                            <div className="text-sm text-white/[0.5] hover:text-white cursor-pointer">
                                Investors
                            </div> */}
                            <Link href="/returnPolicy">
                            <div className="text-sm text-white/[0.5] hover:text-white cursor-pointer">
                                Return Policy
                            </div>
                            </Link>
                        </div>
                        {/* MENU END */}
                    </div>
                    {/* NORMAL MENU END */}
                </div>
                {/* LEFT END */}

                {/* RIGHT START */}
                <div className="flex gap-4 justify-center md:justify-start">
                <Link href="https://www.facebook.com/profile.php?id=61551998720622&mibextid=9R9pXO">
                    <div className="w-10 h-10 rounded-full bg-white/[0.25] flex items-center justify-center text-black hover:bg-white/[0.5] cursor-pointer">
                        <FaFacebookF size={20} />
                    </div>
                </Link>
                <Link href="https://instagram.com/emb_ellishpkk?igshid=OGQ5ZDc2ODk2ZA==">
                    <div className="w-10 h-10 rounded-full bg-white/[0.25] flex items-center justify-center text-black hover:bg-white/[0.5] cursor-pointer">
                        <FaInstagram size={20} />
                    </div>
                </Link>
                    {/* <div className="w-10 h-10 rounded-full bg-white/[0.25] flex items-center justify-center text-black hover:bg-white/[0.5] cursor-pointer">
                        <FaYoutube size={20} />
                    </div>
                    <div className="w-10 h-10 rounded-full bg-white/[0.25] flex items-center justify-center text-black hover:bg-white/[0.5] cursor-pointer">
                        <FaInstagram size={20} />
                    </div> */}
                </div>
                {/* RIGHT END */}
            </Wrapper>
            <Wrapper className="flex justify-between mt-10 flex-col md:flex-row gap-[10px] md:gap-0">
                {/* LEFT START */}
                <div className="text-[12px] text-white/[0.5] hover:text-white cursor-pointer text-center md:text-left">
                    © 2023 Embellish, Inc. All Rights Reserved
                </div>
                {/* LEFT END */}

                
            </Wrapper>
        </footer>
    );
};

export default Footer;