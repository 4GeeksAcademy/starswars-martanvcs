import React, { useState } from "react";
import { Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../store.jsx";

// IDs válidos conocidos para cada tipo según starwars-visualguide.com
const fallbackIds = {
  characters: [1, 2, 3, 4, 5, 10, 12, 14, 16, 18, 20, 22, 25, 28, 30, 35, 40, 50, 60],
  planets: [1, 2, 3, 4, 5, 6, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55],
  vehicles: [4, 6, 7, 8, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36],
};

const CardComponent = ({ item, type }) => {
  const navigate = useNavigate();
  const { actions } = useGlobalContext();
  const [imageUrl, setImageUrl] = useState(null);

  const getImageType = (type) => (type === "people" ? "characters" : type);
  const imageType = getImageType(type);
  const initialUrl = `https://starwars-visualguide.com/assets/img/${imageType}/${item.uid}.jpg`;

  const handleImageError = () => {
    // Selecciona una imagen válida al azar como respaldo
    const fallbacks = fallbackIds[imageType];
    const randomId = fallbacks[Math.floor(Math.random() * fallbacks.length)];
    const fallbackUrl = `https://starwars-visualguide.com/assets/img/${imageType}/${randomId}.jpg`;
    console.warn(`Image not found for ${item.properties?.name}, using fallback ID ${randomId}`);
    setImageUrl(fallbackUrl);
  };

  return (
    <Card
      style={{ width: "180px", minWidth: "180px" }}
      className="text-center shadow-sm bg-dark text-light"
    >
      <Card.Img
        variant="top"
        src={imageUrl || initialUrl}
        onError={handleImageError}
        style={{ height: "180px", objectFit: "cover" }}
      />
      <Card.Body className="p-2">
        <Card.Title className="card-title">{item.properties?.name}</Card.Title>
        <Card.Text style={{ fontSize: "0.8rem" }}>
          {type === "people" && "A character from the Star Wars universe."}
          {type === "planets" && "A known planet within the galaxy."}
          {type === "vehicles" && "A vehicle used in intergalactic travel."}
        </Card.Text>
        <div className="d-flex justify-content-between mt-2">
          <Button
            variant="outline-light"
            size="sm"
            onClick={() => navigate(`/${type}/${item.uid}`)}
          >
            Info
          </Button>
          <Button
            variant="outline-warning"
            size="sm"
            onClick={() =>
              actions.toggleFavorite({
                uid: item.uid,
                name: item.properties?.name,
                type,
              })
            }
          >
            ❤️
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default CardComponent;

