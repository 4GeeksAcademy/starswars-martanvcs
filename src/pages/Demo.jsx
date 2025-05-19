import React from "react";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../store.jsx";
import { Container, ListGroup, Button } from "react-bootstrap";

const Demo = () => {
	const { store, actions } = useGlobalContext();

	return (
		<Container className="mt-4">
			<h2>Demo Page</h2>
			<p>This page demonstrates how the global context and actions work.</p>

			{store.todos?.length > 0 ? (
				<ListGroup>
					{store.todos.map((item) => (
						<ListGroup.Item
							key={item.id}
							className="d-flex justify-content-between align-items-center"
							style={{ backgroundColor: item.background || "white" }}
						>
							<div>
								<Link to={`/single/${item.id}`}>Link to: {item.title}</Link>
								<p className="mb-0 text-muted">Edit this in your store.js</p>
							</div>
							<Button
								variant="success"
								onClick={() =>
									actions.updateColor?.(item.id, "#ffa500")
								}
							>
								Change Color
							</Button>
						</ListGroup.Item>
					))}
				</ListGroup>
			) : (
				<p>No todos found. Add some to the store.</p>
			)}

			<div className="mt-4">
				<Link to="/">
					<Button variant="primary">Back to Home</Button>
				</Link>
			</div>
		</Container>
	);
};

export default Demo;

