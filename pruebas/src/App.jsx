import { useState, useEffect } from "react";
import "./App.css";
import { rickAndMortyData } from "./services/api";

function App() {
  const [personajes, setPersonajes] = useState([]);
  const [resultados, setResultados] = useState([]);
  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    setSearch(e.target.value);
    if (search === "") {
      setResultados(personajes);
    } else {
      const newResult = personajes.filter(
        (personaje) =>
          personaje.name.toLowerCase().includes(e.target.value.toLowerCase()) ||
          personaje.status.toLowerCase().includes(e.target.value.toLowerCase()) ||
          personaje.species.toLowerCase().includes(e.target.value.toLowerCase()) ||
          personaje.gender.toLowerCase().startsWith(e.target.value.toLowerCase())
      );
      setResultados(newResult);
    }
  };

  useEffect(() => {
    rickAndMortyData(setPersonajes);
  }, []);

  return (
    <>
      <h1>Rick and Morty</h1>
      <input
        type="text"
        placeholder="buscar perosnaje"
        onChange={handleSearch}
        value={search}
      />
      {
        <ul>
          {resultados.length > 0 ? (
            resultados.map((personaje) => {
              return (
                <li key={personaje.id}>
                  Nombre :{personaje.name} estado :{personaje.status} Especie:{" "}
                  {personaje.species} Genero: {personaje.gender}
                </li>
              );
            })
          ) : (
            <h2>No se encontraron personajes</h2>
          )}
        </ul>
      }
    </>
  );
}

export default App;
