const express = require("express");
const bcrypt = require("bcrypt");
const Hotel = require("../models/hotelModel");
const User = require("../models/userModel");
const transporter = require("../email/mailer");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const router = express.Router();

router.post("/addHotel", async (req, res) => {
  const token = req.cookies.token;

  // If token does not exist, return unauthorized
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    // Verify the token to get the user ID
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decodedToken.userId;

    // Fetch the user from the database
    const adminUser = await User.findById(userId);

    // If user does not exist or user is not admin, return forbidden
    if (!adminUser || adminUser.role !== "admin") {
      return res
        .status(403)
        .json({ message: "You are not authorized to add a hotel" });
    }

    const {
      hotelAdminName,
      hotelAdminId,
      hotelBanner,
      hotelImages,
      hotelCapacity,
      hotelDescription,
      hotelName,
      location,
      address,
      description,
      amenities,
      rating,
      numberOfRooms,
      pricePerNight,
      images,
      contactNumber,
      email,
      website,
      coordinates,
      reviews,
      availability,
      wifi,
      doctor24x7,
      petAllowed,
      marriedCoupleFriendly,
      unmarriedCoupleFriendly,
      oldAgeFriendly,
      journeyStartDate,
      journeyEndDate,
      preferredLocation,
      transportPublic,
      poolGymBar,
      userList,
    } = req.body;

    const existingHotel = await Hotel.findOne({ hotelName });

    if (existingHotel) {
      return res.status(400).json({ message: "Hotel already exists" });
    }

    const hotel = new Hotel({
      hotelAdminName: adminUser.username,
      hotelAdminId: adminUser.id,
      hotelBanner,
      hotelImages,
      hotelCapacity,
      hotelDescription,
      hotelName,
      location,
      address,
      description,
      amenities,
      rating,
      numberOfRooms,
      pricePerNight,
      images,
      contactNumber,
      email,
      website,
      coordinates,
      reviews,
      availability,
      wifi,
      doctor24x7,
      petAllowed,
      marriedCoupleFriendly,
      unmarriedCoupleFriendly,
      oldAgeFriendly,
      journeyStartDate,
      journeyEndDate,
      preferredLocation,
      transportPublic,
      poolGymBar,
      userList,
    });

    await hotel.save();
    res.status(200).json({ message: "Hotel added successfully" });

    // send mail to the admin with the hotel details
    const emailContent = `<style>
            body {
                font-family: Arial, sans-serif;
                line-height: 1.6;
                margin: 0;
                padding: 0;
            }
            .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                background-color: #f9f9f9;
                border-radius: 10px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
            h1 {
                font-size: 24px;
                margin-bottom: 20px;
                color: #333;
            }
            table {
                width: 100%;
                border-collapse: collapse;
                margin-bottom: 20px;
            }
            table, th, td {
                border: 1px solid #ddd;
                padding: 10px;
            }
            th {
                background-color: #f2f2f2;
            }
            tr:nth-child(even) {
                background-color: #f2f2f2;
            }
            .footer {
                margin-top: 20px;
                font-size: 14px;
                color: #666;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>Hotel added successfully</h1>
            <table style="border: 1px solid #000;">
                <tr>
                    <th>Hotel Name</th>
                    <th>Hotel Admin</th>
                    <th>Hotel Description</th>
                    <th>Location</th>
                    <th>Address</th>
                </tr>
                <tr>
                    <td>${hotel.hotelName}</td>
                    <td>${hotel.hotelAdminName}</td>
                    <td>${hotel.hotelDescription}</td>
                    <td>${hotel.location}</td>
                    <td>${hotel.address}</td>
                </tr>
            </table>
            <div class="footer">
                <p>Team StayPlanner</p>
                <p>Contact us: stayplannerhelp@gmail.com</p>
                <p>About us: StayPlanner is a hotel booking website</p>
            </div>
        </div>
    </body>`;

    // send email notification to the admin
    transporter.sendMail({
      to: adminUser.email,
      subject: "StayPlanner | Successfully added hotel",
      html: emailContent,
    });
  } catch (error) {
    console.error("Error adding hotel:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/hotels", async (req, res) => {
  try {
    const hotels = await Hotel.find({});
    res.status(200).json(hotels);
  } catch (error) {
    console.error("Error finding hotels:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/hotel/:hotelId", async (req, res) => {
  try {
    const hotelId = req.params.hotelId;
    const hotel = await Hotel.findOne({ hotelId });
    if (!hotel) {
      return res.status(404).json({ message: "Hotel not found" });
    }
    res.status(200).json(hotel);
  } catch (error) {
    console.error("Error finding hotel:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.put("/hotel/:hotelId", async (req, res) => {
  if (req.user.role !== "admin") {
    return res
      .status(403)
      .json({ message: "You are not authorized to update a hotel" });
  }
  try {
    const hotelId = req.params.hotelId;
    const updatedHotel = req.body;
    const hotel = await Hotel.findOneAndUpdate({ hotelId }, updatedHotel, {
      new: true,
    });
    if (!hotel) {
      return res.status(404).json({ message: "Hotel not found" });
    }
    res.status(200).json({ message: "Hotel updated successfully" });
  } catch (error) {
    console.error("Error updating hotel:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/hotels/verticalFilters", (req, res) => {
  res.status(200).json({
    errors: [],
    data: {
      elements: [
        {
          filterId: "star_ratings",
          title: "Star ratings",
          filters: [
            {
              id: "5_star_rating",
              title: "5 Star",
              value: "5",
            },
            {
              id: "4_star_rating",
              title: "4 Star",
              value: "4",
            },
            {
              id: "3_star_rating",
              title: "3 Star",
              value: "3",
            },
          ],
        },
        {
          filterId: "propety_type",
          title: "Property type",
          filters: [
            {
              id: "prop_type_hotel",
              title: "Hotel",
            },
            {
              id: "prop_type_apartment",
              title: "Apartment",
            },
            {
              id: "prop_type_villa",
              title: "Villa",
            },
          ],
        },
      ],
    },
  });
});

router.get("/availableCities", (req, res) => {
  res.status(200).json({
    errors: [],
    data: {
      elements: ["pune", "bangalore", "mumbai"],
    },
  });
});

router.get("/hotels/filterHotels", (req, res) => {
  const currentPage = req.query.currentPage;
  const filters = req.query.filters;
  const parsedFilters = JSON.parse(filters);
  const parsedAdvancedFilters = JSON.parse(req.query.advancedFilters);
  const city = parsedFilters.city;
  const star_ratings = parsedFilters.star_ratings;
  const priceFilter = parsedFilters.priceFilter;
  const sortByFilter = parsedAdvancedFilters.find((filter) => {
    return filter.sortBy;
  });

  const filteredResults = hotelsData.filter((hotel) => {
    const hotelRating = parseFloat(hotel.ratings);
    const hotelPrice = parseFloat(hotel.price.replace(",", ""));
    const isCityMatch = city === "" || hotel.city === city;
    const isPriceMatch =
      !priceFilter ||
      (hotelPrice >= parseFloat(priceFilter.start) &&
        hotelPrice <= parseFloat(priceFilter.end));

    if (isCityMatch && isPriceMatch) {
      if (star_ratings && star_ratings.length > 0) {
        return star_ratings.some((selectedRating) => {
          const selected = parseFloat(selectedRating);
          const range = 0.5;
          return Math.abs(hotelRating - selected) <= range;
        });
      } else {
        // If no star ratings are provided, return all hotels for the city (or all cities if city is empty)
        return true;
      }
    }
    return false;
  });

  if (sortByFilter) {
    const sortType = sortByFilter.sortBy;
    if (sortType === "priceLowToHigh") {
      filteredResults.sort((a, b) => {
        return a.price - b.price;
      });
    }
    if (sortType === "priceHighToLow") {
      filteredResults.sort((a, b) => {
        return b.price - a.price;
      });
    }
  }

  // Pagination config
  const pageSize = 6;
  const totalPages = Math.floor((filteredResults.length - 1) / pageSize) + 1;
  const currentPageNum = currentPage > totalPages ? totalPages : currentPage;
  const startIdx = (currentPageNum - 1) * pageSize;
  const endIdx = currentPageNum * pageSize;
  const paginatedResults = filteredResults.slice(startIdx, endIdx);

  const paging = {
    currentPage: currentPageNum || 1,
    totalPages,
    pageSize,
  };

  res.status(200).json({
    errors: [],
    data: {
      elements: paginatedResults,
    },
    metadata: {
      totalResults: filteredResults.length,
    },
    paging,
  });
});

// book hotel check if hotel have capacity
// router.post('/bookHotel/:hotelId', async (req, res) => {
//     try {
//       const hotelId = req.params.hotelId;
//       const hotel = await Hotel.findOne
//         ({ hotelId });
//         if (!hotel) {
//             return res.status(404).json({message:"Hotel not found"});
//         }
//         if(hotel.hotelCapacity <= 0){
//             return res.status(400).json({message:"Hotel is full"});
//         }
//         hotel.hotelCapacity -= 1;
//         await hotel.save();
//         res.status(200).json({message:"Hotel booked successfully"});
//     } catch (error) {
//         console.error("Error booking hotel:", error);
//         res.status(500).json({message:"Internal Server Error"});
//     }
//     }
// );

module.exports = router;
