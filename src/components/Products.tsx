import React, { useState } from "react";
import { useQuery } from "react-query";
import { Product } from "../models/products";

export default function Products() {
  const [isChecked, setIsChecked] = useState(false);

  // ** useQuery()
  // 첫반째인자: 고유한 키값, 고유한 키값을 기준으로하여 caching을 담당하기 때문에 유니크해야 한다
  // 두번째인자: 함수, fetch, axios등 데이터를 받아오는 로직, async await이나 promise형태로 값을 반환
  // 세번째인자: 옵셔널

  // ** 자동 리페칭 상황 (staleTime의 기본값인 0초인 경우)
  // 1. 새로운 쿼리가 마운트 됐을 경우
  // 2. 윈도우가 리포커스 됐을 경우
  // 3. 네트워크가 다시 연결 될 경우
  // 4. 쿼리가 리페치 인터벌이 설정 되었을 경우

  // ** 자동 리페칭 상황을 막을 수 있는 옵션
  // 1. refetchOnMount = {boolean}
  // 2. refetchOnWindowFocus = {boolean}
  // 3. refetchOnReconnect = {boolean}
  // 4. refetchInterval = {boolean}

  // ** 정리
  // 처음 useQuery를 사용할 경우 React에서 useQuery의 key값을 통하여 해당 key값에 caching된 data가 있는지 확인한다,
  // 만약 caching된 data가 없다면 server에 요청하여 data를 fetching한다.
  // server로 부터 data를 받는데 성공한다면 해당 data를 useQuery의 key값에 caching한다.
  // 여기서 기본 cacheTime은 5분이고 staleTime은 0초이다.
  // 윗 줄의 기본값으로 setting 된 경우, React의 UI에서 해당 key값에 대한 data를 다시 요청 할 경우
  // stale이 기본 값인 0초이기 때문에 useQuery는 기존 data를 stale상태로 인식하고 background에서 server로 요청을 다시 보내고 refetching하며 React는 다시 rendering한다.
  // 위의 server로 요청을 다시 받고 또 다시 caching하게 된다(cacheTime초기화). 그리고 또 다시 data는 0초 뒤에 stale상태가 된다.
  // 이런 경우 의도치 않게 무한적(위의 4가지 자동 리페칭 상황)으로 일어 날 수 있는 빈번한 네트워크 요청이 발생하므로 staleTime을 지정하여 네트워크 요청을 막을 수 있다.
  // 즉, staleTime은 데이터를 stale로 간주하지 않고 fresh로 간주 할 수 있는 시간이다.

  // 참조 : https://tanstack.com/query/v3/docs/react/guides/important-defaults

  const {
    data: products,
    isLoading,
    error,
  } = useQuery<Product[]>(
    ["products", [isChecked]],
    async () => {
      console.log("fetching...", isChecked);
      return fetch(`/data/${isChecked ? "sale_" : ""}products.json`).then(
        (res) => res.json(),
      );
    },
    {
      // 1초 * 1분 * 5 = 5분, 마지막 값을 받는다.
      // 즉 5분간 다시 패칭을 하지 않고 캐시 된 데이터를 사용한다.(리페칭이 일어나지 않는다.)
      // 단 시간을 지정할 때 무조건 cache를 길게 하기 보단 data가 backend에서 빈번히 업데이트가 되는지 사용자가 얼마만큼 data 업데이트가 필요한지를 고려하여 시간을 설정하는 것이 좋다.
      // 또한 새로운 POST나 PUT 업데이트를 요구하는 경우는 invalidate를 할 수 있게 해주면 된다. (자세한 건 MainProducts.tsx 참조)
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
