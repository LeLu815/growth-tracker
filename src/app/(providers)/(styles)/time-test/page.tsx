function Page() {

  const date = new Date();

  return (
      <div>{date.toString()}</div>
  );
}

export default Page;