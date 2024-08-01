'use client'

import {useEffect, useState} from "react";

function Page() {
  const [date, setDate] = useState(new Date().toISOString());


  useEffect(() => {
    setDate(new Date().toISOString());
  }, []);

  return (
      <div>{date}</div>
  );
}

export default Page;