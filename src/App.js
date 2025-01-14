import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import SummaryApi from "./common";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Context from "./context";
import { setUserDetails } from "./store/userSlice";

const App = () => {
  const { user } = useSelector((state) => state.user);
  const [cartProductCount,setCartProductCount] = useState(0);
  const dispatch = useDispatch();

  const fetchUserDetails = async () => {
    const dataResponse = await fetch(SummaryApi.current_user.url, {
      method: SummaryApi.current_user.method,
      credentials: "include",
    });

    const dataApi = await dataResponse.json();

    if (dataApi.success) {
      dispatch(setUserDetails(dataApi.data));
    }
  };

  const fetchUserAddToCart = async()=>{
    const dataResponse = await fetch(SummaryApi.addToCartProductCount.url,{
      method : SummaryApi.addToCartProductCount.method,
      credentials : 'include'
    })

    const dataApi = await dataResponse.json()

    setCartProductCount(dataApi?.data?.count)
  }

  useEffect(() => {
    fetchUserDetails();
    fetchUserAddToCart();
  }, []);

  return (
    <>
      <Context.Provider value={{ fetchUserDetails, user, cartProductCount, fetchUserAddToCart }}>
        <ToastContainer position="top-center" />
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
      </Context.Provider>
    </>
  );
};

export default App;
