import { ProductType } from "@/types";
import Product from "./Product";

interface ProductListProps {
  products: ProductType[];
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  return (
    <div className="mt-5">
      {products.map((product: ProductType) => (
        <Product product={product} key={product._id} />
      ))}
    </div>
  );
};

export default ProductList;
