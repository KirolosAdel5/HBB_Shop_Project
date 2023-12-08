"use client";
import React, { Fragment, useEffect, useState } from "react";
import classes from "../globalsSign.module.css";
import Link from "next/link";
import axios from "axios";
// import Loading from "@/components/loading/Loading";
import { useRouter } from "next/navigation";
import { useCookies } from 'react-cookie';
import apiConfig from '../../../config/apiConfig';

const Register = () => {
    const router = useRouter();
    const [cookies, setCookies] = useCookies(['token']);

    const [form, setForm] = useState({
        uuid_field:"",
        username: "",
        phone_number: "",
        password: "",
    });
    const { username, phone_number, password } = form;

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

    function handleChangeForm(e) {
        setForm({ ...form, [e.target.name]: e.target.value });

    }

    async function handleSubmit(e) {
        e.preventDefault();
        setErr(""); // Clear any previous error messages
    
        const combinedValue = `${form.countryCode}${form.phone_number}`;
    
        try {
            // Make a POST request to the Django API for registration
            const response = await axios.post(
                `${apiConfig.apiUrl}/api/register/`, 
                {
                    ...form,
                    phone_number: combinedValue, // Update phone_number
                }
            );
    
            if (response.status === 201) {
                setErr("تم تسجيل المستخدم بنجاح");
                setCookies('authToken', response.data.token);
            }
    
            // router.push(`/active_phone?user_id=${response.data.uuid}&phone_number=${response.data.phone_number}`);
            router.push("/");
            
        } catch (err) {
            if (err.response && err.response.status === 409) {
                setErr(" رقم الهاتف هذا مسجل بالفعل");
            } else if (err.response &&err.response.status === 422) {
                setErr(" يرجو ادخال رقم هاتف صالح");
            } else {
                if (!form.username || !form.phone_number || !form.password) {
                    setErr("يرجو التاكد من ان ادخل جميع الحقول المطلوبة");
                } else if (!form.password.match(/^(?=.*\d)(?=.*[a-zA-Z])/)) {
                    setErr("كلمة المرور يجب أن تحتوي على أرقام وحروف ورموز.");
                } else if(err.response && err.response.status === 400) {
                    setErr("internal server error " +  (err.response ? err.response.status : "unknown"));
                }
                else{
                    setErr("حدث خطا يرجوا اعادة المحاولة");
                }
            }
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

            <form className={classes.register} onSubmit={handleSubmit}>
                    <div>
                        <Link href="/">
                            <img
                                src="/image/main logo.svg"
                                alt="hpp shop logo"
                            />
                        </Link>

                        <p className="text-4xl">سجّل حسابًا الآن</p>
                        <p className="text-2xl font-medium">
                            استفد من ميزة استعمال حساب واحد لجميع العلامات
                            التجارية المشاركة.
                        </p>
                    </div>
                    <div>
                        <div>
                            <label htmlFor="name">الاسم</label>
                            <input
                                type="text"
                                name="username"
                                onChange={handleChangeForm}
                                autoComplete="off"
                                placeholder="ادخل الاسم"
                            />
                        </div>
{/* 
                        <div>
                            <label htmlFor="name">البريد الإلكتروني</label>
                            <input
                                type="email"
                                name="email"
                                placeholder="names@gamil.com"
                                onChange={handleChangeForm}
                                autoComplete="off"
                            />
                        </div> */}

<div>
      <label htmlFor="name">رقم الهاتف</label>
      <div style={{ display: "block" }}>
        <select
          id="countryCode"
          style={{ width: '20%' }}
          name="countryCode"
          onChange={handleChangeForm}
          value={form.countryCode}
        >
          <option value="">كود البلد</option>
          <option value="+964">IQ +964</option>
          <option value="+20">EG +20</option>

        </select>
        <input
          type="text"
          name="phone_number"
          onChange={handleChangeForm}
          autoComplete="off"
          placeholder="ادخل الرقم"
          style={{ width: '80%' }}
          value={form.phone_number}
        />
      </div>
    </div>
                        <div>
                            <label htmlFor="name">كلمة المرور</label>
                            <input
                                type="password"
                                name="password"
                                placeholder="اختر كلمه المرور"
                                minLength="6"
                                onChange={handleChangeForm}
                            />
                            <p className={classes.simpleValid}>
                                لابد أن تكون كلمة المرور 6 أحرف على الأقل
                            </p>
                        </div>
                    </div>
                    <div>
                        <p>
                            من خلال إنشاء حساب ، فإنك توافق على{" "}
                            <span>الأحكام والشروط</span>
                        </p>
                        <button  type="submit">تسجيل</button>
                        <p>
                            لديك حساب بالفعل؟
                            <span>
                                <Link href="/sign_in">تسجيل الدخول</Link>
                            </span>
                        </p>
                    </div>
                </form>
            </div>
        </Fragment>
    );
};

export default Register;
