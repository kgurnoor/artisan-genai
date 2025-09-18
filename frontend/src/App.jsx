import { useEffect, useState } from "react";
import FilterBar from "./components/FilterBar";

function App() {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setFiltered(data);
      });
  }, []);

  const handleFilter = (filters) => {
    let temp = [...products];
    if (filters.location) temp = temp.filter(p => p.location.toLowerCase().includes(filters.location.toLowerCase()));
    if (filters.craft) temp = temp.filter(p => p.craft.toLowerCase().includes(filters.craft.toLowerCase()));
    if (filters.productType) temp = temp.filter(p => p.productType.toLowerCase().includes(filters.productType.toLowerCase()));
    if (filters.priceMin) temp = temp.filter(p => p.price >= parseFloat(filters.priceMin));
    if (filters.priceMax) temp = temp.filter(p => p.price <= parseFloat(filters.priceMax));
    setFiltered(temp);
  };

  return (
    <div className="p-6 bg-yellow-50 min-h-screen">
      <h1 className="text-2xl font-bold text-red-800 mb-4">Artisan Products</h1>
      <FilterBar onFilter={handleFilter} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(p => (
          <div key={p.id} className="p-4 border rounded shadow bg-white">
            <img src={p.image} alt={p.name} className="w-full h-48 object-cover mb-2"/>
            <h2 className="text-lg font-semibold">{p.name}</h2>
            <p>{p.craft} — {p.productType}</p>
            <p className="text-green-700 font-bold">₹{p.price}</p>
            <p className="text-gray-500">{p.location}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
