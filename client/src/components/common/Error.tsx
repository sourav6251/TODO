import { Link } from "react-router-dom";
import { AlertTriangle } from "lucide-react";

const Error = () => {
  return (
    <div className="h-full flex flex-col items-center justify-center bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6">
      <div className="flex flex-col items-center text-center">
        <AlertTriangle className="h-20 w-20 text-yellow-300 mb-6" />

        <h1 className="text-6xl font-bold mb-4">404</h1>
        <p className="text-xl mb-6">
          Oops! The page you’re looking for doesn’t exist.
        </p>

        <Link
          to="/"
          className="px-6 py-3 bg-white text-indigo-600 font-semibold rounded-lg shadow-md hover:bg-indigo-100 transition-colors duration-200"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default Error;
