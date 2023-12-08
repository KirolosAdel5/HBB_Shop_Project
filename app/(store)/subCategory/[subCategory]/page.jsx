"use client";
import React, { Fragment, useEffect, useState } from "react";
import axios from 'axios';
import classes from "./page.module.css";
import Filter from "@/components/subCategoryPage/fillter/Filter";
import MobileFilter from "@/components/subCategoryPage/fillter/MobileFilter";
import AllProduct from "@/components/subCategoryPage/allProduct/AllProduct";
import Link from "next/link";
import Pagination from "rc-pagination";
import "rc-pagination/assets/index.css";
import { useRouter } from "next/navigation";
import apiConfig from '../../../../config/apiConfig';


const page = ({params}) => {
    const [categoryName, setcategoryName] = useState([]);
    const [subCategories, setSubCategories] = useState([]);
    const [categoryProducts, setCategoryProducts] = useState([]);
    const [paginationData, setPaginationData] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    let router = useRouter();

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get(`${apiConfig.apiUrl}/api/categories/${params.subCategory}/`);
          setcategoryName(response.data.name);
          setSubCategories(response.data.children);

          const response2 = await axios.get(`${apiConfig.apiUrl}/api/categories/${params.subCategory}/retrieve_category_items/?page=${currentPage}`);
          setCategoryProducts(response2.data.results);
          setPaginationData({
            count: response2.data.count,
            next: response.data.next,
            previous: response2.data.previous,
          });
              


        } catch (error) {
          console.error("Error fetching data:", error.message);
        }
      };
  
      fetchData();
    }, []); // The empty dependency array ensures that the effect runs once after the initial render
    

    const [showComponent, setShowComponent] = useState(false);
    function handleShowComponent() {
        setShowComponent(!showComponent);
    }

    const getFilterData = ({ selectedBrand, priceFrom, priceTo }) => {
        // Make API call with selected filters and the categoryName from the URL
        const brandParam = selectedBrand ? `&brand=${selectedBrand}` : '';

        // Make API call with selected filters and the categoryName from the URL
        const apiUrl = `${apiConfig.apiUrl}/api/products/?category=${params.subCategory}${brandParam}&price_min=${priceFrom}&price_max=${priceTo}`;
    
    
        axios.get(apiUrl)
            .then((response) => {
                // Update the component state with the fetched data
                setCategoryProducts(response.data.results);
            })
            .catch((error) => {
                // Handle errors
                console.error('Error fetching product data:', error.message);
            });
    };

    const handleOrderChange = (event) => {
        const newOrder = event.target.value;
        const apiUrl = `${apiConfig.apiUrl}/api/categories/hbbwomen-clothing/retrieve_category_items/?sort=regular_price&order=${newOrder}`;

        axios.get(apiUrl)
            .then((response) => {
                // Update the component state with the fetched data
                setCategoryProducts(response.data.results);
            })
            .catch((error) => {
                // Handle errors
                console.error('Error fetching product data:', error.message);
            });
    };

     const handlePageChange = (page) => {
    setCurrentPage(page);
    router.push (
        `/subCategory/${params.subCategory}?page=${page}`
    )
    
    const apiUrl = `${apiConfig.apiUrl}/api/categories/hbbwomen-clothing/retrieve_category_items/?page=${page}`;
    
    axios.get(apiUrl)
        .then((response) => {
            // Update the component state with the fetched data
            setCategoryProducts(response.data.results);
        })
  };


    return (
        <Fragment>
            <div className={` md:block hidden ${classes.subCategory}`}>
                <ul className="flex items-center gap-8 text-2xl mainContainer">
                {subCategories.map((category) => (
                        <Link href={`/subCategory/${category.slug}`}>
                    <li>{category.name}</li>
                    </Link>

                    ))}
      
                </ul>
                
            </div>
            <div className="text-5xl mainContainer py-10 px-4 font-bold">
                <p>{categoryName}</p>
                <div>

                </div>
            </div>
            <section className={`mainContainer ${classes.section}`}>
                {showComponent && (
                    <MobileFilter
                        // onFilter={getFilterData}
                        hide={handleShowComponent}
                    />
                )}
                <div className={classes.part2}>
                    <div className={classes.filterDiv}>
                        <Filter
                            className={classes.filter}
                            categoryName={params.subCategory}

                            onFilter={getFilterData}
                        />
                    </div>
                    <AllProduct
                        // fetchDataByOrder={fetchDataByOrder}
                        // fetchData={fetchData}
                        categoryProducts={categoryProducts} // Pass categoryProducts as a prop
                        show={handleShowComponent}
                        onOrderChange={handleOrderChange} // Pass the handler function as a prop
                        paginationData = {paginationData}
                        // sub={props.params.nameSub}
                        // productData={allData}
                        // sizeData={sizeData}
                    />
       <Pagination
        onChange={handlePageChange}
        current={currentPage}
        total={paginationData.count}
        pageSize={48} // Adjust this based on your API's pagination settings
      />  </div>
            </section>
        </Fragment>
    );
};

export default page;
