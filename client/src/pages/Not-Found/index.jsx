import React from "react";
import { Link, useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  const goToHome = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-100">
      <div className="bg-white rounded-lg shadow-lg p-8 md:p-16 text-center max-w-3xl">
        <h1 className="text-4xl md:text-6xl font-bold text-blue-600 mb-4">
          404
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Oops! The page you're looking for doesn't exist.
        </p>
        <div className="mb-8">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            className="w-64 mx-auto"
          >
            <path
              fill="#E2E8F0"
              d="M256 0C114.613 0 0 114.613 0 256s114.613 256 256 256 256-114.613 256-256S397.387 0 256 0zm0 480C123.383 480 32 388.617 32 256S123.383 32 256 32s224 91.383 224 224-91.383 224-224 224z"
            />
            <path
              fill="#63B3ED"
              d="M361.941 267.529c-7.675-3.074-15.695-5.711-23.824-8.11-3.653-.959-7.337-1.834-11.024-2.646-18.733-4.089-36.394-6.774-55.927-7.962l15.556-25.885c2.117-3.521.875-8.142-2.646-10.259-3.521-2.117-8.142-.875-10.259 2.646l-19.925 33.17c-17.593-.577-35.084-.577-52.677 0l-19.925-33.17c-2.117-3.521-6.738-4.763-10.259-2.646-3.521 2.117-4.763 6.738-2.646 10.259l15.556 25.885c-19.533 1.188-37.194 3.873-55.927 7.962-3.687.812-7.371 1.687-11.024 2.646-8.129 2.399-16.149 5.037-23.824 8.11-6.907 2.766-8.895 11.313-3.836 16.583 5.91 5.91 12.216 12.414 18.411 19.125 7.659 8.037 16.002 16.459 24.993 25.451 39.598 39.598 84.283 64.224 121.256 64.224s81.658-24.626 121.256-64.224c8.991-8.991 17.334-17.414 24.993-25.451 6.195-6.711 12.501-13.215 18.411-19.125 5.059-5.27 3.071-13.817-3.836-16.583z"
            />
            <circle cx="256" cy="256" r="64" fill="#2D3748" />
            <circle cx="208" cy="240" r="16" fill="#FFFFFF" />
            <circle cx="304" cy="240" r="16" fill="#FFFFFF" />
          </svg>
        </div>
        <p className="text-gray-600">
          Maybe you mistyped the URL or the page has been moved.
        </p>
        <Link to={"/"}>
          <button className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 transition">
            Go Back Home
          </button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
