import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Button, Collapse, Nav } from "react-bootstrap";

const categories = [
  { name: "Characters", id: "section-people" },
  { name: "Planets", id: "section-planets" },
  { name: "Vehicles", id: "section-vehicles" }
];

const Sidebar = () => {
  const [open, setOpen] = useState(true);
  const location = useLocation();

  const scrollTo = (id) => {
    if (location.pathname !== "/") {
      window.location.href = `/#${id}`;
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
    if (window.innerWidth < 768) setOpen(false);
  };

  return (
    <div className="sidebar">
      <Button
        variant="outline-light"
        className="d-md-none mb-3"
        onClick={() => setOpen(!open)}
        aria-controls="sidebar-nav"
        aria-expanded={open}
      >
        {open ? "Hide Menu" : "Browse Databank"}
      </Button>

      <Collapse in={open} dimension="height">
        <div id="sidebar-nav">
          <h6 className="text-secondary text-uppercase mb-4 d-none d-md-block">
            Browse Databank //
          </h6>
          <Nav className="flex-column gap-2">
            {categories.map((cat) => (
              <Nav.Link
                key={cat.name}
                onClick={() => scrollTo(cat.id)}
                className="text-light text-uppercase"
                style={{ cursor: "pointer" }}
              >
                {cat.name}
              </Nav.Link>
            ))}
          </Nav>
        </div>
      </Collapse>
    </div>
  );
};

export default Sidebar;

