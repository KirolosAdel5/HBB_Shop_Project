import React, { Fragment } from "react";
import Filter from "./Filter";
import classes from "./MobileFilter.module.css";
import { FaFilter } from "react-icons/fa6";
import { MdOutlineClose } from "react-icons/md";

const MobileFilter = (props) => {
    return (
        <Fragment>
            <section className={` ${classes.section}`}>
                <div>
                    <button onClick={props.hide}>
                        <MdOutlineClose className="text-5xl"/>
                    </button>
                    <p>تصفيه</p>
                    <FaFilter className="text-stone-500"/>
                </div>
                <Filter />
            </section>
        </Fragment>
    );
};

export default MobileFilter;
