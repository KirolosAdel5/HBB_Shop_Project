"use client";
import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import classes from "./Filter.module.css";
import ButtonAddToCart from "@/components/UI/button/ButtonAddToCart";

const Filter = ({ onFilter }) => {
    // const { categoryName } = props;

    const [showFilters, setShowFilters] = useState({
        showPriceFilter: false,
        showBrandFilter: false,
    });

    const [brands, setBrands] = useState(null);
    const [selectedBrand, setSelectedBrand] = useState(null);
    const [priceFrom, setPriceFrom] = useState('');
    const [priceTo, setPriceTo] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/products/brands/`);
                setBrands(response.data);
            } catch (error) {
                console.error("Error fetching product data:", error.message);
            }
        };

        fetchData();
    }, []);

    if (!brands) {
        // Loading state or handle error
        return <div>Loading...</div>;
    }

    function handleFilterClick(filter) {
        setShowFilters((prevShowFilters) => ({
            ...prevShowFilters,
            [filter]: !prevShowFilters[filter],
        }));
    }
    const handlePriceInputChange = (e, setValue) => {
        // Ensure that the entered value is a valid number
        const value = parseFloat(e.target.value);
    
        // Update the state based on the input field
        setValue(isNaN(value) ? '' : value);
      };
    
    // const [form, setForm] = useState({
    //     priceFrom: 0,
    //     priceTo: 0,
    //     brandId: 0,
    // });

    // const [showBtn, setShowBtn] = useState(false);

    // function handleChangeForm(e) {
    //     let num = +e.target.value;
    //     setForm({ ...form, [e.target.name]: num });
    //     setShowBtn(true);
    // }

    // -------------------------
    const handleConfirmationClick = () => {
        // // Make API call with selected filters and the categoryName from the URL
        // const apiUrl = `http://localhost:8000/api/products/?category=${categoryName}&brand=${selectedBrand}&price_min=${priceFrom}&price_max=${priceTo}`;

        // axios.get(apiUrl)
        //     .then((response) => {
        //         // Handle the response, e.g., update your component state with the fetched data
        //         console.log(response.data);
        //     })
        //     .catch((error) => {
        //         // Handle errors
        //         console.error('Error fetching product data:', error.message);
        //     });
        onFilter({ selectedBrand, priceFrom, priceTo });

    };
    return (
        <Fragment>
            <section className={classes.section}>
                <ul>
                    <li>
                        <div
                            onClick={() => handleFilterClick("showPriceFilter")}
                        >
                            <p className={classes.headFiltering}>السعر</p>
                            <MdOutlineKeyboardArrowDown />
                        </div>
                        {showFilters.showPriceFilter && (
                            <div>
                                <p>من</p>
                                <input
                type="number"
                name="priceFrom"
                value={priceFrom}
                onChange={(e) => handlePriceInputChange(e, setPriceFrom)}
              />                                <p>الى</p>
 <input
                type="number"
                name="priceTo"
                value={priceTo}
                onChange={(e) => handlePriceInputChange(e, setPriceTo)}
              />                            </div>
                        )}
                    </li>
                    <li>
                        <div
                            onClick={() => handleFilterClick("showBrandFilter")}
                        >
                            <p className={classes.headFiltering}>
                                العلامات التجاريه
                            </p>
                            <MdOutlineKeyboardArrowDown />
                        </div>
                        {showFilters.showBrandFilter && (
                            <div>
                                   <ul>
      {brands &&
        brands.map((brand) => (
          <li key={brand.id}>
            <label>{brand.name}</label>
            <input type="radio" name="brand" 
            
            onChange={() => setSelectedBrand(brand.name)}

            />
          </li>
        ))}
    </ul>
                            </div>
                        )}
                    </li>
                </ul>

                <div className={classes.btn}>
                    <button onClick={handleConfirmationClick}>تاكيد التغير</button>
                </div>
            </section>
        </Fragment>
    );
};

export default Filter;
