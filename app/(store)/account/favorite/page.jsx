"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import classes from "./page.module.css";
import { useCookies } from 'react-cookie';
import Link from "next/link";
import ButtonAddToCart from "../../../../components/UI/button/ButtonAddToCart";

const Page = () => {
  const [wishlist, setWishlist] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Check if the authToken exists in cookies
  const [cookies] = useCookies(['authToken']);

  const isAuthenticated = !!cookies.authToken;
      const fetchWishlist = async () => {
      try {
        const response = await axios.get("https://kirolosadel5.pythonanywhere.com/api/wishlist/", {
          headers: {
            Authorization: `Bearer ${cookies.authToken}`
          }
        });
        setWishlist(response.data);
        console.log(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching wishlist data:", error.message);
        setIsLoading(false);
      }
    };

    useEffect(() => {

    if (isAuthenticated) {
      fetchWishlist();
    } else {
      setIsLoading(false);
    }
  }, [isAuthenticated]);

  const deleteFromWishlist = async (productId) => {
    try {

        // Make the DELETE API call to remove the product from the wishlist
        const response = await axios.post(`https://kirolosadel5.pythonanywhere.com/api/wishlist/add_to_wishlist/${productId}/`, null, {
          headers: {
                Authorization: `Bearer ${cookies.authToken}`,
            },
        });

        fetchWishlist();
        

    } catch (error) {
        // Handle errors, e.g., show an error message
        console.error('Error removing from wishlist:', error.message);
    }
};


  return (
    <section className={`mainContainer ${classes.section}`}>
      {isLoading ? (
        <p>Loading...</p>
      ) : isAuthenticated ? (
        wishlist.length > 0 ? (
          <div>
            {wishlist.map((wishlistItem) => (
              <div key={wishlistItem.product.id} className={classes.card}>
            <Link href={`/subCategory/${wishlistItem.product.category.slug}/${wishlistItem.product.id}`} className={classes.img}>
            {wishlistItem.product.product_image.find(image => image.is_feature) && (
        <img
            src={wishlistItem.product.product_image.find(image => image.is_feature).image}
            alt={wishlistItem.product.product_image.alt_text}
                    />
                )}
            </Link>
                <div className={classes.details}>
          <h3 className={classes.name}>{wishlistItem.product.title} </h3>
          <p>{wishlistItem.product.description.length > 100 ? `${wishlistItem.product.description.slice(0, 100)}...` : wishlistItem.product.description}</p>
          <p className={classes.price}> {wishlistItem.product.regular_price}د.ع</p>
          <a href="/account/favorite" className={classes.link}  style={{ width: '100%' }}  onClick={() => deleteFromWishlist(wishlistItem.product.id)}>حذف</a>
      <ButtonAddToCart 
                productId={wishlistItem.product.id}
            />

        </div>


              </div>
              
            ))}
          </div>
        ) : (
          <p>لا توجد منتجات في قائمة المفضلة حاليًا</p>
        )
      ) : (
        <p>يرجى تسجيل الدخول لعرض منتجاتك المفضلة</p>
      )}
    </section>
  );
};

export default Page;
