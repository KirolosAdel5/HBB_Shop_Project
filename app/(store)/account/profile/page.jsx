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

    const [userData, setUserData] = useState({
      first_name: '',
      last_name: '',
      phone_number: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevUserData) => ({ ...prevUserData, [name]: value }));
  };

  const handleUpdate = async () => {
    try {
        const response = await axios.patch(
            `${apiConfig.apiUrl}/api/users/me/`,
            {
                first_name: userData.first_name,
                last_name: userData.last_name,
                phone_number: userData.phone_number,
            },
            {
                headers: {
                    Authorization: `Bearer ${cookies.authToken}`,
                },
            }
        );
        console.log('User data updated successfully:', response.data);
        // Optionally, you can update the state with the new data
        setUserData(response.data);
    } catch (error) {
        console.error('Error updating user data:', error.message);
    }
};


    useEffect(() => {
        const fetchData = async () => {
          // Check if authToken is not available
          if (!cookies.authToken) {
            // Redirect to login page
            router.push('/sign_in'); // Replace '/login' with your actual login page route
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
            <label htmlFor="first_name">الاسم الاول</label>
            <input type="text" name="first_name" id="first_name" className="w-full" value={userData.first_name} 
                                              onChange={handleInputChange}

            />
          </div>
          <div className={`${classes["input-group"]} mt-8`}>
            <label htmlFor="last_name">الاسم الثاني</label>
            <input type="text" name="last_name" id="last_name" className="w-full" value={userData.last_name} 
                                  onChange={handleInputChange}

            />
          </div>                    
                <div className={`${classes["input-group"]} mt-8 `}>
                    <label htmlFor="phone_number">رقم الهاتف</label>
                    <input type="text" name="phone_number" id="phone_number" className="w-full" 
                    value={userData.phone_number} 
                    onChange={handleInputChange}

                    />
                </div>
                
                <div>
                </div>
                <button onClick={handleUpdate}>تحديث بيانات المستخدم</button>
            </form>
        </>
    );
};

export default page;
