import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { CardComponent } from "@/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

const Login: React.FC<CardComponent> = ({ title, description, footer }) => {
  const [email, setEmail] = useState("prajal@gmail.com");
  const [password, setPassword] = useState("password");
  const navigate = useNavigate();

  const { toast } = useToast();

  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    const user = {
      email,
      password,
    };

    try {
      const res = await axios.post("http://localhost:3000/shop/login", user, {
        withCredentials: true,
      });

      toast({
        description: res.data.message,
      });
      navigate("/");
    } catch (error: any) {
      console.log(error.response.data.message);
      toast({
        description: error.response.data.message || error.message,
      });
    }
  };
  return (
    <div className="w-full h-full">
      <Card className="w-[400px] md:w-[500px] mx-auto mt-24 ">
        <CardHeader>
          <CardTitle className="text-center">{title}</CardTitle>
          <CardDescription className="text-center">
            {description}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action="">
            <div className="grid w-full max-w-sm items-center gap-1.5 my-5">
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                id="email"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className="mt-1 "
              />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5 my-5">
              <Label htmlFor="password">Password</Label>
              <Input
                type="password"
                id="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                className="mt-1 "
              />
            </div>

            <Button onClick={handleSubmit} className="mt-5 w-full">
              Login
            </Button>
          </form>
        </CardContent>
        <CardFooter>
          <Button variant={"link"} className="w-full text-center">
            {footer}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
