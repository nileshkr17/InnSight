import "./Bookings.css";

const Bookings = ({ bookings }) => {
  return (
    <div className="book-container bg-white shadow overflow-hidden sm:rounded-md">
      <ul className="con divide-y divide-gray-200">
        {bookings.map((booking, index) => (
          <li key={index} className="umm bg-white hover:bg-gray-50">
            <div className="in-div px-4 py-4 sm:px-6">
              <div
                className="flex items-center justify-between"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <p
                  className="text-sm font-bold text-brand truncate"
                  style={{
                    fontSize: "0.875rem",
                    lineHeight: "1.25rem",
                    color: "rgba(7,68,152,1)",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {booking.hotelName}
                </p>
                <div
                  className="ml-2 flex-shrink-0 flex"
                  style={{
                    display: "flex",
                    flexShrink: "0",
                    marginLeft: "0.5rem",
                  }}
                >
                  <p className="para px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    Booking ID: {booking._id}
                  </p>
                </div>
              </div>
              <div className="box2 mt-2 sm:flex sm:justify-between">
                <div className="sm:flex gap-x-2">
                  <p className="innn-box flex items-center text-sm text-gray-500">
                    <svg
                      className="inn2-box flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M8 7V3m8 4V3m-4 4V3m0 4v8m-4-4h8"
                      />
                    </svg>
                    Booking Date: {booking.bookingDate}
                  </p>
                  <p className="innn-box flex items-center text-sm text-gray-500">
                    <svg
                      className="inn2-box flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M7 10l5 5 5-5m-5 5V3"
                      />
                    </svg>
                    Check-in: {booking.checkInDate}
                  </p>
                  <p className="booox mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                    <svg
                      className="inn2-box flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M7 10l5 5 5-5m-5 5V3"
                      />
                    </svg>
                    Check-out: {booking.checkOutDate}
                  </p>
                </div>
                <div className="booox mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                  <p
                    className="flex items-center"
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <span className="font-medium">Total Fare: </span>{" "}
                    <span className="ml-2">{booking.totalAmount}</span>
                  </p>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Bookings;
