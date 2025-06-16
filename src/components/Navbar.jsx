import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../store.jsx";
import {
  Navbar as BsNavbar,
  Container,
  Nav,
  Dropdown,
  Button,
  Collapse,
} from "react-bootstrap";
import CardComponent from "./CardComponent.jsx";

const Navbar = () => {
  const { store, actions } = useGlobalContext();
  const [showFavorites, setShowFavorites] = useState(false);

  const handleClearCache = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <>
      <BsNavbar bg="dark" variant="dark" expand="lg" className="px-3">
        <Container fluid>
          <Link to="/" className="navbar-brand">
            Star Wars Databank
          </Link>

          <BsNavbar.Toggle aria-controls="navbar-nav" />
          <BsNavbar.Collapse id="navbar-nav">
            <Nav className="ms-auto d-flex align-items-center gap-3">
              <Button
                variant="outline-warning"
                size="sm"
                onClick={() => setShowFavorites(!showFavorites)}
              >
                View Favorites
              </Button>

              <Link to="/demo">
                <Button variant="outline-light" size="sm">
                  Demo
                </Button>
              </Link>

              <Dropdown>
                <Dropdown.Toggle variant="secondary" size="sm">
                  Favorites ({store.favorites.length})
                </Dropdown.Toggle>
                <Dropdown.Menu className="bg-dark text-white">
                  {store.favorites.length === 0 ? (
                    <Dropdown.Item className="text-white" disabled>
                      No favorites
                    </Dropdown.Item>
                  ) : (
                    store.favorites.map((item, i) => (
                      <Dropdown.Item
                        key={i}
                        className="d-flex justify-content-between align-items-center text-white"
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

      {/* Sección Expandible de Favoritos */}
      <Collapse in={showFavorites}>
        <div className="bg-dark p-3">
          <Container>
            <h4 className="text-warning text-uppercase mb-3 text-center">
              Your Favorites
            </h4>

            {store.favorites.length === 0 ? (
              <p className="text-center text-light">
                You haven't added any favorites yet.
              </p>
            ) : (
              <div className="d-flex flex-wrap gap-3 justify-content-center">
                {store.favorites.map((item, index) => (
                  <CardComponent key={index} item={item} type={item.type} />
                ))}
              </div>
            )}
          </Container>
        </div>
      </Collapse>
    </>
  );
};

export default Navbar;