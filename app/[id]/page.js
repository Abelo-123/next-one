"use client";

import { useState, useEffect } from "react";

export default function Page({ params }) {
  const [name, setName] = useState(null);
  const { id } = params;

  const fetchData = async () => {
    try {
      const response = await fetch("/api/getData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      setName(result.data?.name || "No name found");
    } catch (error) {
      console.error("Fetch data error:", error);
      setName("Error fetching data");
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  return (
    <>
      {name} <br />
      {id}
    </>
  );
}
