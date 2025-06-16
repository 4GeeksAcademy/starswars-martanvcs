import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import CardComponent from "../components/CardComponent.jsx";
import { useGlobalContext } from "../store.jsx";

const Home = () => {
	const { store } = useGlobalContext();

	useEffect(() => {
		console.log("🧍 People:");
		store.people?.forEach((p) => console.log(" -", p.name));

		console.log("🌍 Planets:");
		store.planets?.forEach((p) => console.log(" -", p.name));

		console.log("🚗 Vehicles:");
		store.vehicles?.forEach((v) => console.log(" -", v.name));
	}, [store]);

	const Section = ({ title, items, type, id }) => {
		if (!items?.length) return null;

		return (
			<div id={id} className="mb-5">
				<h2 className="text-warning text-uppercase mb-3 text-center">{title}</h2>
				<div
					className="d-flex flex-row gap-3 overflow-auto pb-2 px-2"
					style={{
						scrollSnapType: "x mandatory",
						scrollbarWidth: "thin",
					}}
				>
					{items.map((item, index) => (
						<div key={index} style={{ scrollSnapAlign: "start" }}>
							<CardComponent item={item} type={type} />
						</div>
					))}
				</div>
			</div>
		);
	};

	return (
		<Container className="py-4 text-light">
			<div className="text-center mb-4">
				<h1>Welcome to the Star Wars Databank</h1>
			</div>

			<Section title="Characters" items={store.people} type="people" id="section-people" />
			<Section title="Planets" items={store.planets} type="planets" id="section-planets" />
			<Section title="Vehicles" items={store.vehicles} type="vehicles" id="section-vehicles" />
		</Container>
	);
};

export default Home;
