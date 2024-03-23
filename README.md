# StayPlanner

StayPlanner is a hotel recommendation web application that leverages machine learning to provide personalized hotel recommendations to users based on their preferences and requirements.

## Features

- **User Authentication**: Users can sign up and log in to the platform to access personalized recommendations.
- **Personalized Recommendations**: The website provides hotel recommendations based on user preferences such as desired star rating, guest recommendations, and description of the ideal hotel.
- **ML Model Integration**: StayPlanner integrates a machine learning model to analyze hotel descriptions and provide accurate recommendations.
- **Responsive UI**: The frontend is built using React.js, ensuring a responsive and user-friendly interface across devices.
- **Scalable Backend**: The backend is powered by Express.js and MongoDB, providing a scalable and efficient infrastructure for managing user data and hotel information.

#### sample user ####
```
{
  "username": "nilesh123",
  "email": "nilesh@example.com",
  "password": "password123",
  "role": "user",
  "gender": "Male",
  "location": "Jamshedpur",
  "governmentId": {
    "type": "PAN",
    "value": "ABCDE1234F"
  },
  "whatsappContact": 1234567890,
  "emailVerified": true,
  "paymentMethodAdded": true,
  "preferences": {
    "budget": "Medium",
    "accessibility": "Enabled",
    "notifications": "Email",
    "language": "English"
  }
}

```
