import { createChart, ColorType } from "lightweight-charts";
import React, { useEffect, useState } from "react";
import QueryApp from "./QueryApp";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

export default function App(props) {
  const [stateExpirations, setExpirations] = useState([]);

  const firstIndex = 200;
  const adder = 100;

  useEffect(() => {
    fetch("http://localhost:3000/expirations")
      .then((response) => response.json())
      .then((expirations) => {
        setExpirations(
          expirations.expirations.map((expiration) =>
            expiration.substring(0, 10)
          )
        );
      });
  }, []);

  return (
    <>
      {stateExpirations.map((expiration) => (
        <button>
          <Link
            to={{ pathname: "/strike", search: `?expiration=${expiration}` }}
          >
            {expiration}
          </Link>
        </button>
      ))}
    </>
  );
}
