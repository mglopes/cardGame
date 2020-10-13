import React from "react";
import "./Card.css";

const Card = ({ onClick, styles }) => (
    <div className={"card " + styles} onClick={onClick}></div>
);

export default Card;
