import React from "react";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../store.jsx";
import { Navbar as BsNavbar, Container, Nav, Dropdown, Button } from "react-bootstrap";

const Navbar = () => {
	const { store, actions } = useGlobalContext();

	const handleClearCache = () => {
		localStorage.clear();
		window.location.reload();
	};

	return (
		<BsNavbar bg="dark" variant="dark" expand="lg" className="px-3">
			<Container fluid>
				<Link to="/" className="navbar-brand">
					Star Wars Databank
				</Link>

				<BsNavbar.Toggle aria-controls="navbar-nav" />
				<BsNavbar.Collapse id="navbar-nav">
					<Nav className="ms-auto d-flex align-items-center gap-3">

						
						<Link to="/favorites">
							<Button variant="outline-warning" size="sm">
								View Favorites
							</Button>
						</Link>

						
						<Link to="/demo">
							<Button variant="outline-light" size="sm">
								Demo
							</Button>
						</Link>

						
						<Dropdown>
							<Dropdown.Toggle variant="secondary" size="sm">
								Favorites ({store.favorites.length})
							</Dropdown.Toggle>
							<Dropdown.Menu>
								{store.favorites.length === 0 ? (
									<Dropdown.Item disabled>No favorites</Dropdown.Item>
								) : (
									store.favorites.map((item, i) => (
										<Dropdown.Item
											key={i}
											className="d-flex justify-content-between align-items-center"
										>
											<span>{item.name}</span>
											<Button
												variant="link"
												size="sm"
												onClick={() => actions.toggleFavorite(item)}
											>
												❌
											</Button>
										</Dropdown.Item>
									))
								)}
							</Dropdown.Menu>
						</Dropdown>

						
						<Button
							variant="outline-danger"
							size="sm"
							onClick={handleClearCache}
							title="Clear cache and reload"
						>
							Clear Cache
						</Button>
					</Nav>
				</BsNavbar.Collapse>
			</Container>
		</BsNavbar>
	);
};

export default Navbar;
