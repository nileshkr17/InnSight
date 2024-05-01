import "./App.css";
import Allrouter from "./components/Allrouter";
import NavBar from "./components/NarBar/NavBar";
import Footer from "./components/Footer/Footer";
import { AuthProvider } from "./components/Context/AuthContext";

function App() {
  return (
    <>
      <AuthProvider initialIsAuthenticated={false}>
        <NavBar />
        <Allrouter />
        <Footer />
      </AuthProvider>
    </>
  );
}

export default App;
