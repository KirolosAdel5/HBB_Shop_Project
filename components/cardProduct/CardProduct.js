import React, { useState, useEffect } from "react";
import axios from "axios";
import classes from "./CardProduct.module.css";
import ButtonAddToCart from "../UI/button/ButtonAddToCart";
import { MdOutlineBookmark, MdOutlineBookmarkAdded } from 'react-icons/md';
import { useRouter } from "next/navigation";
import { useCookies } from 'react-cookie';
import Link from "next/link";
const CardProduct = ({ productId }) => {
    const [cookies] = useCookies(['authToken']);
    const router = useRouter();
    const [isInWishlist, setIsInWishlist] = useState(false);

    const [product, setProduct] = useState(null);

    useEffect(() => {
      const fetchData = async () => {
          try {
              // Define the headers object
              let headers = {};
  
              // Check if authToken is present in cookies
              if (cookies.authToken) {
                  headers = {
                      Authorization: `Bearer ${cookies.authToken}`,
                  };
              }
  
              // Make the API call with the headers
              const response = await axios.get(`http://localhost:8000/api/products/${productId}/`, {
                  headers: headers,
              });
  
              setProduct(response.data);
              setIsInWishlist(response.data.is_featured);  
            } catch (error) {
              console.error("Error fetching product data:", error.message);
          }
      };
  
      fetchData();
  }, [productId, cookies.authToken]); // Include cookies.authToken in the dependency array
  

    if (!product) {
        // Loading state or handle error
        return <div>Loading...</div>;
    }
    // Filter specification values for color
    const colorSpecs = product.specification_values.filter((spec) => spec.specification_name === 'color');

    // Get unique color values
    const uniqueColors = [...new Set(colorSpecs.map((colorSpec) => colorSpec.value))];

    const addToWishlist = async (productId) => {
        try {
            // Check if the user is authenticated
            if (!cookies.authToken) {
                // Redirect to the login page if not authenticated
                router.push('/sign_in');
                return;
            }

            // Make the API call to add the product to the wishlist
            const response = await axios.post(`http://localhost:8000/api/wishlist/add_to_wishlist/${productId}/`, null, {
                headers: {
                    Authorization: `Bearer ${cookies.authToken}`,
                },
            });

            // Handle the response, e.g., show a success message
            console.log(response.data);

            setIsInWishlist(!isInWishlist);

        } catch (error) {
            // Handle errors, e.g., show an error message
            console.error('Error adding to wishlist:', error.message);
        }
    };

    return (
        <div className={classes.card}>
        <div
            className={`${classes.addToFav} ${isInWishlist ? classes.addToFavColor :''}`}
            onClick={() => addToWishlist(product.id)}
        >
            {isInWishlist ? <MdOutlineBookmark /> : < MdOutlineBookmarkAdded />}
        </div>

            <Link href={`/subCategory/${product.category.slug}/${product.slug}`} className={classes.img}>
            {product.product_image.find(image => image.is_feature) && (
        <img
            src={product.product_image.find(image => image.is_feature).image}
            alt={product.title}
                    />
                )}
            </Link>

            <p>
                {product.regular_price} <span>د.ع</span>
            </p>
            <p>{product.title}</p>
            <div className={classes.colors}>
                {uniqueColors.map((color, index) => (
                    <span key={index} style={{ backgroundColor: color }} className={classes.color}></span>
                ))}
        
                <p>{uniqueColors.length} الوان متاحة</p>
            </div>
            <ButtonAddToCart 
                productId={product.id}
            />
        </div>
    );
};

export default CardProduct;
  