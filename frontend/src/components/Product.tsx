import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import digestive from "../assests/digestive.jpg";
import { Badge } from "@/components/ui/badge";
import { ProductType } from "@/types";
import { useState } from "react";

type ProductProp = {
  product: ProductType;
};

const Product: React.FC<ProductProp> = ({ product }) => {
  const [activeQuantity, setActiveQuantity] = useState(0);

  return (
    <div className="mt-2">
      <div key={product._id}>
        <Card className="flex justify-between max-w-[500px] mx-auto">
          <div className="left flex">
            <div className="productImage m-1">
              <img src={digestive} className="w-[100px] h-[100px]" />
            </div>
            <CardHeader className="p-1 mt-3">
              <CardTitle>{product.name}</CardTitle>
              <CardDescription>{product.company}</CardDescription>
            </CardHeader>
          </div>
          <div className="mt-3 flex flex-col justify-between">
            <p className="font-semibold text-2xl flex justify-end mr-3 text-slate-600">
              <span className="text-sm mt-[11px] mr-1">Rs.</span>

              {product.rate[activeQuantity].price}
            </p>
            <div className="flex gap-2 mb-4 mr-2">
              {product.rate.map((rate, index) => (
                <Badge
                  variant={index === activeQuantity ? "default" : "outline"}
                  className="cursor-pointer "
                  onClick={() => setActiveQuantity(index)}
                  key={index}
                >
                  {rate.quantity}
                </Badge>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Product;
