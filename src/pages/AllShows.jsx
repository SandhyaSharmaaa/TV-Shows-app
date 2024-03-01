import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/Auth";

const AllShows = () => {
  const { signOut } = useAuth();
  const [shows, setShows] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortOption, setSortOption] = useState(null);

  const fetchShows = async (page) => {
    try {
      const response = await fetch(
        `https://www.episodate.com/api/most-popular?page=${page}`
      );
      const data = await response.json();
      setShows(data.tv_shows);
      setTotalPages(data.pages);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching shows:", error);
      setError("Error fetching shows. Please try again later.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchShows(currentPage);
  }, [currentPage]);

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  const handleSortChange = (option) => {
    setSortOption(option);
  };

  const getVisiblePages = () => {
    const maxVisiblePages = 5;
    const halfVisiblePages = Math.floor(maxVisiblePages / 2);
    let startPage = currentPage - halfVisiblePages;
    let endPage = currentPage + halfVisiblePages;

    if (startPage < 1) {
      startPage = 1;
      endPage = maxVisiblePages;
    }

    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = totalPages - maxVisiblePages + 1;
    }

    return Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => startPage + i
    );
  };

  const sortedAndFilteredShows = shows
    .filter((show) =>
      show.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOption === "name") {
        return a.name.localeCompare(b.name);
      } else if (sortOption === "date") {
        return a.start_date.localeCompare(b.start_date);
      }
      return 0;
    });

  return (
    <div className="container mx-auto p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold mx-auto">Most Popular Shows</h1>
        <button className="text-blue-500 hover:underline" onClick={signOut}>
          Logout
        </button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="mb-4 w-[60%] mx-auto border rounded-lg flex items-center">
        <input
          type="text"
          placeholder="Search your favourite shows..."
          className="border p-2 rounded w-full"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="ml-2 p-2 border rounded"
          value={sortOption || ""}
          onChange={(e) => handleSortChange(e.target.value)}
        >
          <option value="">Sort by</option>
          <option value="name">Name</option>
          <option value="date">Date</option>
        </select>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-10 gap-4">
        {sortedAndFilteredShows.map((show) => (
          <Link to={`/show/${show.id}`} key={show.id}>
            <div className="bg-gray-200 p-4 rounded-md transition transform hover:scale-105 cursor-pointer border border-gray-300 shadow-lg">
              <img
                src={show.image_thumbnail_path}
                alt={show.name}
                className="w-full h-40 object-contained object-center rounded-md mb-4"
              />
              <h2 className="text-2xl font-semibold ">{show.name}</h2>
              <div className="text-gray-600 text-sm">
                {show.network}
                <hr></hr> {show.start_date}
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-4 flex justify-center space-x-4">
        {currentPage > 1 && (
          <button
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-blue-600"
            onClick={() => handlePageClick(currentPage - 1)}
          >
            {"<"}
          </button>
        )}

        {getVisiblePages().map((page, index) => (
          <button
            key={index}
            className={`${
              currentPage === page
                ? "bg-blue-500 text-white"
                : "bg-gray-300 text-gray-700"
            } px-4 py-2 rounded hover:bg-blue-600`}
            onClick={() => handlePageClick(page)}
          >
            {page}
          </button>
        ))}

        {currentPage < totalPages && (
          <button
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-blue-600"
            onClick={() => handlePageClick(currentPage + 1)}
          >
            {">"}
          </button>
        )}
      </div>
    </div>
  );
};

export default AllShows;
