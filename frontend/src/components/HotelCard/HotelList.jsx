// /* eslint-disable no-unused-vars */
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import Card from "./Card";

// function HotelList() {
//   const [hotels, setHotels] = useState([]);

//   useEffect(() => {
//     async function fetchHotels() {
//       try {
//         const response = await axios.get("http://127.0.0.1:6969/hotel/hotels");
//         setHotels(response.data);
//       } catch (error) {
//         console.error("Error fetching hotels:", error);
//       }
//     }

//     fetchHotels();
//   }, []);

//   return (
//     <div className="hotel-list">
//       {hotels.map((hotel, index) => (
//         <Card key={index} hotel={hotel} />
//       ))}
//     </div>
//   );
// }

// export default HotelList;




/* eslint-disable no-unused-vars */
import React from "react";
import Card from "./Card";

function HotelList({ hotels }) {
  return (
    <div className="hotel-list">
      {hotels.map((hotel) => (
        <Card  hotel={hotel} />
      ))}
    </div>
  );
}

export default HotelList;
