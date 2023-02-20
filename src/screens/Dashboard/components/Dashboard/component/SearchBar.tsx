import React from "react";

function Notification() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-6 h-6 fill-gray-500"
    >
      <path
        fillRule="evenodd"
        d="M5.25 9a6.75 6.75 0 0113.5 0v.75c0 2.123.8 4.057 2.118 5.52a.75.75 0 01-.297 1.206c-1.544.57-3.16.99-4.831 1.243a3.75 3.75 0 11-7.48 0 24.585 24.585 0 01-4.831-1.244.75.75 0 01-.298-1.205A8.217 8.217 0 005.25 9.75V9zm4.502 8.9a2.25 2.25 0 104.496 0 25.057 25.057 0 01-4.496 0z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function SearchBar() {
  return (
    <section className="flex justify-between m-4">
      <h2 className="text-white text-lg">Stock Dashboard</h2>
      <div className="flex space-x-3 > * ">
        <input
          className="rounded-full  bg-slate-900 placeholder-gray-500  placeholder-opacity-50 text-center placeholder:text-xs "
          type="search"
          name="search"
          id=""
          placeholder="search something.."
        />
        <Notification />
        <img
          className="inline-block h-6 w-6 rounded-full"
          src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          alt=""
        />
      </div>
    </section>
  );
}

export default SearchBar;
