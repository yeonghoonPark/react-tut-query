import { useEffect, useState } from "react";
import { Product } from "../models/products";

type Props = { isSale: boolean };

export default function useProducsts({ isSale }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState();

  useEffect(() => {
    setIsLoading(true);
    setError(undefined);
    fetch(`/data/${isSale ? "sale_" : ""}products.json`) //
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => setError(err))
      .finally(() => setIsLoading(false));
  }, [isSale]);

  return { isLoading, products, error };
}
