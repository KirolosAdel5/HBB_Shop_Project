'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import classes from "./page.module.css";
import { BsBoxSeam } from "react-icons/bs";
import Link from "next/link";
import { useCookies } from "react-cookie";
import { useRouter } from "next/navigation";

const page = () => {
    const [cookies] = useCookies(['authToken', 'cartId']);
    const authToken = cookies.authToken;
    const cartId = cookies.cartId;
    const [orders, setOrders] = useState([]);
    const router = useRouter();

    useEffect(() => {
        fetchData();
      }, []);
    
      const fetchData = async () => {
        try {
        if (authToken){
            const response = await axios.get('http://localhost:8000/api/orders/'
            , {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            });
            setOrders(response.data);
        }
        else {
            router.push('/sign_in');
        }
        } catch (error) {
          console.error('Error fetching orders:', error.message);
        }
      };
    
      return (
        <section className={`mainContainer ${classes.section}`}>
          <>
            {orders.length === 0 ? (
              <div className={classes.notfound}>
                <BsBoxSeam className="text-8xl text-gray-500" />
                <p>
                  لاتوجد اي طلبات مسجلة آخر 1 شهر.الرجاء الاختيار آخر 3 أشهر
                  سنعمل على تغيير ذلك على الفور.
                </p>
                <Link href="/">ابدا التسوق</Link>
              </div>
            ) : (
              <>
                <p className="text-4xl font-semibold text-center pt-6 pb-2">الطلبات</p>
                
                {orders.map(order => (                     
  <div key={order.id} className={classes.card_container}>
    {order.orderitems.map(orderItem => (
      <div key={orderItem.id} className={classes.card1}>
        <div className={classes.card_image}>
          <Link 
            href={`/subCategory/${orderItem.product.category.slug}/${orderItem.product.slug}`}>
        {orderItem.product.product_image && orderItem.product.product_image[0] && (
        <img src={orderItem.product.product_image[0].image} alt="Product Image" />
      )}        
                </Link>

      </div>
        <div className={classes.card_content}>
          <h2 className={classes.card_title}>
            <i className="fa fa-icon-name"></i> {orderItem.quantity} {orderItem.product.title} 
          </h2>
          <p className={classes.card_price}>اللون : {orderItem.color} </p>
          <p className={classes.card_total_price}>المقاس :{orderItem.size}  <span></span></p>
        </div>
      </div>
    ))}
    <div className={classes.productStatus}>
      <p className={classes.card_status}>رقم الطلب: {order.id}</p>
      <p className={classes.card_status}>حالة الطلب: {order.status}</p>
      <p className={classes.card_total_price}>السعر الإجمالي للطلب: {order.total_price} <span></span></p>
      <p className={classes.card_total_price}>تاريخ الطلب: {order.createAt}<span></span></p>
    </div>
  </div>
))}

              </>
            )}
          </>
        </section>
      );
};      
export default page;
