"use client";
import React, { Fragment, useEffect, useState } from "react";
import axios from 'axios';

import classes from "./page.module.css";
import Link from "next/link";

const page = ({params}) => {
    const [categoryName, setcategoryName] = useState([]);
    const [categories, setCategories] = useState([]);
    const [categoryImages, setCategoryImages] = useState([]);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get(`http://localhost:8000/api/categories/${params.categoryId}/`);
          setcategoryName(response.data.name);
          setCategories(response.data.children);
          setCategoryImages(response.data.category_images);

        } catch (error) {
          console.error("Error fetching data:", error.message);
        }
      };
  
      fetchData();
    }, []); // The empty dependency array ensures that the effect runs once after the initial render
    
    return (
        <section className={`mainContainer ${classes.section}`}>
        <p>اقسامنا لل{categoryName}</p>

        <div className={classes.subCategory}>
          {/* Render your data here */}
          {categories.map((category) => (
            <div key={category.slug}>   
          <Link href={`/subCategory/${category.slug}`}>
            {category.category_images.length > 0 ? (
              <img 
              src={`http://127.0.0.1:8000${category.category_images[0].image}`} 
              alt={category.name} 
              
              />
              ) : (
              <img src={`/image/icons8-shoes-50.png`} alt="" />
            )}
          </Link>
              <p>{category.name}</p>
            </div>
          ))}
        </div>
        <div className={classes.ads}>
          <div>
          {categoryImages.map((image) => (
          <div key={image.id}>
            <img src={image.image} alt={image.alt_text || ''} />
          </div>
        ))}          </div>
        </div>
      </section>
    );
};

export default page;
