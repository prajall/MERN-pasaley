import { ChevronsRight } from "lucide-react";
import logo from "../assests/logo-dark.png";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Homepage = () => {
  return (
    <div className="mt-24 w-full flex flex-col items-center">
      <div>
        <div className="my-5">
          <img src={logo} className="md:w-[500px] w-[300px]" />
        </div>
        <div className="my-10 opacity-80">
          <p className="text-3xl font-semibold my-2">Welcome to Pasaley</p>
          <p>Your shops companion</p>
        </div>
        <Link to="/shop/65d08e82ef3ff4d04e6e38a0">
          <Button variant="link" className="p-0">
            Explore Laxmi Store <ChevronsRight />
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Homepage;
