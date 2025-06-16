import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGlobalContext } from "../store.jsx";
import { entityDescriptions } from "../data/descriptions.js";
import { Container, Row, Col } from "react-bootstrap";

const Single = () => {
	const { type, uid } = useParams();
	const { store } = useGlobalContext();
	const [item, setItem] = useState(null);

	useEffect(() => {
		const dataList = store[type] || [];
		const match = dataList.find((el) => el.uid === uid || el._id === uid);
		setItem(match || null);
	}, [store, type, uid]);

	const getImageUrl = (type, uid) => {
		const base = "https://raw.githubusercontent.com/tbone849/star-wars-guide/refs/heads/master/build/assets/img";
		if (!uid) return `${base}/placeholder.jpg`;

		switch (type) {
			case "people":
				return `${base}/characters/${uid}.jpg`;
			case "planets":
				return `${base}/planets/${uid}.jpg`;
			case "vehicles":
				return `${base}/starships/${uid}.jpg`;
			default:
				return `${base}/placeholder.jpg`;
		}
	};

	if (!item) return <p className="text-light">Loading...</p>;

	const displayData = item.properties || item;
	const name = displayData.name;
	const description = entityDescriptions[name]?.text;
	const details = entityDescriptions[name]?.details;
	const imageUrl = getImageUrl(type, uid);

	return (
		<Container className="my-4 text-light">
			<Row>
				<Col md={4} className="text-center mb-3">
					<img
						src={imageUrl}
						alt={name}
						className="img-fluid rounded"
						onError={(e) => {
							e.target.src =
								"https://raw.githubusercontent.com/tbone849/star-wars-guide/refs/heads/master/build/assets/img/placeholder.jpg";
						}}
					/>
				</Col>
				<Col md={8}>
					<h2>{name}</h2>
					<p>{description || "No description available."}</p>
					{details && (
						<ul className="list-group list-group-flush">
							{Object.entries(details).map(([key, value]) => (
								<li
									className="list-group-item bg-dark text-light"
									key={key}
								>
									<strong>{key}:</strong>{" "}
									{Array.isArray(value)
										? value.join(", ")
										: value}
								</li>
							))}
						</ul>
					)}
				</Col>
			</Row>
		</Container>
	);
};

export default Single;

