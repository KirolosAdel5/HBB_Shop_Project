"use client";
import React, { Fragment, useState,useEffect } from "react";
import classes from "./Aside.module.css";
import { MdOutlineClose } from "react-icons/md";
import { BsPersonFill } from "react-icons/bs";
import { IoMdMan, IoMdWoman } from "react-icons/io";
import { BiLogOut, BiSolidReport } from "react-icons/bi";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaBabyCarriage, FaCartShopping } from "react-icons/fa6";
import { useCookies } from 'react-cookie';
import axios from 'axios';
import apiConfig from "@/config/apiConfig";


const Aside = (props) => {
    const pathname = usePathname();
    const [cookies] = useCookies(['authToken']);
    const authToken = cookies.authToken;

    const removeCookie = (name) => {
        document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      };
            const handleLogout = async () => {
                try {
                    const headers = {
                        'Authorization': 'Bearer '+authToken,
                    };
                    
                    const response = await axios.post(`${apiConfig.apiUrl}/api/logout/`, {}, { headers });
            
                    if (response.status === 200) {
                        removeCookie('authToken'); // Replace 'authToken' with the actual cookie name

                        console.log("Logged out successfully");
                    } else {
                        console.log("Logout failed");
                    }
                } catch (error) {
                    console.error("Error logging out:", error);
                    // Handle the error here
                }
            };
    return (
        <section className={classes.section}>
            <aside className={classes.aside}>
                <div className={classes.close} onClick={props.onHideAside}>
                    <MdOutlineClose />
                </div>
                <div className={classes.head}>
                    <Link href="/" className={classes.logo}>
                        <img src="/image/main logo.svg" alt="main logo" />
                    </Link>
                </div>
                <ul className="flex gap-8 flex-col">
                    <li className={pathname == "/account" && classes.active}>
                        <span className={classes.border}></span>
                        <Link
                            href={{
                                pathname: "/account",
                            }}
                            onClick={props.onHideAside}
                        >
                            <BsPersonFill />
                            حسابي
                        </Link>
                    </li>

                    <li
                        className={
                            pathname == "/category/men" && classes.active
                        }
                    >
                        <span className={classes.border}></span>
                        <Link
                            href={{
                                pathname: "/category/men",
                            }}
                            onClick={props.onHideAside}
                        >
                            <IoMdMan />
                            الرجال
                        </Link>
                    </li>
                    <li className={pathname == "/category/women" && classes.active}>
                        <span className={classes.border}></span>
                        <Link
                            href={{
                                pathname: "/category/women",
                            }}
                            onClick={props.onHideAside}
                        >
                            <IoMdWoman />
                            النساء
                        </Link>
                    </li>
                    <li className={pathname == "/category/kids" && classes.active}>
                        <span className={classes.border}></span>
                        <Link
                            href={{
                                pathname: "/category/kids",
                            }}
                            onClick={props.onHideAside}
                        >
                            <FaBabyCarriage />
                            اطفال
                        </Link>
                    </li>
                    <li className={pathname == "/cart" && classes.active}>
                        <span className={classes.border}></span>
                        <Link
                            href={{
                                pathname: "/cart",
                            }}
                            onClick={props.onHideAside}
                        >
                            <FaCartShopping />
                            السله
                        </Link>
                    </li>
                </ul>
                <span className={classes.hr}></span>
                {cookies.authToken ? (
        <div className="flex items-center px-10 gap-4 cursor-pointer font-semibold">
          <div onClick={handleLogout}>تسجيل الخروج</div>
          <BiLogOut className="text-4xl" />
        </div>
      ) : (
        <div className="flex items-center px-10 gap-4 cursor-pointer font-semibold">
          <Link href="/sign_in">تسجيل الدخول</Link>
          {/* Render the appropriate icon */}
        </div>
      )}
                
            </aside>
        </section>
    );
};

export default Aside;
