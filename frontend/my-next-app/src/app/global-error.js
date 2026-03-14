"use client";

export default function GlobalError({ error, reset }) {
  return (
    <html>
      <body className="flex items-center justify-center h-screen bg-gray-100">
        <div className="text-center">
          
          <h1 className="text-4xl font-bold text-red-600">
            Something went wrong!
          </h1>

          <p className="mt-4 text-gray-600">
            {error?.message || "An unexpected error occurred"}
          </p>

          <button
            onClick={() => reset()}
            className="mt-6 px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Try Again
          </button>

        </div>
      </body>
    </html>
  );
}