import DetailsProduct from "@/components/cardProduct/detailsProduct/DetailsProduct";
import React from "react";

const page = ({params}) => {
    return (
        <section className={`mainContainer`}>
            <DetailsProduct product_slug={params.product}  />
        </section>
    );
};

export default page;
