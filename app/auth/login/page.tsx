import React from "react";
import Link from "next/link";

const page = () => {
  return (
    <div>
      <h1>Register</h1>
      <Link href="/auth/signup">Signup</Link>
    </div>
  );
};

export default page;
