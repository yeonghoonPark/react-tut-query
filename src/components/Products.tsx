import React, { useState } from "react";
import { useQuery } from "react-query";
import { Product } from "../models/products";

export default function Products() {
  const [isChecked, setIsChecked] = useState(false);

  // useQuery,
  // 첫반째인자: 고유한 키값, 고유한 키값을 기준으로하여 caching을 담당하기 때문에 유니크해야 한다
  // 두번째인자: 함수, fetch, axios등 데이터를 받아오는 로직, async await이나 promise형태로 값을 반환
  // 세번째인자: 옵셔널
  const {
    data: products,
    isLoading,
    error,
  } = useQuery<Product[]>(["products", [isChecked]], async () => {
    console.log("fetching...");
    return fetch(`/data/${isChecked ? "sale_" : ""}products.json`).then((res) =>
      res.json(),
    );
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.checked ? setIsChecked(true) : setIsChecked(false);
  };

  if (isLoading) return <div>isLoading...</div>;
  if (error) return <>뭥가 잘못됐슴니다..{error}</>;

  return (
    <div>
      <label>
        <input type='checkbox' checked={isChecked} onChange={handleChange} />
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
