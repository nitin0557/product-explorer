interface Props {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBar({ value, onChange }: Props) {
  return (
    <input
      type="text"
      placeholder="Search products..."
      className="w-full border rounded-lg px-4 py-2"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}
