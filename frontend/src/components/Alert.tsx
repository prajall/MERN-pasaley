import { AlertComponent } from "@/types";
import { Button } from "./ui/button";
import { toast } from "sonner";

const Alert: React.FC<AlertComponent> = ({ message }) => {
  return (
    <div>
      <Button variant="outline" onClick={() => toast(message)}>
        Show Toast
      </Button>
    </div>
  );
};

export default Alert;
