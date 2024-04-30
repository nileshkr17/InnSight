import React, { useState, useEffect } from "react";
import Select from "react-select";
import axios from "axios";
import Toast from "../../../toast/Toast";
import "./ProfileDetails.css";
import cities from "../../../Register/cities.json";

/**
 * Renders the user profile details panel.
 * @component
 * @param {Object} props - The component props.
 * @param {Object} props.userDetails - The user's details.
 * @returns {JSX.Element} The rendered component.
 * */
const ProfileDetails = ({ userDetails }) => {
  const selectableData = cities.map((city) => ({ label: city, value: city }));
  const notificationArray = ["Email", "SMS", "Push Notification"];
  const notificationData = notificationArray.map((notif) => ({
    label: notif,
    value: notif,
  }));
  // const wifiArray = ["Enabled", "Disabled"];
  // const wifiData = wifiArray.map((opn) => ({ label: opn, value: opn }));
  const genderArray = ["Male", "Female", "Other"];
  const genderData = genderArray.map((gend) => ({ label: gend, value: gend }));
  // states to manage the edit mode and user details
  const [isEditMode, setIsEditMode] = useState(false);
  // const [firstName, setFirstName] = useState("");
  // const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [whatsappContact, setWhatsappContact] = useState("");
  const [gender, setGender] = useState("");
  // const [budget, setBudget] = useState("Medium");
  // const [accessibility, setAccessibility] = useState("Enabled");
  const [notifications, setNotifications] = useState("");
  // const [language, setLanguage] = useState("English");
  // const [dateOfBirth, setDateOfBirth] = useState("");
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  // const [isPhoneVerified, setIsPhoneVerified] = useState(false);
  const [location, setLocation] = useState("");
  // const [countries, setCountries] = useState([]);

  const [hotelLocation, setHotelLocation] = useState("");
  const [amenities, setAmenities] = useState([""]);
  const [wifi, setWifi] = useState(false);
  const [doctor24x7, setDoctor24x7] = useState(false);
  const [petAllowed, setPetAllowed] = useState(false);
  const [marriedCoupleFriendly, setMarriedCoupleFriendly] = useState(false);
  const [unmarriedCoupleFriendly, setUnmarriedCoupleFriendly] = useState(false);
  const [oldAgeFriendly, setOldAgeFriendly] = useState(false);
  const [poolGymBar, setPoolGymBar] = useState(false);

  const [toastMessage, setToastMessage] = useState("");

  const clearToastMessage = () => {
    setToastMessage("");
  };

  const handleEditClick = () => {
    setIsEditMode(!isEditMode);
  };

  const handleCancelClick = () => {
    setIsEditMode(!isEditMode);
  };
  // const updatePreference = (key, value) => {
  //   setHotelPreferences({ ...hotelPreferences, [key]: value });
  // };

  /**
   * Handles the save button click event.
   * Updates the user details and sets the edit mode to false.
   * */
  const handleSaveClick = async () => {
    // console.log(hotelPreferences);
    // check if newstate is different from old state
    // if (
    //   // firstName === userDetails.firstName &&
    //   // lastName === userDetails.lastName &&
    //   userName === userDetails.username &&
    //   phoneNumber === userDetails.phone
    //   // nationality === userDetails.country
    // ) {
    //   setIsEditMode(false);
    //   return;
    // }

    const updatedUserDetails = {
      username: userName,
      gender,
      whatsappContact,
      location,
      preferences: {
        notifications: notifications,
      },
      hotelPreferences: {
        location: hotelLocation,
        amenities: amenities,
        wifi: wifi,
        doctor24x7: doctor24x7,
        petAllowed: petAllowed,
        marriedCoupleFriendly: marriedCoupleFriendly,
        unmarriedCoupleFriendly: unmarriedCoupleFriendly,
        oldAgeFriendly: oldAgeFriendly,
        poolGymBar: poolGymBar,
      },
    };
    // Call the API to update the user details
    const response = await axios.put(
      `http://127.0.0.1:6969/api/user/${userDetails.username}`,
      updatedUserDetails
    );
    console.log(response);
    console.log(response.status);
    if (response && response.status == 200) {
      console.log("if");
      setToastMessage({
        type: "success",
        message: "Successfully Updated!",
      });
    } else {
      // revert to original state
      // setFirstName(userDetails.firstName);
      // setLastName(userDetails.lastName);
      // setUserName(userDetails.username);
      // setPhoneNumber(userDetails.phone);
      // setNationality(userDetails.country);
      setToastMessage({
        type: "error",
        message: "Oops, something went wrong. Please try again later.",
      });
    }

    setIsEditMode(false);
  };

  // effect to set initial state of user details
  useEffect(() => {
    if (userDetails) {
      // setFirstName(userDetails.firstName || "");
      // setLastName(userDetails.lastName || "");
      setUserName(userDetails.username);
      setEmail(userDetails.email || "");
      setWhatsappContact(userDetails.phone || "");
      setLocation(userDetails.location || "");
      setIsEmailVerified(userDetails.isVerified || "");
      // setIsPhoneVerified(userDetails.isPhoneVerified || "");
      // setDateOfBirth(userDetails.dateOfBirth || "");
      setGender(userDetails.gender);
      setNotifications(userDetails.preferences.notifications);
      // setHotelPreferences(userDetails.hotelPreferences);
      // setHotelPreferences(...hotelPreferences)
      setHotelLocation(userDetails.hotelPreferences.location);
      setAmenities(userDetails.hotelPreferences.amenities);
      setWifi(userDetails.hotelPreferences.wifi);
      setDoctor24x7(userDetails.hotelPreferences.doctor24x7);
      setPetAllowed(userDetails.hotelPreferences.petAllowed);
      setMarriedCoupleFriendly(
        userDetails.hotelPreferences.marriedCoupleFriendly
      );
      setUnmarriedCoupleFriendly(
        userDetails.hotelPreferences.unmarriedCoupleFriendly
      );
      setOldAgeFriendly(userDetails.hotelPreferences.oldAgeFriendly);
      setPoolGymBar(userDetails.hotelPreferences.poolGymBar);
    }
  }, [userDetails]);

  return (
    <div className="main-container bg-white shadow sm:rounded-lg flex flex-col">
      <div
        className="px-4 py-5 sm:px-6"
        style={{
          paddingLeft: "1rem",
          paddingRight: "1rem",
          paddingTop: "1.25rem",
          paddingBottom: "1.25rem",
          "@media (minWidth: 640px)": { padding: "1.25rem 1.5rem" },
        }}
      >
        <h3 className="header-class text-xl leading-6 font-medium text-gray-900">
          Personal details
        </h3>
        <p
          className="mt-1 max-w-2xl text-gray-500"
          style={{
            marginTop: "0.25rem",
            maxWidth: "42rem",
            color: "rgba(107,114,128,1)",
          }}
        >
          Keep your details current to ensure seamless communication and
          services
        </p>
      </div>
      <div
        className="border-t border-gray-200"
        style={{ borderTopWidth: "1px", borderColor: "rgba(229,231,235,1)" }}
      >
        <dl>
          {isEditMode ? (
            // Editable fields
            <>
              <TextField
                label="User Name"
                value={userName}
                onChange={setUserName}
              />
              {/* <TextField
                label="Lastname"
                value={lastName}
                onChange={setLastName}
              /> */}
              <TextField
                label="Whatsapp number"
                type="tel"
                value={whatsappContact}
                onChange={setWhatsappContact}
              />
              {/* <TextField
                label="Date of birth"
                type="date"
                value={dateOfBirth}
                onChange={setDateOfBirth}
              /> */}
              <div className="relative" style={{ position: "relative" }}>
                <TextField
                  label="Location"
                  value={location}
                  onChange={setLocation}
                  isSelectable={true}
                  selectableData={selectableData}
                />
              </div>
              <TextField
                label="Gender"
                value={gender}
                onChange={setGender}
                isSelectable={true}
                selectableData={genderData}
              />
              <TextField
                label="Notifications"
                value={notifications}
                onChange={setNotifications}
                isSelectable={true}
                selectableData={notificationData}
              />
              <h2
                style={{
                  fontWeight: "500",
                  color: "rgba(107,114,128,1)",
                  paddingLeft: "1.5rem",
                  paddingRight: "1.5rem",
                  paddingTop: "2rem",
                  paddingBottom: "1.5rem",
                }}
              >
                Hotel Preferences
              </h2>
              <TextField
                key="location"
                label="Hotel Location"
                value={hotelLocation}
                onChange={setHotelLocation}
                isSelectable={true}
                selectableData={selectableData}
              />
              {/* <TextField
                label="Amenities"
                value={amenities.join(", ")}
                onChange={setAmenities}
              /> */}
              <TextField
                key="wifi"
                label="Wifi"
                value={wifi}
                onChange={setWifi}
                isSelectable={true}
                selectableData={[
                  { label: "Enabled", value: true },
                  { label: "Disabled", value: false },
                ]}
              />
              <TextField
                key="doctor24x7"
                label="Doctor 24x7"
                value={doctor24x7}
                onChange={setDoctor24x7}
                isSelectable={true}
                selectableData={[
                  { label: "Available", value: true },
                  { label: "Not Available", value: false },
                ]}
              />
              <TextField
                key="petsAllowed"
                label="Pets"
                value={petAllowed}
                onChange={setPetAllowed}
                isSelectable={true}
                selectableData={[
                  { label: "Allowed", value: true },
                  { label: "Not Allowed", value: false },
                ]}
              />
              <TextField
                key="marriedCoupleFriendly"
                label="Married Couple Friendly"
                value={marriedCoupleFriendly}
                onChange={setMarriedCoupleFriendly}
                isSelectable={true}
                selectableData={[
                  { label: "Yes", value: true },
                  { label: "No", value: false },
                ]}
              />
              <TextField
                key="unmarriedCoupleFriendly"
                label="Unmarried Couple Friendly"
                value={unmarriedCoupleFriendly}
                onChange={setUnmarriedCoupleFriendly}
                isSelectable={true}
                selectableData={[
                  { label: "Yes", value: true },
                  { label: "No", value: false },
                ]}
              />
              <TextField
                key="oldAgeFriendly"
                label="Old Age Friendly"
                value={oldAgeFriendly}
                onChange={setOldAgeFriendly}
                isSelectable={true}
                selectableData={[
                  { label: "Yes", value: true },
                  { label: "No", value: false },
                ]}
              />
              <TextField
                key="poolGymBar"
                label="Pool / Gym / Bar"
                value={poolGymBar}
                onChange={setPoolGymBar}
                isSelectable={true}
                selectableData={[
                  { label: "Available", value: true },
                  { label: "Not Available", value: false },
                ]}
              />
            </>
          ) : (
            // Display fields
            <>
              <DisplayField label="UserName" value={userName} />
              {/* <DisplayField label="Lastname" value={lastName} /> */}
              <DisplayField
                label="Email address"
                value={email}
                verified={isEmailVerified}
              />
              <DisplayField
                label="Whatsapp number"
                value={whatsappContact || "Add your phone number"}
                // verified={isPhoneVerified}
              />
              {/* <DisplayField
                label="Date of birth"
                value={dateOfBirth || "Enter your date of birth"}
              /> */}
              <DisplayField label="Location" value={location} />
              <DisplayField label="Gender" value={gender} />
              <DisplayField label="Notifications" value={notifications} />
              <h2
                style={{
                  fontWeight: "500",
                  color: "rgba(107,114,128,1)",
                  paddingLeft: "1.5rem",
                  paddingRight: "1.5rem",
                  paddingTop: "2rem",
                  paddingBottom: "1.5rem",
                }}
              >
                Hotel Preferences
              </h2>
              <DisplayField label="Hotel Location" value={location} />
              <DisplayField label="Amenities" value={amenities.join("/ ")} />
              {/* <DisplayField
                label="Price Range"
                value={`$${hotelPreferences.priceRange.min} - $${hotelPreferences.priceRange.max}`}
              /> */}
              <DisplayField
                label="Wifi"
                value={wifi ? "Enabled" : "Disabled"}
              />
              <DisplayField
                label="Doctor 24x7"
                value={doctor24x7 ? "Available" : "Not Available"}
              />
              <DisplayField
                label="Pet Allowed"
                value={petAllowed ? "Allowed" : "Not Allowed"}
              />
              <DisplayField
                label="Married Couple Friendly"
                value={marriedCoupleFriendly ? "Yes" : "No"}
              />
              <DisplayField
                label="Unmarried Couple Friendly"
                value={unmarriedCoupleFriendly ? "Yes" : "No"}
              />
              <DisplayField
                label="Old Age Friendly"
                value={oldAgeFriendly ? "Yes" : "No"}
              />
              {/* <DisplayField
                label="Preferred Location"
                value={hotelPreferences.preferredLocation}
              /> */}
              {/* <DisplayField
                label="Transport Public"
                value={`Airport: ${hotelPreferences.transportPublic.airport}, Bus Stand: ${hotelPreferences.transportPublic.busStand}, Railway Station: ${hotelPreferences.transportPublic.railwayStation}`}
              /> */}
              <DisplayField
                label="Pool, Gym, Bar"
                value={poolGymBar ? "Available" : "Not Available"}
              />
            </>
          )}
        </dl>
      </div>
      <div className="value-box flex justify-between px-4 py-3 bg-gray-50 text-right sm:px-6">
        {isEditMode ? (
          <>
            <button
              onClick={handleCancelClick}
              className="button-cancel inline-flex items-center px-2.5 py-1.5 border border-gray-300 text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveClick}
              className="buttons-edit inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-brand hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Save
            </button>
          </>
        ) : (
          <button
            onClick={handleEditClick}
            className="buttons-edit inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-brand hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Edit
          </button>
        )}
      </div>
      {toastMessage && (
        <div className="m-2">
          <Toast
            type={toastMessage.type}
            message={toastMessage.message}
            dismissError={clearToastMessage}
          />
        </div>
      )}
    </div>
  );
};

const DisplayField = ({ label, value, verified }) => (
  <div
    className={`display-field-cont bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 ${
      verified ? "bg-gray-50" : ""
    }`}
    style={{ backgroundColor: verified ? "#F3F4F6" : "transparent" }}
  >
    <dt
      className="font-medium text-gray-500"
      style={{ fontWeight: "500", color: "rgba(107,114,128,1)" }}
    >
      {label}
    </dt>
    <dd className="value-field mt-1 text-gray-900 sm:mt-0 sm:col-span-2">
      {value}{" "}
      {verified && (
        <span
          className="text-green-500 font-medium"
          style={{ color: "rgba(34,197,94,1)", fontWeight: "500" }}
        >
          Verified
        </span>
      )}
    </dd>
  </div>
);

const TextField = ({
  label,
  value,
  onChange,
  type = "text",
  isSelectable,
  selectableData,
}) => (
  <div className="text-box bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
    <dt
      className="font-medium text-gray-500"
      style={{ fontWeight: "500", color: "rgba(107,114,128,1)" }}
    >
      {label}
    </dt>
    <dd className="in-box mt-1 sm:mt-0 sm:col-span-2">
      {isSelectable ? (
        <Select
          options={selectableData}
          value={selectableData.find((city) => city.value === value)}
          onChange={(selectedOption) => onChange(selectedOption.value)}
        />
      ) : (
        <input
          type={type}
          className="input1-box mt-1 border py-1 px-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full text-sm md:text-base  rounded-md"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
    </dd>
  </div>
);

export default ProfileDetails;
