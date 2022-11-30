import React from "react";
import useFetch from "../hooks/useFetch";

export default function MatchCard({ userId }) {
  const [data] = useFetch(
    `https://6374a94848dfab73a4e4fc2d.mockapi.io/kinder/${userId}`
  );

  return (
    <>
      {data && (
        <div
          className="matching-wrap flex"
          style={{
            border: "1px solid black",
            padding: "10px",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div className="matching-card-item">
            <h4>{`parent name: ${data?.parentName}`}</h4>
            <h4>{`child name: ${data?.childName}`}</h4>
            <h4>{`age: ${data?.childAge}`}</h4>
          </div>
          <div className="matching-card-item">
            <div
              className="logIcon"
              style={{ backgroundImage: `url(${data.avatar})` }}
            ></div>
          </div>
        </div>
      )}
    </>
  );
}
