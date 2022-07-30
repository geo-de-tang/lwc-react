import * as React from "react";
import { Link, useLocation } from "react-router-dom";
const { useEffect, useState } = React;

// A custom hook that builds on useLocation to parse
// the query string for you.
function useQuery() {
    const { search } = useLocation();
  
    return React.useMemo(() => new URLSearchParams(search), [search]);
  }
  

export function Strike(props) {
  const [strikes, setStrikes] = useState([]);

  const query = useQuery();
  console.log(query.get("expiration"));

  const firstIndex = 200;
  const adder = 100;

  useEffect(() => {
    fetch(`http://localhost:3000/strikes?expiration=${query.get("expiration")}`)
      .then((response) => response.json())
      .then((strikes) => {
        setStrikes(strikes.strikes);
      });
  }, []);

  return (
    <>
      {strikes.map((strike) => (
        <button>
          <Link to="/">{strike}</Link>
        </button>
      ))}
    </>
  );
}
