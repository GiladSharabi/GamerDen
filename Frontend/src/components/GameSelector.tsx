import { useState, useEffect } from "react";
import Select from "react-select";
import { Game } from "../api/types";
import { getGames } from "../api/api.endpoints";
import "../css/LoggedHomePage.css";

const GameSelector = () => {
  const [gamesList, setGamesList] = useState<string[]>([]);
  const [selectedGame, setSelectedGame] = useState<{ value: string; label: string } | null>(null);
  const [selectedGames, setSelectedGames] = useState<string[]>([]);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const games: Game[] = await getGames();
        const names: string[] = games.map(({ name }) => name);
        setGamesList(names.filter(name => !selectedGames.includes(name))); // Filter out selected games from names list
      } catch (error) {
        console.error("Error fetching games:", error);
      }
    };

    fetchGames();
  }, [selectedGames]); // Include selectedGames in the dependency array to re-fetch games when selection changes

  const handleChange = (selectedOption: { value: string; label: string } | null) => {
    setSelectedGame(selectedOption);
    if (selectedOption) {
      setSelectedGames([...selectedGames, selectedOption.value]);
      setSelectedGame(null);
    }
  };

  const handleRemove = (game: string) => {
    setSelectedGames(selectedGames.filter((g) => g !== game));
    setGamesList([...gamesList, game]); // Add removed game back to names list
  };

  const options = gamesList.map((game) => ({
    value: game,
    label: game,
  }));

  return (
    <div className="search-input">
      <Select
        id="game"
        name="game"
        value={selectedGame}
        className="rounded mb-3"
        onChange={handleChange}
        options={options}
        placeholder="Select Game"
        isClearable
      />
      <div className="selected-games-container">
        {selectedGames.map((game) => (
          <button key={game} className="btn btn-primary me-2 mb-2 selected-game-button">
            {game}
            <span className="ms-2" onClick={() => handleRemove(game)}>x</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default GameSelector;
