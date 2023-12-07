"use client";
import React, { Fragment, useEffect, useState } from "react";
import classes from "../globalsSign.module.css";
import Link from "next/link";
import axios from 'axios';
// import Loading from "@/components/loading/Loading";
import { useRouter ,useSearchParams } from "next/navigation";

import { useCookies } from 'react-cookie';

// Function to check if the user is authenticated

  
const Login = () => {
    const router = useRouter();
    const searchParams = useSearchParams()

    const [cookies, setCookie] = useCookies(['authToken']); // Define the cookie name here
  
    const checkAuthentication = () => {
      return cookies.authToken ? true : false;
    };
  
    const [form, setForm] = useState({
      username: "",
      password: "",
    });
  
    const [err, setErr] = useState("");
    if (checkAuthentication()) {
        router.push('/');
      }
    async function Submit(e) {
      e.preventDefault();
      setErr(""); // Clear any previous error messages
  
      try {

        const tokenResponse = await axios.post('http://127.0.0.1:8000/api/token/', form);
        if (tokenResponse.status === 200) {
            const authToken = tokenResponse.data.access; 

            const { username, password } = form; // Destructure values from the form state

            const loginData = {
                phone_number : username,
                password : password,
              };
              console.log(authToken);
              const headers = {
                'Authorization': `Bearer ${authToken}`, // Set the Bearer Token in the header
              };
              const loginResponse = await axios.post('http://127.0.0.1:8000/api/login/', loginData, { headers });
              if (loginResponse.status === 200) {
                setCookie('authToken', authToken, { path: '/', maxAge: 3600 }); // Replace 'authToken' with your token and set an expiration time

                const redirectPath = searchParams.get('redirect');
                if(redirectPath){

                  router.push(redirectPath);
                }
                else{
                    router.push('/');
                }
            
              }

        }
        // const res = await axios.post('http://127.0.0.1:8000/api/login/', form); // Make a POST request to the login endpoint
  
        // if (res.status === 200) {
  
        //   // Use the token for subsequent authenticated requests
        //   const authToken = res.data.token;
        //   axios.defaults.headers.common['Authorization'] = `Token ${authToken}`;
  
        //   router.push('/'); // Redirect to the home page
        // }
      } catch (err) {
        if (err.response&&err.response.status === 401) {
          setErr("خطاء في التسجيل من أن تكون كلمة السر أو رقم الهاتف خاطئة");
        } else {
          setErr("internal server error " +  (err.response ? err.response.status : "unknown"));
        }
      }

 
    
    }
  

    function handleChangeForm(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
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
                <form className={classes.login} onSubmit={Submit}>
                    <div>
                        <Link href="/">
                            <img
                                src="/image/main logo.svg"
                                alt="hpp shop logo"
                            />
                        </Link>
                        <div>
                            <p className="text-4xl mb-8">يرجى تسجيل الدخول الآن</p>
                            <p className="text-2xl font-medium">
                                استفد من ميزة استعمال حساب واحد لجميع العلامات
                                التجارية المشاركة.
                            </p>
                        </div>
                    </div>
                    <div>
                        <label htmlFor="username">
                            رقم الهاتف
                        </label>
                        <input
                            type="text"
                            name="username"
                            id="username"
                            placeholder=" ادخل رقم الهاتف مسبوق بكود الدولة" 
                            onChange={handleChangeForm}
                            autoComplete="off"
                        />
                        <label htmlFor="password">كلمه السر</label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            placeholder="ادخل كلمه السر"
                            minLength="6"
                            onChange={handleChangeForm}
                        />
                    </div>

                    <div>
                        <button type="submit">تسجيل الدخول</button>
                        <p>
                            ليس لديك حساب؟
                            <span>
                                <Link href="/sign_up">تسجيل حساب جديد</Link>
                            </span>
                        </p>
                    </div>
                </form>
            </div>
        </Fragment>
    );
};

export default Login;
