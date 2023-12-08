"use client";

import classes from "../globalsSign.module.css";
import Link from "next/link";
import React, { Fragment, useEffect, useState } from "react";
import axios from "axios"; // Import Axios

import {useRouter,useSearchParams} from "next/navigation";
import apiConfig from '../../../config/apiConfig';

const page = () => {
    const  router =useRouter()
    const searchParams  =  useSearchParams();
    const user_id = searchParams .get('user_id')
    const phone_number = searchParams .get('phone_number')
    const [otp, setOtp] = useState("");

    const [err, setErr] = useState("");
    // const [loading, setLoading] = useState(false);

    useEffect(() => {
        let timeout;
        if (err !== "") {
            timeout = setTimeout(() => {
                setErr("");
            }, 4000);
        }
        return () => clearTimeout(timeout);
    }, [err]);

    const handleSubmit = async (e) => {

        e.preventDefault();
        setErr(""); // Clear any previous error messages

        try {
          const response = await axios.post(
            `${apiConfig.apiUrl}/api/register/verify-otp/${user_id}/`,
            { otp: otp }
          );
    
          if (response.status === 200) {
            // Handle success, e.g., redirect to a success page
            router.push("/");
          } else {
            // Handle error, e.g., display an error message
            setErr("حاول مرة اخري");

          }
        } catch (error) {
          console.error("Error sending verification request:", error);
          setErr("الكود غير صحيح حاول مرة اخري");

        }
      }
    
      const handleResendClick = async (e) => {

        e.preventDefault();
        setErr(""); // Clear any previous error messages

        try {
          const response = await axios.post(
            `${apiConfig.apiUrl}/api/resend-otp/`,
            { user_id : user_id,}
          );
    
          if (response.status === 200) {
            // Handle success, e.g., redirect to a success page
            router.push();
          } else {
            // Handle error, e.g., display an error message
            setErr("حاول مرة اخري");

          }
        } catch (error) {
          console.error("Error sending verification request:", error);

        }
      }


    return (
        <Fragment>
            {/* {loading && <Loading />} */}
            <div className={classes.up}>
                <div className={classes.circle1}></div>
                <div className={classes.circle2}></div>
                {err !== "" && (
                    <div className={classes.error}>
                        <p>{err}</p>
                    </div>
                )}

            
                <form className={classes.login} onSubmit={handleSubmit}>
                    <div>
                    <Link href="m">
                            <img src="/images/mainLogo-2.png" alt="" />
                        </Link>
                        
                        <p className="text-4xl ">تأكيد الحساب </p>
                        <p className="text-2xl "> تم ارسال رقم مكون من 6 ارقام الي الرقم {phone_number}+</p>
                        
                    </div>
                    
                    <div>
                        <label htmlFor="otp">كود التاكيد</label>
                        <input
                            type="text"
                            name="otp"
                            id="otp"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}                  
                            placeholder="أدخل كود التأكيد"
                            required
                        />
                    </div>
                    <div>
                    <button type="submit">تاكيد</button>
                        <span onClick={handleResendClick}>أعد الارسال</span>
                    </div>
                </form>
            </div>
        </Fragment>
    );
};

export default page;