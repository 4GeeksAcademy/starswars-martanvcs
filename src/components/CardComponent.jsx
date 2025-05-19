
import React, { useContext } from "react";

import { Link } from "react-router-dom";

const CardComponent = ({ title, uid, type }) => {
    const { actions } = useContext(Context);

    const imageUrl = `https://starwars-visualguide.com/assets/img/${type === "people" ? "characters" : type}/${uid}.jpg`;

    const handleImageError = (e) => {
        e.target.src = "https://starwars-visualguide.com/assets/img/big-placeholder.jpg";
    };

    return (
        <div className="card mx-2" style={{ minWidth: "18rem" }}>
            <img
                src={imageUrl}
                className="card-img-top"
                alt={title}
                onError={handleImageError}
            />
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <Link to={`/${type}/${uid}`} className="btn btn-outline-primary">
                    Learn more
                </Link>
                <button
                    className="btn btn-outline-warning ms-2"
                    onClick={() => actions.addToFavorites(title)}
                >
                    <i className="far fa-heart"></i>
                </button>
            </div>
        </div>
    );
};

export default CardComponent;
