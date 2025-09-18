import { useState } from "react";

export default function FilterBar({ onFilter }) {
  const [filters, setFilters] = useState({
    location: "",
    craft: "",
    productType: "",
    priceMin: "",
    priceMax: ""
  });

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onFilter(filters);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-amber-100 rounded mb-4 flex flex-wrap gap-4">
      <input
        name="location"
        value={filters.location}
        onChange={handleChange}
        placeholder="Location"
        className="p-2 border rounded w-40"
      />
      <input
        name="craft"
        value={filters.craft}
        onChange={handleChange}
        placeholder="Craft"
        className="p-2 border rounded w-40"
      />
      <input
        name="productType"
        value={filters.productType}
        onChange={handleChange}
        placeholder="Product Type"
        className="p-2 border rounded w-40"
      />
      <input
        name="priceMin"
        value={filters.priceMin}
        onChange={handleChange}
        placeholder="Min Price"
        type="number"
        className="p-2 border rounded w-32"
      />
      <input
        name="priceMax"
        value={filters.priceMax}
        onChange={handleChange}
        placeholder="Max Price"
        type="number"
        className="p-2 border rounded w-32"
      />
      <button type="submit" className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800">
        Apply
      </button>
    </form>
  );
}
