interface Props {
  categories: string[];
  selected: string;
  onSelect: (category: string) => void;
}

export default function CategoryFilter({
  categories,
  selected,
  onSelect,
}: Props) {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => onSelect("all")}
        className={`px-3 py-1 rounded transition-colors
          ${
            selected === "all"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-black dark:bg-gray-700 dark:text-white"
          }
        `}
      >
        All
      </button>

      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onSelect(cat)}
          className={`px-3 py-1 rounded transition-colors
            ${
              selected === cat
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-black dark:bg-gray-700 dark:text-white"
            }
          `}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
