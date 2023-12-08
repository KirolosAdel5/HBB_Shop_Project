// YourPageComponent.jsx
"use client";

import React, { Fragment, useState,useEffect } from "react";
import axios from 'axios';
import styles from "./page.module.css";
import { useRouter ,useSearchParams} from "next/navigation";
import { BiSearch } from "react-icons/bi";
import Link from "next/link";

const YourPageComponent = () => {
  const searchParams = useSearchParams()
  const q = searchParams.get('q');
  const category = searchParams.get('category');
  const [products, setProducts] = useState([]);
  const router = useRouter(); // Initialize the useRouter hook

  const fetchData = async () => {
    try {

      if(!category){
        const response = await axios.get(`https://kirolosadel5.pythonanywhere.com/api/products/?search=${q}`);
        setProducts(response.data.results);
        return
      }

      else{
        const response = await axios.get(`https://kirolosadel5.pythonanywhere.com/api/products/?search=${q}&category=${category}`);
        setProducts(response.data.results);
        return
      }

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [q, category]);

  const handleCategoryClick = (selectedCategory) => {
    //router.push
    router.push(`/search?q=${encodeURIComponent(q)}&category=${encodeURIComponent(selectedCategory)}`);

  };

  if (products.length === 0) {
    return (
      <div className={styles.notfound}>
      <div>
      <button className={styles.categoriesButton} onClick={() => handleCategoryClick('men')}>
          Men
        </button>
        <button className={styles.categoriesButton} onClick={() => handleCategoryClick('women')}>
          Women
        </button>
        <button className={styles.categoriesButton} onClick={() => handleCategoryClick('kids')}>
          Child
        </button>      </div>
              <BiSearch   className="text-8xl text-gray-500" />
        <h1 className={styles.divH1}> نأسف لاتوجد مطابقة “{q}”</h1>
        <p> تحقق من الإملاء ، واستخدم كلمات رئيسية مختلفة وحاول مرة أخرى
</p>
      </div>
    );
  }

  const truncateText = (text, maxLength) => {
    return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
  };
  return (
    <nav className={styles.resultpage}>
      <div className={styles.divH1}>
        <h1>
        لقد بحثت عن ”<span>{q}</span>“
          <button className={styles.BACK1} >
            <i className="fas fa-arrow-left"></i>
          </button>
        </h1>
      </div>
      <div>
      <button className={styles.categoriesButton} onClick={() => handleCategoryClick('men')}>
          Men
        </button>
        <button className={styles.categoriesButton} onClick={() => handleCategoryClick('women')}>
          Women
        </button>
        <button className={styles.categoriesButton} onClick={() => handleCategoryClick('kids')}>
          Child
        </button>      </div>
      {products.map((product) => (
                  <Link href={`/subCategory/${product.category.slug}/${product.slug}`} >

                <div className={styles.card} key={product.id}>
                <img className={styles.part1} src={product.product_image[0].image} alt="صورة المنتج" />
                <div>
                  <h3 className={styles.textH3}>{product.title}</h3>
                  <p>{truncateText(product.description, 100)}</p>
                </div>
                <h2 className={styles.divH2}>{product.regular_price}  د.ع</h2>
                <button className={styles.addToCart}>add to cart</button>
              </div>
            </Link>
        ))} 

    </nav>
  );
};

export default YourPageComponent;
