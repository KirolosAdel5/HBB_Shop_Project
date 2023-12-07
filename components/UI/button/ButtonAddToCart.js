import React, { useState,useEffect } from 'react';
import { BiX } from 'react-icons/bi';
import classes from './ButtonAddToCart.module.css';
import { useCookies } from "react-cookie";
import axios from "axios";

const ButtonAddToCart = (props) => {
  const { productId } = props;
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [productData, setProductData] = useState(null);
  const [cookies] = useCookies(['authToken', 'cartId']);
  const authToken = cookies.authToken;
  const cartId = cookies.cartId;

  useEffect(() => {
      const fetchData = async () => {
          try {
              // Define the headers object    
  
              // Make the API call with the headers
              const response = await axios.get(`http://localhost:8000/api/products/${productId}/`);
  
              setProductData(response.data);
            } catch (error) {
              console.error("Error fetching product data:", error.message);
          }
      };
  
      fetchData();
  }, [productId]); // Include cookies.authToken in the dependency array
  

    if (!productData) {
        // Loading state or handle error
        return <div>Loading...</div>;
    }

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
  const handleButtonClick = () => {
    setIsPopupOpen(true);
  };

  const handlePopupClose = () => {
    setIsPopupOpen(false);
  };


  // Example uniqueColors and uniqueSizes, replace with your data

  const handleAddToCart = async (productId) => {
    try {
      if (!selectedColor || !selectedSize){
        alert("يجب اختيار كل من اللون والمقاس");
        return
      }
      if (authToken){
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
        handlePopupClose();
        alert("تم اضافة العنصر بنجاح الي السلة");
      }

      else{
          alert("يجب تسجيل الدخول اولا")
      }
      
    } catch (error) {
      console.error('Error adding item to cart:', error);
    }
  };

  return (
    <div className={classes.container}>
      <button className={classes.btn} onClick={handleButtonClick}>
        اضافة الى السلة
      </button>

      {isPopupOpen && (
        <div className={classes.popupContainer}>
          <div className={classes.overlay} onClick={handlePopupClose}></div>
          <div className={classes.popup}>
            <button className={classes.closeIcon} onClick={handlePopupClose}>
              <BiX style={{ fontSize: '24px' }}/>
            </button>
            <div className={classes.colors}>
              <p>الالوان</p>
              <ul>
                {uniqueColors.map((color, index) => (
                  <li
                    key={index}
                    style={{
                      backgroundColor: color,
                      outline: color === selectedColor ? '2px solid red' : 'none',
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
                      border: size === selectedSize ? '2px solid red' : 'none',
                    }}
                    onClick={() => handleSizeClick(size)}
                  >
                    {size}
                  </li>
                ))}
              </ul>
            </div>

            <button className={classes.btn} onClick={() => handleAddToCart(productData.id)}>
        اضافة الى السلة
      </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ButtonAddToCart;
