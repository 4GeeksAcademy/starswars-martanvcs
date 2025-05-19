import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";
import { entityDescriptions } from "../data/descriptions";

const getImageType = (type) => (type === "people" ? "characters" : type);
const getUidFromUrl = (url) => url?.split("/").filter(Boolean).pop();

const Single = () => {
  const { type, uid } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imageExists, setImageExists] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`https://www.swapi.tech/api/${type}/${uid}`);
        const result = await res.json();
        setData(result.result);
      } catch (err) {
        console.error("Error loading details:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [type, uid]);

  if (loading) return <div className="text-center mt-5">Loading...</div>;
  if (!data) return <div className="text-center mt-5">No data found.</div>;

  const { properties } = data;
  const visualType = getImageType(type);
  const visualUid = uid || getUidFromUrl(data.result?.url);
  const imageUrl = `https://starwars-visualguide.com/assets/img/${visualType}/${visualUid}.jpg`;
  const descriptionEntry = entityDescriptions[properties.name];

  const handleImageError = (e) => {
    setImageExists(false);
    e.target.src =
      "https://starwars-visualguide.com/assets/img/big-placeholder.jpg";
  };

  const section = (title, items) => (
    <div className="mb-4">
      <h6 className="text-uppercase text-secondary">{title}</h6>
      {Array.isArray(items)
        ? items.map((el, i) => (
            <div key={i} className="text-light small">
              {el}
            </div>
          ))
        : <div className="text-light small">{items}</div>}
    </div>
  );

  return (
    <Container fluid className="text-light py-4">
      <Row className="gx-4 gy-4 align-items-start">
        <Col lg={5}>
          <img
            src={imageExists ? imageUrl : "https://starwars-visualguide.com/assets/img/big-placeholder.jpg"}
            alt={properties.name}
            onError={handleImageError}
            className="img-fluid rounded shadow"
          />
        </Col>
        <Col lg={7}>
          <h2 className="text-uppercase text-warning">{properties.name}</h2>
          <p className="mb-4">
            {descriptionEntry?.text ||
              `${properties.name} is a known ${type === "people" ? "character" : type} in the Star Wars universe.`}
          </p>
        </Col>
      </Row>

      {descriptionEntry?.details && (
        <>
          <hr className="border-secondary my-4" />
          <Row className="gx-4 gy-4 mt-3">
            {Object.entries(descriptionEntry.details).map(([key, value]) => (
              <Col key={key} xs={12} sm={6} md={4} lg={3}>
                {section(key, value)}
              </Col>
            ))}
          </Row>
        </>
      )}

      <div className="text-center mt-5">
        <Link to="/">
          <Button variant="outline-light">← Back to Home</Button>
        </Link>
      </div>
    </Container>
  );
};

export default Single;



