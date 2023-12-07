import React, { Fragment } from "react";
import classes from "./TopNav.module.css";
import { LiaShippingFastSolid } from "react-icons/lia";
import { MdStorefront } from "react-icons/md";
import { AiOutlineFieldTime } from "react-icons/ai";

const TopNav = () => {
    return (
        <Fragment>
            <section
                className={`sm:flex hidden   ${classes.section}`}
            >
                <div className="mainContainer flex items-center justify-between w-full">
                    <div>
                        <ul className="flex items-center justify-center gap-6">
                            <li>
                                <LiaShippingFastSolid />
                                <p>شحن مجاني</p>
                                <div>
                                    <p>على الطلبات باكثر من 400 جنيه</p>
                                </div>
                            </li>
                            <li>
                                <MdStorefront />
                                <p>استلمها بنفسك</p>
                                <div>
                                    <p>تسوق اونلاين واستلم من المتجر</p>
                                </div>
                            </li>
                            <li>
                                <AiOutlineFieldTime />
                                <p>توصيل للمنزل</p>
                                <div>
                                    <p>خلال 3-5 ايام عمل</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <ul className="flex items-center justify-center gap-4">
                            <li>
                                <p>اطلب مساعده</p>
                            </li>
                            <li>
                                <p>موقع المتجر</p>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>
        </Fragment>
    );
};

export default TopNav;
