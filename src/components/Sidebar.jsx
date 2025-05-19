import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button, Collapse, Nav } from "react-bootstrap";

const categories = [
  { name: "All", value: "" },
  { name: "Characters", value: "characters" },
  { name: "Planets", value: "planets" },
  { name: "Vehicles", value: "vehicles" }
];

const Sidebar = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const activeFilter = searchParams.get("filter") || "";
  const [open, setOpen] = useState(true); 

  const handleNavigate = (value) => {
    navigate(value ? `/?filter=${value}` : "/");
    if (window.innerWidth < 768) setOpen(false); 
  };

  return (
    <div className="sidebar d-flex flex-column">
      
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
            {categories.map((cat) => {
              const isActive = activeFilter === cat.value;
              return (
                <Nav.Link
                  key={cat.name}
                  onClick={() => handleNavigate(cat.value)}
                  className={`text-uppercase ${
                    isActive ? "text-warning fw-bold" : "text-light"
                  }`}
                >
                  {cat.name}
                </Nav.Link>
              );
            })}
          </Nav>
        </div>
      </Collapse>
    </div>
  );
};

export default Sidebar;

