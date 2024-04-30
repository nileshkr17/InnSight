import React, { useState, useEffect, useRef } from "react";

import {
  faAddressCard,
  faHotel,
  faCreditCard,
} from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Tabs from "../ux/tabs/Tabs";
import TabPanel from "../ux/tab-panel/TabPanel";
import ProfileDetails from "./components/ProfileDetails/ProfileDetails";
import Bookings from "./components/Bookings/Bookings";
import PaymentMethods from "./components/Payments/PaymentMethods";
import useOutsideClickHandler from "../Hooks/useOutsideClickHandler";
import "./UserProfile.css";

/**
 * UserProfile
 * Renders the user profile page with tabs for personal details, bookings, and payment methods.
 * @returns {JSX.Element} - The UserProfile component
 * */
const UserProfile = () => {
  const { username } = useParams();
  const [userDetails, setUserDetails] = useState(null);
  const navigate = useNavigate();

  const wrapperRef = useRef();
  const buttonRef = useRef();

  const [isTabsVisible, setIsTabsVisible] = useState(false);

  // Fetch user bookings data
  const [userBookingsData, setUserBookingsData] = useState({
    isLoading: true,
    data: [],
    errors: [],
  });

  // Fetch user payment methods data
  const [userPaymentMethodsData, setUserPaymentMethodsData] = useState({
    isLoading: true,
    data: [],
    errors: [],
  });

  useOutsideClickHandler(wrapperRef, (event) => {
    if (!buttonRef.current.contains(event.target)) {
      setIsTabsVisible(false);
    }
  });

  const onTabsMenuButtonAction = () => {
    setIsTabsVisible(!isTabsVisible);
  };

  // effect to set initial state of user details
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:6969/api/user/${username}`
        );
        if (response && response.data) {
          setUserDetails(response.data);
          // console.log(userDetails);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserData();
  }, [username]);

  // effect to set initial state of user bookings data
  // useEffect(() => {
  //   const getInitialData = async () => {
  //     const userBookingsDataResponse = await networkAdapter.get(
  //       "/api/users/bookings"
  //     );
  //     const userPaymentMethodsResponse = await networkAdapter.get(
  //       "api/users/payment-methods"
  //     );
  //     if (userBookingsDataResponse && userBookingsDataResponse.data) {
  //       setUserBookingsData({
  //         isLoading: false,
  //         data: userBookingsDataResponse.data.elements,
  //         errors: userBookingsDataResponse.errors,
  //       });
  //     }
  //     if (userPaymentMethodsResponse && userPaymentMethodsResponse.data) {
  //       setUserPaymentMethodsData({
  //         isLoading: false,
  //         data: userPaymentMethodsResponse.data.elements,
  //         errors: userPaymentMethodsResponse.errors,
  //       });
  //     }
  //   };
  //   getInitialData();
  // }, []);
  useEffect(() => {
    if (userDetails) {
      const { bookingHistory } = userDetails;

      setUserBookingsData({
        isLoading: false,
        data: bookingHistory,
        errors: [], // Assuming no errors for bookings
      });

      // setUserPaymentMethodsData({
      //   isLoading: false,
      //   data: paymentMethods,
      //   errors: [], // Assuming no errors for payment methods
      // });
    }
  }, [userDetails]);

  return (
    <>
      <div className="profile-cont container mx-auto p-4 my-10 min-h-[530px]">
        <div
          className="mx-4"
          style={{ marginLeft: "1rem", marginRight: "1rem" }}
        >
          <button
            ref={buttonRef}
            onClick={onTabsMenuButtonAction}
            className="profile-button block md:hidden items-center px-4 py-1.5 border border-gray-300 font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <FontAwesomeIcon
              icon={isTabsVisible ? faXmark : faBars}
              size="lg"
            />
          </button>
        </div>
        {/* unsure what is happening here as tabs is not getting visible?? need to look kek */}
        <Tabs isTabsVisible={true} wrapperRef={wrapperRef}>
          <TabPanel label="Personal Details" icon={faAddressCard}>
            <ProfileDetails userDetails={userDetails} />
          </TabPanel>
          <TabPanel label="Bookings" icon={faHotel}>
            <Bookings bookings={userBookingsData.data} />
          </TabPanel>
          <TabPanel label="Payment details" icon={faCreditCard}>
            <PaymentMethods
              userPaymentMethodsData={userPaymentMethodsData}
              setUserPaymentMethodsData={setUserPaymentMethodsData}
            />
          </TabPanel>
        </Tabs>
      </div>
    </>
  );
};

export default UserProfile;
