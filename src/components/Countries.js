import axios from "axios";
import React, { useEffect, useState } from "react";
import Card from "./Card";

const Countries = () => {
  // je crée une variable data et je la modifie grace à la seconde variable setData
  const [data, setData] = useState([]);
  // la seul facon de changer la valeur de rangeValue que l'on va couper c'est avec setRangeValue, on prend 36.
  const [rangeValue, setRangeValue] = useState(36);
  // la radio selectionner change de valeur pour sa on ajoute un set
  const [selectedRadio, setSelectedRadio] = useState("");
  // on se fait une base de donnée pour nos contient dans notre menu radio
  const radios = ["Africa", "America", "Asia", "Europe", "Oceania"];

  // Le useEffect se joue lorsque le composant est monté lui permettant de ne pas le rejoué à l'infini c'est un HOOK
  useEffect(() => {
    // Axios est une technologie qui permet de faire des fetch
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((res) => setData(res.data));
  }, []);
  //"[]" c'est le callback
  return (
    // on cree la barre variable du nombre de pays
    <div className="countries">
      <ul className="radio-container">
        <input
          type="range"
          min="1"
          max="250"
          // sa valeur par default sera egale a sa rangeValue
          defaultValue={rangeValue}
          // on ajoute un évenement pour lui dire a chaque changement tu vas changer ta valeur
          onChange={(e) => setRangeValue(e.target.value)}
        />
        {/* on fait du javascript pour faire une map de notre base de donnée  */}
        {radios.map((continent) => (
          <li>
            <input
              type="radio"
              //  on connecte l'id avec le htmlFor
              id={continent}
              name="continentRadio"
              // est ce que continent est égal à selectedRadio
              checked={continent === selectedRadio}
              // on stock le nom du continent que l'utilisateur veut voir grace au Usestate
              onChange={(e) => setSelectedRadio(e.target.id)}
            />
            {/* on connecte l'id avec le htmlFor */}
            <label htmlFor={continent}>{continent}</label>
          </li>
        ))}
      </ul>
      {/* si selected est true alors tu m affiches annuler la recherche */}
      {selectedRadio && (
        // tu me crée un bouton pour annuler la recherche car selectedradio est devenu true via le Usestate,
        // on lui ajoute lorsque l'on clique dessus tu nous remet setselectedradio a false et donc tu disparais
        <button onClick={() => setSelectedRadio("")}>
          Annuler la recherche
        </button>
      )}
      {/* on appel nos données que l'on filtre, trie, coupe, et map */}
      <ul>
        {data
          // est ce que country.continent[0] inclue le selecteur radio ? ils vont passer le filtre et se retrouver au trie
          .filter((country) => country.continents[0].includes(selectedRadio))
          // on classe les pays du plus peupler au moins peupler b - a trie en décroissant
          .sort((a, b) => b.population - a.population)
          // slice permet de couper de 0 à rangeValue pour avoir une valeur dynamique
          .slice(0, rangeValue)
          // map va me lister x fois mon composant card
          .map((country, index) => (
            <Card key={index} country={country} /> //country est la props qui transmet la donnée du parent Ici à l'enfant Card
          ))}
      </ul>
    </div>
  );
};

export default Countries;
