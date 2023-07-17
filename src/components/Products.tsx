import React, { useState } from "react";
import useProducsts from "../hooks/useProducsts";
import { useQuery } from "react-query";
import { Product } from "../models/products";

export default function Products() {
  const [isSale, setIsSale] = useState(false);

  // useQuery, 첫반째인자: 고유한 키값, 두번째인자: 데이터, 세번째인자: 옵셔널
  const {
    data: products,
    isLoading,
    error,
  } = useQuery<Product[]>(["products", [isSale]], async () => {
    console.log("fetching...");
    return fetch(`/data/${isSale ? "sale_" : ""}products.json`).then((res) =>
      res.json(),
    );
  });

  // const { isLoading, products, error } = useProducsts({ isSale });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.checked ? setIsSale(true) : setIsSale(false);
  };

  if (isLoading) return <div>isLoading...</div>;
  if (error) return <>뭥가 잘못됐슴니다..{error}</>;

  return (
    <div>
      <label>
        <input type='checkbox' checked={isSale} onChange={handleChange} />
        Show only sale
      </label>

      <ul>
        {products &&
          products.map(({ id, name, price }) => (
            <li key={id}>
              {name}
              <div>{price}</div>
            </li>
          ))}
      </ul>
    </div>
  );
}
