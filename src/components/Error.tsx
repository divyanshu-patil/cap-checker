const Error = ({
  msg,
  dismissError,
}: {
  msg: string;
  dismissError: () => void;
}) => {
  return (
    <div className="fixed top-8 left-0 w-full  flex justify-center items-center">
      <div className="w-auto px-6 py-4 lg:py-1 rounded-2xl bg-red-100 flex justify-center items-center gap-10">
        <p className="capitalize  text-red-800 text-2xl ">{msg}</p>
        <button
          className=" w-8 h-8 hover:bg-red-200 rounded-md transition-colors duration-300"
          onClick={dismissError}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-red-800"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              {" "}
              <path
                className="fill-red-800"
                d="M6.99486 7.00636C6.60433 7.39689 6.60433 8.03005 6.99486 8.42058L10.58 12.0057L6.99486 15.5909C6.60433 15.9814 6.60433 16.6146 6.99486 17.0051C7.38538 17.3956 8.01855 17.3956 8.40907 17.0051L11.9942 13.4199L15.5794 17.0051C15.9699 17.3956 16.6031 17.3956 16.9936 17.0051C17.3841 16.6146 17.3841 15.9814 16.9936 15.5909L13.4084 12.0057L16.9936 8.42059C17.3841 8.03007 17.3841 7.3969 16.9936 7.00638C16.603 6.61585 15.9699 6.61585 15.5794 7.00638L11.9942 10.5915L8.40907 7.00636C8.01855 6.61584 7.38538 6.61584 6.99486 7.00636Z"
              ></path>{" "}
            </g>
          </svg>
        </button>
      </div>
    </div>
  );
};
export default Error;
