"use client";

import React, { useState,useCallback, useEffect } from "react";
import axios from "axios";
import classes from "./page.module.css";
import Link from "next/link";
import { PiMapPinLineThin,PiXSquareBold   } from "react-icons/pi";
import { useCookies } from 'react-cookie';
import { useRouter } from "next/navigation";


const Page = () => {
  const [addresses, setAddresses] = useState([]);
  const [cookies] = useCookies(['authToken']);
  const router = useRouter(); // Initialize the useRouter hook
const fetchData = async () => {
      try {
        const response = await fetch("https://kirolosadel5.pythonanywhere.com/api/addresses/", {
          headers: {
            Authorization: `Bearer ${cookies.authToken}`,
          },
        });
  
        if (!response.ok) {
          // Handle non-successful response
          throw new Error("Failed to fetch data");
        }
  
        const data = await response.json();
        setAddresses(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    } ;

  useEffect(() => {
    fetchData();
  }, [cookies.authToken]);

  if (!cookies.authToken) {
    // If authToken is not present, render the login prompt
    return (
        <div className={classes.notfound}>
          <PiXSquareBold   className="text-8xl text-gray-500" />
          <p>
            يرجو تسجيل الدخول لمشاهدة العناوين لديك!
          </p>
          <Link href="/sign_in">تسجيل الدخول</Link>

        </div>
    );
  }

  
  const handleDeleteAddress = async (addressId) => {
    try {
          // Make the API call to delete the address
          const response = await axios.delete(
            `https://kirolosadel5.pythonanywhere.com/api/addresses/${addressId}/`,
            {
              headers: {
                Authorization: `Bearer ${cookies.authToken}`,
              },
            }
          );
          
        fetchData();
    
        } catch (error) {
          // Handle errors, e.g., show an error message
          console.error('Error deleting address:', error.message);
        }
    
  };  
  
  const handleSetDefaultAddress = async (addressId) => {
    try {
      // Make the API call to set the address as default
      const response = await axios.patch(
        `https://kirolosadel5.pythonanywhere.com/api/addresses/${addressId}/set_default/`,
        {},
        {
          headers: {
            Authorization: `Bearer ${cookies.authToken}`,
          },
        }
      );
  
      // Assuming fetchData is a function to refetch the address data, you can call it here
      fetchData();
  
    } catch (error) {
      // Handle errors, e.g., show an error message
      console.error('Error setting default address:', error.message);
    }
  };
  
  return (
            <>

    <p className="text-4xl font-semibold text-center pt-6 pb-2">
    العناوين
  </p>
  <section className={`mainContainer ${classes.section}`}>
      {addresses.length > 0 ? (
        // Show addresses if there is at least one address

          
          <div className={classes.notfound}>
            {addresses.map((address) => (
              <div key={address.id} className="section1">
<div className={`${classes.card} ${address.default ? classes.defaultCard : ''}`}>
                  <div className={classes.cardHeader}>
                    <h3 className={classes.name}>{address.full_name}</h3>
                    <div className={classes.actions}>
                      <button className={classes.deleteButton} 
                      onClick={() => handleDeleteAddress(address.id)}>حذف</button>
                      <button className={classes.editButton}>تعديل</button>
                      <button className={classes.editButton} 
                      onClick={() => handleSetDefaultAddress(address.id)}
                      >تعيين كافتراضي</button>
                      {/* <button className={classes.confirmButton}>تأكيد</button> */}
                    </div>
                  </div>
                  <div className={classes.cardBody}>
                    <p className={classes.phone}>{address.address_type}</p>
                    <p className={classes.address}>
                      {address.street_details}, {address.building_details},{" "}
                      {address.Area}
                    </p>
                    <p className={classes.phone}>{address.phone}</p>
                  </div>
                </div>
              </div>
            ))}
            <Link href="/account/address/add_address">اضافه عنوان</Link>
          </div>
      ) : (
        // Show the "no addresses" message if there are no addresses
        <div className={classes.notfound}>
          <PiMapPinLineThin className="text-8xl text-gray-500" />
          <p>
            للأسف! ليس لديك عنوان للشحن والتوصيل. أضف عنوانًا لنصل إليك
          </p>
          <Link href="/account/address/add_address">اضافه عنوان</Link>
        </div>
      )}
    </section>
    </>

  );

};

export default Page;
