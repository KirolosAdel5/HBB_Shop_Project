"use client";
import React, { Fragment, useState } from "react";
import classes from "./AllProduct.module.css";
import CardProduct from "@/components/cardProduct/CardProduct";
import { FaFilter } from "react-icons/fa6";
import { useSearchParams} from "next/navigation";

const AllProduct = (props) => {
    const { categoryProducts } = props;
    const { paginationData } = props;
    const searchParams = useSearchParams();
    const pageNumber = searchParams.get("page") ? parseInt(searchParams.get("page")) : 1;
  

    return (
        <Fragment>
            <section className={classes.section}>
                <div className={classes.part1}>
                    <div>
                        {/* <label htmlFor="n1">رتب حسب</label> */}
                        <select name="" id="n1" value={props.selectedOrder} onChange={props.onOrderChange}>
                            <option value="">رتب حسب</option>
                            <option value="DESC">
                                السعرمن الاعلى الى الاقل
                            </option>
                            <option value="ASC">
                                السعرمن الاقل الى الاعلى
                            </option>
                        </select>
                        <div className={classes.iconFilter} onClick={props.show}>
                            <FaFilter className="text-4xl"/>
                        </div>
                    </div>
                    <p>
  {paginationData.count >= 48
    ? `${pageNumber * 48} من ${paginationData.count}`
    : `${paginationData.count} من ${paginationData.count}`}
</p>
                </div>
                <div className={classes.part2}>
            {categoryProducts.map((product) => (
                <CardProduct key={product.id} productId={product.id}  />
            ))}
        </div>
                {/* <Pagination
                    className={classes.pagination}
                    total={totalPages}
                    position="center"
                    page={page}
                    onChange={handleChange}
                    styles={(theme) => ({
                        control: {
                            "&[data-active]": {
                                backgroundImage: theme.fn.gradient({
                                    from: "#10bc3bd7",
                                    to: "#10bc3bd7",
                                }),
                                border: 0,
                            },
                        },
                    })}
                /> */}
            </section>
        </Fragment>
    );
};

export default AllProduct;
