import React, { useState } from "react";
import useProducsts from "../hooks/useProducsts";

export default function Products() {
  const [isSale, setIsSale] = useState(false);
  const { isLoading, products, error } = useProducsts({ isSale });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.checked ? setIsSale(true) : setIsSale(false);
  };

  if (isLoading) return <div>isLoading...</div>;
  if (error) return <div>뭥가 잘못됐슴니다..{error}</div>;

  return (
    <div>
      <label>
        <input type='checkbox' checked={isSale} onChange={handleChange} />
        Show only sale
      </label>

      <ul>
        {products.map(({ id, name, price }) => (
          <li key={id}>
            {name}
            <div>{price}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
