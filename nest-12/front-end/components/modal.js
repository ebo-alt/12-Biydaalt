export const Modal = ({ title, children, open, setOpen }) => {
  return (
    open && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="w-full max-w-lg bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="flex justify-between items-center px-6 py-4 border-b">
            <h1 className="text-lg font-semibold text-gray-800">{title}</h1>
            <button
              onClick={() => setOpen(false)}
              className="text-gray-500 hover:text-gray-700 transition duration-200"
              aria-label="Close modal"
            >
              ✕
            </button>
          </div>

          <div className="p-6 space-y-4">{children}</div>

          <div className="flex justify-end px-6 py-4 border-t">
            <button
              onClick={() => setOpen(false)}
              className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded hover:bg-red-600 transition duration-200"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    )
  );
};
