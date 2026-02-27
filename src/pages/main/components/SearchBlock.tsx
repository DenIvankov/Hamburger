export function SearchBlock() {
  return (
    <div className="flex items-center gap-3 rounded-2xl bg-gray-100 px-4 py-3">
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-gray-500"
      >
        <path
          d="M11 19a8 8 0 100-16 8 8 0 000 16z"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M21 21l-4.35-4.35"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
      <input
        type="text"
        placeholder="Поиск"
        className="w-full bg-transparent text-sm outline-none"
      />
    </div>
  );
}
