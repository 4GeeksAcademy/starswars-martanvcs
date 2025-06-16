import React from "react";
import { Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../store.jsx";
import { entityDescriptions } from "../data/descriptions.js";

const CardComponent = ({ item, type }) => {
	const navigate = useNavigate();
	const { actions } = useGlobalContext();

	const getUidFromUrl = (url) => {
		if (!url) return null;
		const parts = url.split("/").filter(Boolean);
		return parts.at(-1);
	};

	const uid = item?.uid || getUidFromUrl(item?.url);
	const name = item?.properties?.name || item?.name || "Unknown";

	const getImageUrl = (type, uid) => {
		const base =
			"https://raw.githubusercontent.com/tbone849/star-wars-guide/refs/heads/master/build/assets/img";

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

	const imageUrl = getImageUrl(type, uid);
	const description = entityDescriptions[name]?.text;

	return (
		<Card
			style={{
				width: "180px",
				minWidth: "180px",
				height: "100%",
				display: "flex",
				flexDirection: "column",
				justifyContent: "space-between",
			}}
			className="text-center shadow-sm bg-dark text-light"
		>
			<Card.Img
				variant="top"
				src={imageUrl}
				onError={(e) => {
					e.target.src =
						"https://raw.githubusercontent.com/tbone849/star-wars-guide/refs/heads/master/build/assets/img/placeholder.jpg";
				}}
				style={{ height: "180px", objectFit: "cover" }}
			/>

			<Card.Body className="d-flex flex-column p-2">
				<Card.Title className="card-title">{name}</Card.Title>
				<Card.Text
					style={{
						fontSize: "0.8rem",
						flexGrow: 1,
						overflow: "hidden",
						textOverflow: "ellipsis",
						display: "-webkit-box",
						WebkitLineClamp: 3,
						WebkitBoxOrient: "vertical",
					}}
				>
					{description || "No description available."}
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
							actions.toggleFavorite({ uid, name, type })
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





