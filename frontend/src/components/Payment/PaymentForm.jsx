import React, { useContext, useEffect, useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import "./PaymentForm.css";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useLocation } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";

// const PaymentForm = ({ hotel }) => {
const PaymentForm = () => {
  const { userDetails } = useContext(AuthContext);
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [paymentResult, setPaymentResult] = useState(null);
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const totalPrice = queryParams.get("price");
  const hotels = JSON.parse(decodeURIComponent(queryParams.get("hotelData")));
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    // setLoading(true);
    setSuccess(true);
    console.log(success);
    console.log(userDetails);

    //   // Create a payment method using Stripe
    //   const { error, paymentMethod } = await stripe.createPaymentMethod({
    //     type: "card",
    //     card: elements.getElement(CardElement),
    //   });

    //   if (error) {
    //     setError(error.message);
    //     setLoading(false);
    //     return;
    //   }

    try {
      // Send payment details to the backend along with hotel data
      const response = await fetch("http://127.0.0.1:6969/api/bookHotel", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          //         token: paymentMethod.id,
          //   hotel: hotel, // Pass hotel details to the backend
          userDetails: userDetails,
          hotels: hotels,
        }),
      });

      // Handle the response from the backend
      const data = await response.json();
      // success = response.data.status === 200;
      setPaymentResult(data.message); // Assuming the backend sends a message field
      console.log(data);

      // Generate and download bill as PDF
      // generateAndDownloadBill();

      // Reset error and loading state
      // setError(null);
      // setLoading(false);
    } catch (error) {
      console.error("Error processing payment:", error);
      // setError("An error occurred while processing the payment.");
      setError("hemlo");
      setLoading(false);
    }
  };

  // const generateAndDownloadBill = () => {
  //   // Create new jsPDF instance
  //   const pdf = new jsPDF();

  //   // Get payment details
  //   const paymentDetails = {
  //     amount: totalPrice, // Example amount
  //     currency: "USD", // Example currency
  //     hotelName: hotel.hotelName, // Example hotel name
  //   };

  //   // Generate HTML content for bill
  //   const htmlContent = `
  //     <h1>Payment Bill</h1>
  //     <p>Amount: ${paymentDetails.amount} ${paymentDetails.currency}</p>
  //     <p>Hotel Name: ${paymentDetails.hotelName}</p>
  //   `;

  //   // Convert HTML content to canvas and then to PDF
  //   html2canvas(document.getElementById("billContent")).then((canvas) => {
  //     const imgData = canvas.toDataURL("image/png");
  //     pdf.addImage(imgData, "PNG", 10, 10);
  //     pdf.save("payment_bill.pdf");
  //   });
  // }
  // };

  return (
    <div className="body-payment">
      <div className="paybody">
        <form className="payment-form" onSubmit={handleSubmit}>
          <h2>Enter Card Details</h2>
          <CardElement className="card-element" />
          <button type="submit" disabled={!stripe || loading}>
            {loading ? "Processing..." : "Pay"}
          </button>
          {/* {error && <div className="error-message">{error}</div>} */}
          {paymentResult && (
            <div className="payment-result">{paymentResult}</div>
          )}
        </form>
        <div
          id="billContent"
          style={success == true ? {} : { display: "none" }}
        >
          {/* Hidden div to render bill content */}
          <h1>Payment Bill</h1>
          <p>Amount: {totalPrice}</p>
          <p>Hotel Name: {hotels.hotelName}</p>
        </div>
      </div>
    </div>
  );
};

export default PaymentForm;
