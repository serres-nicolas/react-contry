import React from "react";

// ici on recupere la props "country"
const Card = ({ country }) => {
  return (
    <li className="card">
      {/* img dynamique de la base de donnée */}
      <img
        src={country.flags.svg}
        alt={"drapeau" + country.translations.fra.common}
      />
      <div className="infos">
        {/* information dynamique recuperer de la base de donnée */}
        <h2>{country.translations.fra.common}</h2>
        <h4>{country.capital}</h4>
        <p>Pop. {country.population.toLocaleString()}</p>
        {/* toLocaleString est un séparateur de millier */}
      </div>
    </li>
  );
};

export default Card;
