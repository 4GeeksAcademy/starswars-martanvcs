import React, { useEffect, useState } from "react";
import CardComponent from "../component/CardComponent.jsx";

export const Home = () => {
    const [characters, setCharacters] = useState([]);
    const [planets, setPlanets] = useState([]);
    const [vehicles, setVehicles] = useState([]);

    useEffect(() => {
        fetch("https://www.swapi.tech/api/people")
            .then(res => res.json())
            .then(data => setCharacters(data.results));

        fetch("https://www.swapi.tech/api/planets")
            .then(res => res.json())
            .then(data => setPlanets(data.results));

        fetch("https://www.swapi.tech/api/vehicles")
            .then(res => res.json())
            .then(data => setVehicles(data.results));
    }, []);

    return (
        <div className="container mt-4">
            <h2>Characters</h2>
            <div className="d-flex overflow-auto">
                {characters.map((item, index) => (
                    <CardComponent key={index} name={item.name} />
                ))}
            </div>

            <h2>Planets</h2>
            <div className="d-flex overflow-auto">
                {planets.map((item, index) => (
                    <CardComponent key={index} name={item.name} />
                ))}
            </div>

            <h2>Vehicles</h2>
            <div className="d-flex overflow-auto">
                {vehicles.map((item, index) => (
                    <CardComponent key={index} name={item.name} />
                ))}
            </div>
        </div>
    );
};
