"use client";

import React, { useState } from "react";
import classes from "./AddAddress.module.css";
import axios from "axios"; // Import Axios for making HTTP requests
import { useCookies } from 'react-cookie';
import { useRouter } from "next/navigation";

const AddAddress = () => {
    const [cookies] = useCookies(['authToken']);
    const router = useRouter(); // Initialize the useRouter hook

  // State to manage form data
  const [formData, setFormData] = useState({
    city: "",
    Area: "",
    building_details: "",
    street_details: "",
    landmark: "",
    full_name: "",
    phone: "",
    address_type: "home", // Default to "home"
  });

  // Event handler to update form data as the user types
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name || 'address_type']: value,
    }));
  };
  

  // Event handler to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Add your logic to get the auth token from cookies
    try {
      // Make a POST request to your API endpoint with form data and auth token
      const response = await axios.post(
        "https://kirolosadel5.pythonanywhere.com/api/addresses/",
        formData,
        {
          headers: {
            Authorization: `Bearer ${cookies.authToken}`,
          },
        }
      );

      router.push("/account/address"); // Adjust the path as needed


    } catch (error) {
      console.error("Error adding address:", error);
    }

  };

  return (
    <>
      {/* Your form JSX */}
      <form action="" className={classes.form} onSubmit={handleSubmit}>
        {/* ... other input fields ... */}
        <div>
          <label htmlFor="">المدينه</label>
          <input
            type="text"
            placeholder="ادخل المدينه"
            name="city"
            value={formData.city}
            onChange={handleChange}
          />

        </div>

        <div>
                    <label htmlFor="">المنطقه</label>
                    <input type="text" placeholder="ادخل المنطقه" name="Area" 
                    value={formData.Area} onChange={handleChange}/>
                </div>
                <div>
                    <label htmlFor="">
                        اسم البناء/رقم المنزل، الطابق، رقم الشقة*
                    </label>
                    <input
                        type="text"
                        placeholder="مثال يرج القاهره الطابق 6 الشقه 600"
                        name="building_details"
                        value={formData.building_details}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="">اسم/رقم الشارع*</label>
                    <input type="text" placeholder="مثال شارع المعز"  
                    name="street_details"
                    value={formData.street_details} onChange={handleChange}/>
                </div>
                <div>
                    <label htmlFor="">
                        علامه مميزه{" "}
                        <span className=" text-gray-500">(اختياري)</span>
                    </label>
                    <input type="text" placeholder="علامه مميزه" 
                    name="landmark"
                    value={formData.landmark} onChange={handleChange}
                    />
                </div>
                <p className="text-3xl">البيانات الشخصية</p>
                <div>
                    <label htmlFor="">الاسم كامل</label>
                    <input type="text" placeholder="ادخل اسمك بالكامل" 
                    name="full_name"
                    value={formData.full_name} onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="">رقم الهاتف المتحرك</label>
                    <input type="number" placeholder="0100000000" 
                    name="phone"
                    value={formData.phone} onChange={handleChange}
                    />
                </div>
                <div>
                    <label
                        htmlFor="n1
                    "
                    >
                        العنوان{" "}
                        <span className=" text-gray-500">(اختياري)</span>
                    </label>
                    <div className="flex items-center gap-12">
  <div className="flex items-center gap-2">
  <input
              type="radio"
              id="home"
              name="address_type"
              value="home"
            onChange={handleChange}

            />
    <label htmlFor="home">المنزل</label>
  </div>
  <div className="flex items-center gap-2">
  <input
              type="radio"
              id="work"
              name="address_type"
              value="work"
              onChange={handleChange}

            />
    <label htmlFor="work">العمل</label>
  </div>
</div>

                </div>

        <button type="submit">حفظ</button>
      </form>
    </>
  );
};

export default AddAddress;
