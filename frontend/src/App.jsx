import "./App.css";
import Allrouter from "./components/Allrouter";
import NavBar from "./components/NarBar/NavBar";
import Footer from "./components/Footer/Footer";
import { AuthProvider } from "./components/Context/AuthContext";
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51PC3d9SBq8bDCNk46xmJEjB8n42JCilaKmLUcl3kFf48r1cxDiFdzYA6Bt3ALQEfXVLF7BZwPiyvEQpPr8ouszgv00Y4Qefh1y');

function App() {
  return (
    <Elements stripe={stripePromise}> 
      <AuthProvider initialIsAuthenticated={false}>
        <NavBar />
        <Allrouter />
        <Footer />
      </AuthProvider>
    </Elements>
  );
}

export default App;
