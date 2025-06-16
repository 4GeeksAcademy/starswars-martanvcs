// Import necessary hooks and components from react-router-dom and other libraries.
import { Link, useParams } from "react-router-dom";  // To use link for navigation and useParams to get URL parameters
import PropTypes from "prop-types";  // To define prop types for this component
import rigoImageUrl from "../assets/img/rigo-baby.jpg"  // Import an image asset
import { useGlobalContext } from "../store.jsx";  // Import a custom hook for accessing the global state
import { entityDescriptions } from "../data/descriptions.js";
import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";

// Define and export the Single component which displays individual item details.
const Single = props => {
  // Access the global state using the custom hook.
  const { store } = useGlobalContext()

  // Retrieve the 'theId' URL parameter using useParams hook.
  const { theId, type, uid } = useParams()
  const singleTodo = store.todos.find(todo => todo.id === parseInt(theId));

  const [item, setItem] = useState(null);

  useEffect(() => {
    if (!type || !uid) return;
    const dataList = store[type] || [];
    const match = dataList.find(el => el.uid === uid || el._id === uid);
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

  if (theId && singleTodo) {
    return (
      <div className="container text-center">
        {/* Display the title of the todo element dynamically retrieved from the store using theId. */}
        <h1 className="display-4">Todo: {singleTodo?.title}</h1>
        <hr className="my-4" />  {/* A horizontal rule for visual separation. */}

        {/* A Link component acts as an anchor tag but is used for client-side routing to prevent page reloads. */}
        <Link to="/">
          <span className="btn btn-primary btn-lg" href="#" role="button">
            Back home
          </span>
        </Link>
      </div>
    );
  }

  if (type && uid && item) {
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
                    {Array.isArray(value) ? value.join(", ") : value}
                  </li>
                ))}
              </ul>
            )}
          </Col>
        </Row>
        <div className="mt-4">
          <Link to="/">
            <span className="btn btn-primary btn-lg" href="#" role="button">
              Back home
            </span>
          </Link>
        </div>
      </Container>
    );
  }

  return null;
};

// Use PropTypes to validate the props passed to this component, ensuring reliable behavior.
Single.propTypes = {
  // Although 'match' prop is defined here, it is not used in the component.
  // Consider removing or using it as needed.
  match: PropTypes.object
};

export default Single;

