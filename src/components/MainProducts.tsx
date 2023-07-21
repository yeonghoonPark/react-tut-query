import React, { useState } from "react";
import Products from "./Products";
import { useQueryClient } from "react-query";

export default function MainProducts() {
  const [showLeftProducts, setShowLeftProducts] = useState(true);
  const [showRightProducts, setShowRightProducts] = useState(true);

  const client = useQueryClient();
  const invalidateProducts = () => client.invalidateQueries(["products"]);

  return (
    <main
      style={{
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <section>
        {showLeftProducts && <Products />}
        <button onClick={() => setShowLeftProducts((prev) => !prev)}>
          Toggle
        </button>
      </section>
      <section>
        {showRightProducts && <Products />}
        <button onClick={() => setShowRightProducts((prev) => !prev)}>
          Toggle
        </button>
      </section>
      <button onClick={invalidateProducts}>정보가 업데이트 되었음</button>
    </main>
  );
}
