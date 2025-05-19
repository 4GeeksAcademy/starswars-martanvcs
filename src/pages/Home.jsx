import React from "react";
import { Container } from "react-bootstrap";
import CardComponent from "../components/CardComponent";
import { useGlobalContext } from "../store.jsx";

const Home = () => {
  const { store } = useGlobalContext();

  const Section = ({ title, items, type }) => {
    if (!items?.length) return null;

    return (
      <div className="mb-5">
        <h2 className="text-warning text-uppercase mb-3">{title}</h2>
        <div
          className="d-flex flex-row gap-3 overflow-auto pb-2"
          style={{ scrollSnapType: "x mandatory" }}
        >
          {items.map((item, index) => (
            <CardComponent key={index} item={item} type={type} />
          ))}
        </div>
      </div>
    );
  };

  return (
    <Container className="py-4 text-light">
      <Section title="Characters" items={store.people} type="people" />
      <Section title="Planets" items={store.planets} type="planets" />
      <Section title="Vehicles" items={store.vehicles} type="vehicles" />
    </Container>
  );
};

export default Home;
