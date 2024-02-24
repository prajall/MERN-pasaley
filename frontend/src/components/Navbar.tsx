import { Link } from "react-router-dom";
import logo from "../assests/pasaley-logo.png";
import { Button } from "./ui/button";

const Navbar = () => {
  return (
    <div className="py-3 border-b-2 flex justify-between">
      <div className="link w-fit">
        <Link to="/">
          <img src={logo} className="w-[55px] p-2" />
        </Link>
      </div>
      <div className="flex gap-5">
        <Button>
          <Link to="/login"> Login</Link>
        </Button>
        <Button variant={"outline"}>
          <Link to="/signup">Signup</Link>
        </Button>
      </div>
    </div>
  );
};

export default Navbar;
