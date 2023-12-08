import React, { Fragment, useState,useEffect } from "react";
import axios from 'axios';
import classes from "./MainNav.module.css";
import { BsList, BsSearch } from "react-icons/bs";
import { PiShoppingBagFill } from "react-icons/pi";
import Link from "next/link";
import { useRouter ,useSearchParams} from "next/navigation";
import { useCookies } from 'react-cookie';
import apiConfig from "@/config/apiConfig";


const MainNav = (props) => {
    const [showComponent, setShowComponent] = useState(false);
    const [cookies,setCookie] = useCookies(['authToken','cartId']);
    const authToken = cookies.authToken;
    const [userData, setUserData] = useState([]);
    const router = useRouter();
    const searchParams = useSearchParams()
    const [searchTerm, setSearchTerm] = useState('');

    const [cart, setCart] = useState({
        id: null,
        items: [],
        grand_total: 0,
      });
    
    const handleMouseEnter = () => {
        setShowComponent(true);
    };
    const handleMouseLeave = () => {
        setShowComponent(false);
    };
    const removeCookie = (name) => {
        document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      };
            const handleLogout = async () => {
                try {
                    const headers = {
                        'Authorization': 'Bearer '+authToken,
                    };
                    
                    const response = await axios.post(`${apiConfig.apiUrl}/api/logout/`, {}, { headers });
            
                    if (response.status === 200) {
                        removeCookie('authToken'); // Replace 'authToken' with the actual cookie name

                        console.log("Logged out successfully");
                    } else {
                        console.log("Logout failed");
                    }
                } catch (error) {
                    console.error("Error logging out:", error);
                    // Handle the error here
                }
            };

            useEffect(() => {
                const fetchData = async () => {
    
                    const q = searchParams.get('q');
                    if (q) {
                      setSearchTerm(q);
                    }
                  try {
                    const response = await axios.get(`${apiConfig.apiUrl}/api/users/me/`, {
                      headers: {
                        Authorization: `Bearer ${cookies.authToken}`,
                      },
                    });
                    setUserData(response.data[0]);
                  } catch (error) {
                    console.error('Error fetching user data:', error.message);
                  }
                };
            
                fetchData();

                const fetchCart = async () => {
                    try {
                      const response = await axios.post(
                        `${apiConfig.apiUrl}/api/carts/`,
                        {},
                        {
                          headers: {
                            Authorization: `Bearer ${cookies.authToken}`,
                          },
                        }
                      );
                      const usercart = response.data;
                      setCart(usercart);

                      setCookie('cartId', usercart.id, { path: '/' });
                    } catch (error) {
                      console.error("Error fetching cart:", error);
                    }
                  };
              
                  if (cookies.authToken) {
                    fetchCart();
                  }
              }, [cookies.authToken, router,cookies.cartId, setCookie]);
            
            
              const handleSearch = () => {
                const searchQuery = `?q=${encodeURIComponent(searchTerm)}`;
                router.push(`/search${searchQuery}`);
              };
            
              const handleInputChange = (e) => {
                setSearchTerm(e.target.value);
              };
            
              const handleKeyPress = (e) => {
                if (e.key === 'Enter') {
                  handleSearch();
                }
              };    
            return (
        <Fragment>
            <nav
                className={`md:flex gap-4 items-center hidden mainContainer ${classes.nav}`}
            >
                <div className={classes.logo}>
                    <Link href="/">
                        <img src="/image/main logo.svg" alt="main logo" />
                    </Link>
                </div>
                <div>
                    <ul className="flex">
                        <li>
                            <Link href="/category/women">النساء</Link>
                        </li>
                        <li>
                            <Link href="/category/men">الرجال</Link>
                        </li>
                        <li>
                            <Link href="/category/kids">الاطفال</Link>
                        </li>
                    </ul>
                </div>
                <div className="flex items-center gap-4">
                <BsSearch onClick={handleSearch} />


                <input
        type="text"
        placeholder="ما الذي تبحث عنه"
        value={searchTerm}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}

      />
                </div>
                
                <div
                    className="flex items-center gap-4 relative"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    
                    {authToken ? (
        <>
          <Link href="/account/profile">مرحبا, {userData.first_name} {userData.last_name}</Link>
        </>
      ) : (
        <>
          <Link href="/sign_in">تسجيل الدخول</Link>
          <Link href="/sign_up">تسجيل حساب</Link>
        </>
      )}


                    <span></span>
                    <Link
                        href="/cart"
                        className={`relative cursor-pointer ${classes.numInCard}`}
                    >
                        <PiShoppingBagFill />
                        <span className="absolute bottom-6 right-6">{cart.total_quantity}</span>
                    </Link>
                    {showComponent && (
                        <div className={classes.pop}>
                            <ul>
                                <li>
                                    <Link href="/account">حسابي </Link>
                                </li>
                                <li>
                                    <Link href="/account/favorite">قائمتي</Link>
                                </li>
                                <li>
                                    <Link href="/account/myOrders">طلباتي</Link>
                                </li>
                                <li>
                                    <Link href="/account/address">عناويني</Link>
                                </li>
                                <li>
                                    <Link href="/account/payment">الدفع</Link>
                                </li>
                                <li>
                                    <Link href="/">wait</Link>
                                </li>
                                <li>
                                    <button onClick={handleLogout}>تسجيل الخروج</button>
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            </nav>
            {/* ---------------- */}
            <nav className={`md:hidden  ${classes.smallNav}`}>
                <div className="flex items-center justify-between">
                    <div
                        className="flex flex-col items-center justify-center gap-1 text-3xl"
                        onClick={props.onShowAside}
                    >
                        <BsList className="text-5xl" />
                        <p>القائمه</p>
                    </div>
                    <div className={classes.logo}>
                        <Link href="/">
                            <img src="/image/main logo.svg" alt="main logo" />
                        </Link>
                    </div>
                    <Link
                        href="/cart"
                        className={` relative ${classes.numInCard}`}
                    >
                        <PiShoppingBagFill />
                        <span className="absolute bottom-6 right-6">
                        {cart.total_quantity}
                        </span>
                    </Link>
                </div>
                <div>
                    <div
                        className={`${classes.divSearch} flex items-center gap-4`}
                    >
           <BsSearch onClick={handleSearch} />


<input
type="text"
placeholder="ما الذي تبحث عنه"
value={searchTerm}
onChange={handleInputChange}
onKeyPress={handleKeyPress}

/>
                   
                    </div>
                    <ul className="flex">
                        <li>
                            <Link href="/category/women">النساء</Link>
                        </li>
                        <li>
                            <Link href="/category/men">الرجال</Link>
                        </li>
                        <li>
                            <Link href="/category/kids">الاطفال</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </Fragment>
    );
};

export default MainNav;
