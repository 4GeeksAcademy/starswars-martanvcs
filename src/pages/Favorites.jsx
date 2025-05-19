import React from "react";
import { useGlobalContext } from "../store.jsx";
import CardComponent from "../components/CardComponent";
import { Container } from "react-bootstrap";

const Favorites = () => {
	const { store } = useGlobalContext();

	const grouped = {
		characters: store.favorites.filter((item) => item.type === "characters"),
		planets: store.favorites.filter((item) => item.type === "planets"),
		vehicles: store.favorites.filter((item) => item.type === "vehicles"),
	};

	return (
		<Container className="py-4">
			<h2 className="mb-4">Favorites</h2>

			{Object.entries(grouped).map(([type, items]) =>
				items.length > 0 ? (
					<div className="mb-5" key={type}>
						<h4 className="text-uppercase">{type}</h4>
						<div className="d-flex flex-wrap gap-4">
							{items.map((item) => (
								<CardComponent key={item.uid} item={item} type={type} />
							))}
						</div>
					</div>
				) : null
			)}

			{store.favorites.length === 0 && (
				<p className="text-muted">No favorites saved yet.</p>
			)}
		</Container>
	);
};

export default Favorites;

