'use client'

import {useState} from "react";

function Page() {
  const [date, setDate] = useState(new Date());

  return (
      <div>{date.toString()}</div>
  );
}

export default Page;