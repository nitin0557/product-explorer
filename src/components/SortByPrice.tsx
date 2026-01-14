interface Props {
  value: "asc" | "desc" | "none";
  onChange: (v: "asc" | "desc" | "none") => void;
}

export default function SortByPrice({ value, onChange }: Props) {
  return (
    <select
      aria-label="Sort by price"
      className="border rounded px-3 py-2"
      value={value}
      onChange={(e) => onChange(e.target.value as any)}
    >
      <option value="none">Sort By</option>
      <option value="asc">Price: Low → High</option>
      <option value="desc">Price: High → Low</option>
    </select>
  );
}
