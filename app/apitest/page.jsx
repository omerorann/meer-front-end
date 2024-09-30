"use client";
import React from "react";
import axios from "axios";
import { useState } from "react";

const Page = () => {
  const [data, setData] = useState(null);

  const fetchData = async () => {
    const response = await axios.get(
      "https://meer-afcrg0gua8hah2g4.germanywestcentral-01.azurewebsites.net/api/deneme"
    );
    setData(response.data);
  };

  console.log(data);

  return (
    <div>
      <button onClick={fetchData}>Fetch Data</button>
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </div>
  );
};

export default Page;
