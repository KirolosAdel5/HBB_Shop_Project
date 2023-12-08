"use client";

import React, { Fragment, useState,useEffect } from "react";
import axios from 'axios';
import Link from "next/link";
import classes from "./page.module.css";
import { TbTruckDelivery  } from "react-icons/tb";
import { BiCartAlt  } from "react-icons/bi";
import { useCookies } from 'react-cookie';
import { useRouter } from "next/navigation";

const page = () => {
    const [cookies] = useCookies(['authToken', 'cartId']);
    const authToken = cookies.authToken;
    const cartId = cookies.cartId;
    const [cartData, setCartData] = useState(null);
    const router = useRouter();
      const fetchCartData = async () => {
        try {
          const response = await axios.get(`https://kirolosadel5.pythonanywhere.com/api/carts/${cartId}/`);
          setCartData(response.data);
        } catch (error) {
          console.error('Error fetching cart data:', error);
        }
      };
  
    useEffect(() => {
      if (authToken && cartId) {
        fetchCartData();
      }
    }, [authToken, cartId]);
  
    if (!authToken) {
      // Redirect or show login prompt if authToken is not present
      return (
        <div className={classes.notfound}>
          {/* Your login prompt here */}
          <p>Please log in to view your cart.</p>
        </div>
      );
    }
  
    if (!cartData) {
      // Loading state while fetching cart data
      return <p>Loading cart data...</p>;
      
    }
    
    const handleQuantityChange = async (itemId, newQuantity) => {
        try {
          // Make a PATCH request to update the quantity
          await axios.patch(`https://kirolosadel5.pythonanywhere.com/api/carts/${cartData.id}/items/${itemId}/`, {
            quantity: newQuantity,
          });
      
          // Assuming you have a function to refetch the cart data, you can call it here
          fetchCartData();
          router.push("/cart");
          

        } catch (error) {
          console.error('Error updating quantity:', error);
        }
      };

      const handleDelete = async (addressId) => {
        try {
              // Make the API call to delete the address
              const response = await axios.delete(
                `https://kirolosadel5.pythonanywhere.com/api/carts/${cartId}/items/${addressId}/`,
                {
                  headers: {
                    Authorization: `Bearer ${cookies.authToken}`,
                  },
                }
              );
              
              fetchCartData();
        
            } catch (error) {
              // Handle errors, e.g., show an error message
              console.error('Error deleting address:', error.message);
            }
        
      };

      if (cartData.items.length === 0) {
            return (
              <div className={classes.notfound}>
                      <BiCartAlt    className="text-8xl text-gray-500" />

                <h1 className={classes.divH1}>سلة التسوق فارغة</h1>
                <p> هيا قم بإضافة منتجات إليها!</p>
                  <Link href="/" className={classes.addToCart}>البدء بالتسوق</Link>

              </div>
            );
                }

    
                const handleCreateOrder = async () => {                
                  try {
                    // Fetch the addresses
                    const addressesResponse = await axios.get(
                      'https://kirolosadel5.pythonanywhere.com/api/addresses/',
                      {
                        headers: {
                          Authorization: `Bearer ${cookies.authToken}`,
                        },
                      }
                    );
                
                    // Find the default address
                    const defaultAddress = addressesResponse.data.find(
                      (address) => address.default
                    );
                
                    if (!defaultAddress) {
                      console.error('Default address not found');
                
                      // Navigate to the /addaddress route
                      router.push('/account/address/add_address');
                      return;
                    }
                
                    // Make the API call to create the order using the default address
                    const response = await axios.post(
                      'https://kirolosadel5.pythonanywhere.com/api/orders/',
                      {
                        cart_id: cartId,
                        address_id: defaultAddress.id,
                      },
                      {
                        headers: {
                          Authorization: `Bearer ${cookies.authToken}`,
                        },
                      }
                    );
                
                    // Fetch updated cart data
                    fetchCartData();
                    alert('تم الطلب بنجاح');
                  } catch (error) {
                    // Handle errors, e.g., show an error message
                    console.error('Error creating order:', error.message);
                  }
                };
                  
    return (
        <section className={`mainContainer ${classes.section}`}>
            <div className={classes.productTable}>
                <ul className={classes.headTable}>
                    <li>المنتج</li>
                    <li>الوصف</li>
                    <li>السعر </li>
                    <li>الكميه</li>
                    <li>السعر الاجمالي</li>
                </ul>
                <div className={classes.upData}>
                {cartData.items.map((item) => (
            <ul key={item.id} className={classes.bodyTable}>
              <li>
              <Link href={`/subCategory/${item.product.category.slug}/${item.product.slug}`} >
                <img src={item.product.product_image[0].image} alt="" />
                </Link>

              </li>
              <li>
                <p>{item.product.title}</p>
                <p>اللون : {item.color}</p>
                <p>بحجم: {item.size}</p>
                {/* Additional details if needed */}
              </li>
              <li>{item.product.regular_price} ج.م</li>
              <li className={classes.select}>
      <select
        name=""
        id=""
        value={item.quantity}
        onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
      >
        {[1, 2, 3, 4, 5].map((quantityOption) => (
          <option key={quantityOption} value={quantityOption}>
            {quantityOption}
          </option>
        ))}
      </select>
      <button onClick={() => handleDelete(item.id)}>حذف</button>
    </li>

              <li>{item.sub_total} د.ع</li>
            </ul>
          ))}

                    
                </div>
                
                <p className={classes.total}>
                    <span>الاجمالي :</span>
                    <span>{cartData.grand_total} د.ع</span>
                </p>
            </div>
            <div className={classes.payment}>
                <div className={classes.freeDelivery}>
                    <TbTruckDelivery className=" text-4xl" />
                    <p>لقد حصلت على شحن مجاني! تابع عملية الشراء</p>
                </div>
                <div className={classes.part2}>
                    <div className={classes.total}>
                        <p>
                            المجموع الإجمالي ({cartData.total_quantity}): <span>{cartData.grand_total} د.ع</span>
                        </p>
                    </div>
                    <button
                      onClick={() => handleCreateOrder()}
                    >اطلب الان</button>
                </div>
            </div>
        </section>
    );
};

export default page;
