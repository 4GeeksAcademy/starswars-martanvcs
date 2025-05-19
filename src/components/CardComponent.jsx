import React, { useState } from "react";
import { Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../store.jsx";

const CardComponent = ({ item, type }) => {
  const navigate = useNavigate();
  const { actions } = useGlobalContext();
  const [imageExists, setImageExists] = useState(true);

  if (!item || !item.properties || !type) return null;

  const getImageType = (type) => (type === "people" ? "characters" : type);
  const getUidFromUrl = (url) => url?.split("/").filter(Boolean).pop();
  const uid = item.uid || getUidFromUrl(item.url);
  const imageType = getImageType(type);

  // Generar un ID aleatorio como fallback según el tipo
  const getRandomId = (max) => Math.floor(Math.random() * max) + 1;
  const fallbackId = {
    characters: getRandomId(83),
    planets: getRandomId(60),
    vehicles: getRandomId(40)
  }[imageType];

  const imageUrl = `https://starwars-visualguide.com/assets/img/${imageType}/${uid}.jpg`;
  const fallbackUrl = `https://starwars-visualguide.com/assets/img/${imageType}/${fallbackId}.jpg`;

  const handleImageError = (e) => {
    setImageExists(false);
    e.target.src = fallbackUrl;
    console.warn(`Image not found for ${item?.properties?.name || "Unknown entity"}`);
  };

  return (
    <Card
      style={{ width: "180px", minWidth: "180px" }}
      className="text-center shadow-sm bg-dark text-light"
    >
      <Card.Img
        variant="top"
        src={imageExists ? imageUrl : fallbackUrl}
        onError={handleImageError}
        style={{ height: "180px", objectFit: "cover" }}
      />

      <Card.Body className="p-2">
        <Card.Title className="card-title">{item.properties.name}</Card.Title>
        <Card.Text style={{ fontSize: "0.8rem" }}>
          {type === "people" && "A character from the Star Wars universe."}
          {type === "planets" && "A known planet within the galaxy."}
          {type === "vehicles" && "A vehicle used in intergalactic travel."}
        </Card.Text>
        <div className="d-flex justify-content-between mt-2">
          <Button
            variant="outline-light"
            size="sm"
            onClick={() => navigate(`/${type}/${uid}`)}
          >
            Info
          </Button>
          <Button
            variant="outline-warning"
            size="sm"
            onClick={() =>
              actions.toggleFavorite({
                uid,
                name: item.properties.name,
                type
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


