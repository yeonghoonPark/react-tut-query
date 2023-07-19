import React, { useState } from "react";
import { useQuery } from "react-query";
import { Product } from "../models/products";

export default function Products() {
  const [isChecked, setIsChecked] = useState(false);

  // useQuery,
  // 첫반째인자: 고유한 키값, 고유한 키값을 기준으로하여 caching을 담당하기 때문에 유니크해야 한다
  // 두번째인자: 함수, fetch, axios등 데이터를 받아오는 로직, async await이나 promise형태로 값을 반환
  // 세번째인자: 옵셔널

  // 참조 : https://tanstack.com/query/v3/docs/react/guides/important-defaults
  // ** 기본적으로 useQuery를 사용 할 경우 stale로 간주한다, 이는 무분별한 리페칭을 가져 올 수 있다, default 값에서의 refetching하는 상황은 아래와 같다.
  // 1. 새로운 쿼리가 마운트 됐을 경우
  // 2. 윈도우가 리포커스 됐을 경우
  // 3. 네트워크가 다시 연결 될 경우
  // 4. 쿼리가 리페치 인터벌이 설정 되었을 경우

  // 만약 위의 경우를 원하지 않을 경우 옵션을 지정할 수 있다.
  // 1. refetchOnMount
  // 2. refetchOnWindowFocus
  // 3. refetchOnReconnect
  // 4. refetchInterval

  // useQuery를 5분동안 아무곳에서도 사용하지 않으면 inactive 상태가 되는데 이는 cacheTime을 의미한다
  // 5분간이란 시간을 원하지 않을 경우 cacheTime 옵션을 통하여 직접 지정할 수 있다.

  const {
    data: products,
    isLoading,
    error,
  } = useQuery<Product[]>(
    ["products", [isChecked]],
    async () => {
      console.log("fetching...");
      return fetch(`/data/${isChecked ? "sale_" : ""}products.json`).then(
        (res) => res.json(),
      );
    },
    {
      // 1초 * 1분 * 5 = 5분, 마지막 값을 받는다.
      // 즉 5분간 다시 패칭을 하지 않고 캐시 된 데이터를 사용한다.(리페칭이 일어나지 않는다.)
      staleTime: 1000 * 60 * 5,
    },
  );

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
