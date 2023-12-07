"use client"
import Aside from "./aside/Aside";
import { useEffect, useState } from "react";
import axios from "axios";
// import { useCookies } from "react-cookie";
import MainNav from "./nav/MainNav";

const Nav = (props) => {
    // const [cookies] = useCookies(["token"]);
    // const token = cookies["token"];
    const [showAside, setShowAside] = useState(false);
    const funHideAside = () => {
        setShowAside(false);
    };

    const funShowAside = () => {
        setShowAside(true);
    };

    // const [userData, setUserData] = useState([]);
    // useEffect(() => {
    //     if (token) {
    //         const headers = {
    //             Authorization: `Bearer ${token}`,
    //         };

    //         axios
    //             .get(
    //                 `${process.env.NEXT_PUBLIC_BASEURL}/comma/authentication/current-user`,
    //                 { headers }
    //             )
    //             .then((response) => {
    //                 setUserData(response.data.data);
    //             })
    //             .catch((error) => {
    //                 console.error(error);
    //             });
    //     }
    // }, [token]);

    return (
        <>
            <MainNav onShowAside={funShowAside}  />
            
            {showAside && (
                <Aside
                    onHideAside={funHideAside}
                    
                />
            )}
        </>
    );
};

export default Nav;