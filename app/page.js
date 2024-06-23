"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Home() {
  const [data, setData] = useState([]);
  const [name, setName] = useState("");

  const fetchData = async () => {
    let response = await fetch("/api/getData");
    response = await response.json();
    setData(response);
  };
  useEffect(() => {
    fetchData();
  }, []);

  const submitName = async () => {
    try {
      let res = await fetch("/api/postData", {
        method: "POST",
        headers: {
          "Content-Type": "application/name",
        },
        body: JSON.stringify({ name }),
      });

      const result = await res.json();

      setData((prevData) => [...prevData, result]);
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <>
      {name}
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={submitName}>addd</button>
      <ul>
        {data.map((item) => (
          <li key={item._id}>
            <Link href={`/${item._id}`}>{item.name}</Link>
          </li>
        ))}
      </ul>
    </>
  );
}
