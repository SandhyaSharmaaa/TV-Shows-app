import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ShowDetails = () => {
  const { id } = useParams();
  const [showDetails, setShowDetails] = useState(null);

  useEffect(() => {
    const fetchShowDetails = async () => {
      try {
        const response = await fetch(`https://www.episodate.com/api/show-details?q=${id}`);
        const data = await response.json();
        setShowDetails(data.tvShow);
      } catch (error) {
        console.error('Error fetching show details:', error);
      }
    };

    fetchShowDetails();
  }, [id]);

  return (
    <div className="container mx-auto p-8">
      {showDetails ? (
        <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0">
          <img
            src={showDetails.image_path}
            alt={showDetails.name}
            className="w-64 h-96 object-cover rounded-md mb-4 md:mr-8"
          />
          <div className="flex flex-col">
            <h1 className="text-3xl font-bold mb-4">{showDetails.name}</h1>
            <p className="text-gray-600 mb-4">{showDetails.network}</p>
            <p className="text-gray-800">{showDetails.description}</p>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ShowDetails;
