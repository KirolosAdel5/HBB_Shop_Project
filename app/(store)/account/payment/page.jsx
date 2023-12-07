import React from "react";
import classes from "./page.module.css";
const page = () => {
    return (
        <section className={`mainContainer ${classes.section}`}>
            <p className="text-5xl font-semibold text-center pt-6 pb-2">
                الدفع
            </p>
            <div>
                <p className="text-center text-gray-500 text-3xl py-4">
                    نقبل وبكل فخر وسائل الدفع التالية
                </p>
                <div className={classes.paymentMethod}>
                    <div>
                        <img src="/image/pay-1.png" alt="cash" />
                        <p>الدفع نقدًا عند الاستلام</p>
                    </div>
                    <span></span>
                    <div>
                        <img src="/image/pay-2.jpeg" alt="zain cash" />
                        <p>زين كاش</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default page;
