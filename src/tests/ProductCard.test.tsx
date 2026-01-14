import { render, screen } from "@testing-library/react";
import ProductCard from "@/components/ProductCard";

test("renders product title", () => {
  render(<ProductCard product={{ id:1, title:"Test", price:100, category:"cat", image:"", description:"" }} />);
  expect(screen.getByText("Test")).toBeInTheDocument();
});
