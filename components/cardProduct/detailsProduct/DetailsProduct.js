"use client";

import React, { Fragment, useEffect, useState } from "react";
import classes from "./DetailsProduct.module.css";
import Slider from "./Slider";
import {TbTruckDelivery} from "react-icons/tb"

// import Card from "../../../app/(store)/favorite/Card";
// import ButtonFav from "@/components/UI/ButtonFav";
// import Button2 from "@/components/UI/Button2";
// import { useAlert } from "@/lib/useAlert";
import { useCookies } from "react-cookie";
import axios from "axios";
import { FaStar } from 'react-icons/fa';
import ReviewModal from '../../reviewModal/ReviewModal';

const DetailsProduct = (props) => {
    const { product_slug } = props;

    const [productData, setProductData] = useState(null);
    const [selectedColor, setSelectedColor] = useState(null);
    const [selectedSize, setSelectedSize] = useState(null);
    const [category_slug, setCategorySlug] = useState(null);
    const [showMore, setShowMore] = useState(false);

    const [cookies] = useCookies(['authToken', 'cartId']);
    const authToken = cookies.authToken;
    const cartId = cookies.cartId;
    const [isModalOpen, setModalOpen] = useState(false);
    
    useEffect(() => {
        fetchData();
    }, [product_slug]); // Include cookies.authToken in the dependency array
    
    const fetchData = async () => {
        try {
            // Define the headers object    

            // Make the API call with the headers
            const response = await axios.get(`http://localhost:8000/api/products/${product_slug}/`);

            setProductData(response.data);
            setCategorySlug(response.data.category.slug);
          } catch (error) {
            console.error("Error fetching product data:", error.message);
        }
    };


  
      if (!productData) {
          // Loading state or handle error
          return <div>Loading...</div>;
      }
  
    const imageLinks = productData.product_image.map((imageObj) => imageObj.image);
    
        // Filter specification values for color
        const colorSpecs = productData.specification_values.filter((spec) => spec.specification_name === 'color');
        const sizeSpecs = productData.specification_values.filter((spec) => spec.specification_name === 'size');

        // Get unique color values
        const uniqueColors = [...new Set(colorSpecs.map((colorSpec) => colorSpec.value))];
        const uniqueSizes = [...new Set(sizeSpecs.map((colorSpec) => colorSpec.value))];
    
        const handleColorClick = (color) => {
          setSelectedColor(color);
        };
        const handleSizeClick = (size) => {
          setSelectedSize(size);
        };


        const handleAddToCart = async (productId) => {
          try {
            if (!selectedColor || !selectedSize){
              alert("يجب اختيار كل من اللون والمقاس");
              return
            }
            const response = await axios.post(
              `http://localhost:8000/api/carts/${cartId}/items/`,
              {
                product_id: productId,
                color: selectedColor,
                size: selectedSize,
                quantity: 1,
              },
              {
                headers: {
                  Authorization: `Bearer ${cookies.authToken}`, 
                },
              }
            );
            alert("تم اضافة العنصر بنجاح الي السلة");

            
          } catch (error) {
            console.error('Error adding item to cart:', error);
          }
        };

        const reviews = {
          ratings: [
            { stars: 5 , count:0},
            { stars: 4 , count:0},
            { stars: 3  , count:0},
            { stars: 2 , count:0},
            { stars: 1  , count:0},
          ],
        };

        productData.reviews.forEach(review => {
          const starIndex = reviews.ratings.findIndex(item => item.stars === review.rating);
          if (starIndex !== -1) {
            reviews.ratings[starIndex].count += 1;
          }
        });
  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    fetchData();
    
  };
  const reviewsToShow = showMore ? productData.reviews.length : 3;

  const handleToggleReviews = () => {
    setShowMore(!showMore);
  };


    return (
        <Fragment>
          {productData && (
            <section className={`mainContainer ${classes.section}`}>
              <div className={classes.part1}>
                <div>
                  <Slider images={imageLinks} />
                </div>
                <div>
                  <p className={classes.name}>{productData.title}</p>
                  <p className={classes.price}>
                    {productData.regular_price} د.ع
                    <span>شاملة ضريبة القيمة المضافة</span>
                  </p>
                  <p className={classes.delivery}>
                    شحن مجاني على اكثر من 300 دينارس | ارجاع مجاني
                  </p>
                  <div className={classes.colors}>
                    <p>الالوان</p>
                    <ul>
        {uniqueColors.map((color, index) => (
          <li
            key={index}
            style={{
              backgroundColor: color,
              outline: color === selectedColor ? "2px solid red" : "none",
            }}
            className={classes.color}
            onClick={() => handleColorClick(color)}
          ></li>
        ))}
      </ul>
                  </div>
                  <div className={classes.size}>
                    <p>المقاسات</p>
                    <ul>
        {uniqueSizes.map((size, index) => (
          <li
            key={index}
            style={{
              border: size === selectedSize ? "2px solid red" : "none",
            }}
            onClick={() => handleSizeClick(size)}
          >
            {size}
          </li>
        ))}
      </ul>
                  </div>
                  
                  <div className={classes.deliveryTime}>
                    <div>
                      <TbTruckDelivery className="text-5xl" />
                    </div>
                    <div>
                      <p>احصل عليه الغد ,٢٤ سبتمبر</p>
                      <p>اطلب خلال 6 ساعات و 56 دقيقة</p>
                    </div>
                  </div>
                  <button onClick={() => handleAddToCart(productData.id)}>اضف الى السلة</button>
                </div>
              </div>
              <div className={classes.part2}>
                <p>وصف المنتج:</p>
                <p style={{ whiteSpace: "pre-line" }}>{productData.description}</p>              
                
              </div>
              <div className={classes.part3}>
                <p>تقييمات</p>
                <div>
      <div className={classes.review_section}>
        {/* First Column */}
        <div className={classes.column}>
          <div className={classes.rating_title}>معدل التقييم</div>
          <div className={classes.average_rating}>{productData.rating.toFixed(1)}</div>
          <div className={classes.out_of_five} >من أصل 5 نجوم</div>
        </div>

        {/* Second Column */}
        <div className={classes.column}>
          {reviews.ratings.map((rating, index) => (
            <div key={index} className={classes.rating_item}>
              <div className={classes.stars}>
                {[...Array(rating.stars)].map((_, i) => (
                  <FaStar key={i} className="MuiRating-icon MuiRating-iconFilled" 
                  style={{ color: '#626262' }}
                  />
                ))}
                             
              <div className={classes.line}></div>
              {rating.count}
              </div>
            </div>
          ))}
        </div>

        {/* Third Column */}
        <div className={classes.column}>
          <div className={classes.write_review_title} >؟ما رأيك في هذا المنتج</div>
          <button className={classes.write_review_btn} onClick={openModal}  tabIndex="0" type="button">
            <span>يرجى كتابة تقييم</span>
          </button>
        </div>
      </div>
    </div>

              </div>  
              <ReviewModal isOpen={isModalOpen} onClose={closeModal} product_slug={product_slug}  category_slug={category_slug}/>
              
              {productData.reviews.slice(0, reviewsToShow).map((review, index) => (
        <div key={index} className={classes.reviewCard}>
          <div className={classes.ratingContainer}>
            {[...Array(review.rating)].map((_, i) => (
              <FaStar key={i} className={classes.starIcon} />
            ))}
          </div>
          <p className={classes.reviewText}>{review.comment}</p>
          <p className={classes.owner}>By {review.user}</p>
        </div>
      ))}
      {productData.reviews.length > 3 && (
        // Render the "Load More Reviews" or "Load Less" button based on showMore state
        <button onClick={handleToggleReviews} 
        className={classes.write_review_btn}
        >
          {showMore ? 'عرض اقل للتعليقات' : 'تحميل المزيد من التعليقات'}
        </button>
      )}


            </section>
          )}
        </Fragment>
      );
    };
    
    export default DetailsProduct;