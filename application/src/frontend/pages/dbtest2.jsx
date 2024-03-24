import React, { useEffect, useState } from "react";
import axios from "axios";

const Dbtest2 = () => {
  useEffect(() => {
    const currentUrl = new URL(window.location.href);
    const searchParams = new URLSearchParams(currentUrl.search);
    const paramEntries = searchParams.entries();
    const data = Object.fromEntries(paramEntries);

    axios
      .post("http://localhost:8000/dbtest2", data)
      .then((res) => {
        console.log(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  return (
    <div>
      <br></br>
      <br></br>
      <br></br>
      <br></br>fuck
    </div>
  );
};
export default Dbtest2;