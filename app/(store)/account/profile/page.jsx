"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useRouter } from "next/navigation";

import classes from "./page.module.css";
import apiConfig from '../../../../config/apiConfig';

const page = () => {
    const [cookies] = useCookies(['authToken']);
    const router = useRouter();

    const [userData, setUserData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
          // Check if authToken is not available
          if (!cookies.authToken) {
            // Redirect to login page
            router.push('/login'); // Replace '/login' with your actual login page route
            return;
          }
    
          try {
            const response = await axios.get(`${apiConfig.apiUrl}/api/users/me/`, {
              headers: {
                Authorization: `Bearer ${cookies.authToken}`,
              },
            });
            setUserData(response.data[0]);
          } catch (error) {
            console.error('Error fetching user data:', error.message);
          }
        };
    
        fetchData();
      }, [cookies.authToken, router]);
    
    
    return (
        <>
        <p className="text-4xl font-semibold text-center pt-6 pb-2">
            الملف الشخصي
        </p>
            <form action="" className={classes.form}>
                
            <div className={`${classes["input-group"]} mt-8 flex`}>
            <label htmlFor="fname">الاسم الاول</label>
            <input type="text" name="fname" id="fname" className="w-full" value={userData.first_name} />
          </div>
          <div className={`${classes["input-group"]} mt-8`}>
            <label htmlFor="lname">الاسم الثاني</label>
            <input type="text" name="lname" id="lname" className="w-full" value={userData.last_name} />
          </div>                    
                <div className={`${classes["input-group"]} mt-8 `}>
                    <label htmlFor="">رقم الهاتف</label>
                    <input type="text" name="" id="" className="w-full" value={userData.phone_number}/>
                </div>
                
                <div>
                </div>
                <div>
                    <label htmlFor="">كلمه السر القديمه</label>
                    <input type="text" name="" id="" className="w-full"/>
                </div>
                <div>
                    <label htmlFor="">كلمه السر الجديده</label>
                    <input type="text" name="" id="" className="w-full"/>
                </div>
                <button>تحديث بيانات المستخدم</button>
            </form>
        </>
    );
};

export default page;
