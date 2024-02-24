import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import ProductList from "@/components/ProductList";
import { ProductArray } from "@/types";

const ShopUi: React.FC = () => {
  const params = useParams().shopName;
  const [searchInput, setSearchInput] = useState("");
  const [products, setProducts] = useState<ProductArray>([]);

  const submitHandler = async () => {
    try {
      if (!searchInput) return;
      const res = await axios.get(
        `http://localhost:3000/product/${params}/search?keyword=${searchInput}`
      );
      const data = res.data.data;
      console.log(data);
      setProducts(data);
      setSearchInput("");
    } catch (error) {}
  };

  useEffect(() => {}, []);

  return (
    <div>
      <div className="flex w-fit max-w-sm mx-auto border space-x-2 mt-5">
        <Input
          type="text"
          placeholder="Search Product"
          onChange={(e) => {
            setSearchInput(e.target.value);
          }}
          className="w-72 md:w-80 lg:w-96"
        />
        <Button type="submit" onClick={submitHandler}>
          <Search />
        </Button>
      </div>
      <ProductList products={products} />
    </div>
  );
};

export default ShopUi;
