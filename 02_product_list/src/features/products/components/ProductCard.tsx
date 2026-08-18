import type { Product } from "../types/product";

type ProductCardProp = {
  product: Product;
  handleAddToCart: (product: Product) => void;
};

function ProductCard({ product, handleAddToCart }: ProductCardProp) {
  return (
    <div className="flex w-full max-w-sm flex-col gap-4 rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <div className="flex flex-col gap-2">
        <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>

        <p className="text-xl font-bold text-gray-800">
          ₹{product.price.toLocaleString("en-IN")}
        </p>
      </div>

      <button
        onClick={() => handleAddToCart(product)}
        className="rounded-lg bg-blue-600 px-4 py-2.5 font-medium text-white transition hover:bg-blue-700 active:scale-95"
      >
        Add to Cart
      </button>
    </div>
  );
}

export default ProductCard;
