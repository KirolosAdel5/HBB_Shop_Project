'use client';
import React, { Fragment, useState, useEffect} from "react";
import axios from 'axios';
import classes from "./Footer.module.css";
import { BsInstagram, BsTelephone, BsTwitter } from "react-icons/bs";
import { FaFacebookF } from "react-icons/fa";
import Link from "next/link";
import apiConfig from "@/config/apiConfig";


const Footer = () => {
    const [menCategories, setMenCategories] = useState([]);
    const [womenCategories, setWomenCategories] = useState([]);
    const [kidsCategories, setKidsCategories] = useState([]);
    
    const fetchData = async () => {
      try {
        const menCategories = await axios.get(`${apiConfig.apiUrl}/api/categories/men/`);
        setMenCategories(menCategories.data.children);
        const womenCategories = await axios.get(`${apiConfig.apiUrl}/api/categories/women/`);
        setWomenCategories(womenCategories.data.children);
        const kidsCategories = await axios.get(`${apiConfig.apiUrl}/api/categories/kids/`);
        setKidsCategories(kidsCategories.data.children);

      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    useEffect(() => {
        fetchData();
      }, []); 
    return (
        <Fragment>
            <footer
                className={` md:grid hidden mainContainer ${classes.footer}`}
            >
                <div>
                    <p>النساء</p>
                    {womenCategories.map((category) => (
  <ul key={category.slug}>
    <Link href={`/subCategory/${category.slug}`} >
    <li>{category.name}</li>
    </Link>
    {category.children.map((subcategory) => (
            <Link href={`/subCategory/${subcategory.slug}`} >

      <li key={subcategory.slug}>{subcategory.name}</li>
      </Link>

    ))}
  </ul>
))}

                </div>
                <div>
                    <p>الرجال</p>
                    {menCategories.map((category) => (
  <ul key={category.slug}>
    <Link href={`/subCategory/${category.slug}`} >
    <li>{category.name}</li>
    </Link>
    {category.children.map((subcategory) => (
            <Link href={`/subCategory/${subcategory.slug}`} >

      <li key={subcategory.slug}>{subcategory.name}</li>
      </Link>

    ))}
  </ul>
))}
                </div>
                <div>
                    <p>الاطفال</p>
                    {kidsCategories.map((category) => (
  <ul key={category.slug}>
    <Link href={`/subCategory/${category.slug}`} >
    <li>{category.name}</li>
    </Link>
    {category.children.map((subcategory) => (
            <Link href={`/subCategory/${subcategory.slug}`} >

      <li key={subcategory.slug}>{subcategory.name}</li>
      </Link>

    ))}
  </ul>
))}                </div>
                <div>
                    <p>عنا</p>
                    <ul>
                        <li>قسم</li>
                        <li>قسم</li>
                        <li>قسم</li>
                    </ul>
                </div>
                <div className={classes.contact}>
                    <div className="flex flex-col gap-4">
                        <div>
                            <div>
                                <BsTelephone />
                            </div>
                            <div>
                                <p>تحدث الينا</p>
                                <p>01252454545</p>
                            </div>
                        </div>
                        <div>
                            <div>
                                <BsTelephone />
                            </div>
                            <div>
                                <p>تحدث الينا</p>
                                <p>01252454545</p>
                            </div>
                        </div>
                        <div>
                            <div>
                                <BsTelephone />
                            </div>
                            <div>
                                <p>تحدث الينا</p>
                                <p>01252454545</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-8">
                        <FaFacebookF />
                        <BsInstagram />
                        <BsTwitter />
                    </div>
                </div>
            </footer>
            <footer
                className={`md:hidden flex items-center justify-center flex-col p-8 gap-8 ${classes.smallFooter}`}
            >
                <div>
                    <p>اتصل بينا</p>
                    <p>موقع متاجرنا</p>
                    <p>مساعده</p>
                    <p>من نحن</p>
                </div>
                <div className="flex items-center gap-8 text-4xl">
                    <FaFacebookF />
                    <BsInstagram />
                    <BsTwitter />
                </div>
                <div className={classes.logo}>
                    <img src="/image/main logo.svg" alt="main logo" />
                </div>
            </footer>
        </Fragment>
    );
};

export default Footer;
