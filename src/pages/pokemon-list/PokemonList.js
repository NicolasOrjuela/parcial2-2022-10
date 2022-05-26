import React, { useState, useEffect } from "react";
import "./PokemonList.scss";
import { FormattedMessage } from "react-intl";

export const PokemonList = () => {
  const localLang = navigator.language;

  const [pokemones, setPokemones] = useState([]);

  useEffect(() => {
    if (!navigator.onLine) {
      if (localStorage.getItem("pokemones") === null) {
        setPokemones("Loading...");
      } else {
        setPokemones(JSON.parse(localStorage.getItem("pokemones")));
      }
    } else {
      const URL =
        localLang === "es"
          ? "https://gist.githubusercontent.com/jhonatan89/e379fadf8ed0f5381a2d8f8f3dea90c3/raw/f8357c439bbb7b4bd3dc6e8807c52105fb137ec6/pokemon-es.json"
          : "https://gist.githubusercontent.com/jhonatan89/2089276d3ce0faceff8e55fc3459b818/raw/30ee1a77b3e328108faaaa9aaac6f2ddaa3d3711/pokemons-en.json";
      fetch(URL)
        .then((res) => res.json())
        .then((res) => {
          setPokemones(res);
          localStorage.setItem("pokemones", JSON.stringify(res));
        });
    }
  }, []);

  return (
    <>
      <div className="pokemon-container">
        <h1>Most Wanted Pokemons</h1>
        <table className="table">
          <thead className="table-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">
                  <FormattedMessage id="Image" />
              </th>
              <th scope="col">
                  <FormattedMessage id="Name" />
              </th>
              <th scope="col">
                  <FormattedMessage id="Description" />
              </th>
              <th scope="col">
                  <FormattedMessage id="Height" />
              </th>
              <th scope="col">
                  <FormattedMessage id="Weight" />
              </th>
              <th scope="col">
                  <FormattedMessage id="Type" />
              </th>
            </tr>
          </thead>
          <tbody>
            {pokemones.map((elm, index) => (
              <tr key={index}>
                <th>{elm.id}</th>
                <th>
                  <img
                    src={elm.ThumbnailImage}
                    alt={elm.ThumbnailAltText}
                    referrerPolicy="no-referrer"
                  ></img>
                </th>
                <td>{elm.name}</td>
                <td>{elm.description}</td>
                <td>{elm.height}</td>
                <td>{elm.weight}</td>
                <td>
                  {elm.type.map((tipo) => (
                    <span class="badge bg-secondary">{tipo}</span>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
