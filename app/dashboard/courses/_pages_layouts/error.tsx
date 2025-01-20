import Link from "next/link";

const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-red-600">
        Oops! Something went wrong.
      </h1>
      <p className="mt-4 text-lg text-gray-700">
        We are experiencing some technical issues. Please try again later.
      </p>
      <Link className="mt-6" href={"/dashboard"}>
        Go to Home
      </Link>
    </div>
  );
};

export default ErrorPage;
