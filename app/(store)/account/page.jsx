import React from "react";
import classes from "./page.module.css";
import { SlPeople } from "react-icons/sl";
import { RiHeartAddLine } from "react-icons/ri";
import Link from "next/link";
import { BsBoxSeam } from "react-icons/bs";
import { PiMapPinLineThin } from "react-icons/pi";
import { LuWallet} from "react-icons/lu";

const page = () => {
    return (
        <section className={`mainContainer ${classes.section}`}>
            <div className={classes.part1}>
                <p>
                    حسابي
                    <br />
                    <span>إدارة ملفي الشخصي وطلباتي وتفضيلاتي وغير ذلك.</span>
                </p>
            </div>
            <div className={classes.part2}>
                <Link href="/account/profile">
                    <SlPeople className={classes.icon} />
                    <div className={classes.text}>
                        <p>الملف الشخصي</p>
                        <p>إدارة بياناتي الشخصية.</p>
                    </div>
                </Link>
                <Link href="/account/favorite">
                    <RiHeartAddLine className={classes.icon} />
                    <div className={classes.text}>
                        <p>قوائمي</p>
                        <p> عرض أكثر المنتجات المفضّلة لي</p>
                    </div>
                </Link>
                <Link href="/account/myOrders">
                    <BsBoxSeam className={classes.icon} />
                    <div className={classes.text}>
                        <p>الطلبات</p>
                        <p>عرض وتتبع طلباتي.</p>
                    </div>
                </Link>
                <Link href="/account/address">
                    <PiMapPinLineThin className={classes.icon} />
                    <div className={classes.text}>
                        <p>عناويني</p>
                        <p>تعديل عناوين الشحن واستلام الفواتير الخاصة بك.</p>
                    </div>
                </Link>
                <Link href="/account/payment">
                    <LuWallet className={classes.icon} />
                    <div className={classes.text}>
                        <p>الدفع</p>
                        <p>إدارة تفضيلات عملية الدفع.</p>
                    </div>
                </Link>
            </div>
        </section>
    );
};

export default page;
