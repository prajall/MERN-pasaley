import { Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import ShopUi from "./pages/ShopUi";
import { CardComponent } from "./types";

const SignupCardComponentProps: CardComponent = {
  title: "Signup",
  description: "",
  footer: "Already have Account?",
};
const LoginCardComponentProps: CardComponent = {
  title: "Login",
  description: "",
  footer: "New to Pasaley? Register",
};

function App() {
  return (
    <div className="w-10/12 mx-auto">
      {/* <Alert message="Login Successfully" /> */}
      <Navbar />
      <div className="">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route
            path="/signup"
            element={<Signup {...SignupCardComponentProps} />}
          />
          <Route
            path="/login"
            element={<Login {...LoginCardComponentProps} />}
          />
          <Route path="/shop/:shopName" element={<ShopUi />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
