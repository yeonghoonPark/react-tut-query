import React, { useState } from "react";
import Products from "./Products";

export default function MainProducts() {
  const [showLeftProducts, setShowLeftProducts] = useState(true);
  const [showRightProducts, setShowRightProducts] = useState(true);
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
    </main>
  );
}
