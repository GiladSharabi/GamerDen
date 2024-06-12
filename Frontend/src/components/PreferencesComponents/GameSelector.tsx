import { useState, useEffect } from "react";
import { TextField, Chip } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import { Game } from "../../api/types";
import { getGames } from "../../api/api.endpoints";

const GameSelector = () => {
  const [gamesList, setGamesList] = useState<string[]>([]);
  const [selectedGames, setSelectedGames] = useState<string[]>([]);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const games: Game[] = await getGames();
        const names: string[] = games.map(({ name }) => name);
        setGamesList(names.filter((name) => !selectedGames.includes(name)));
      } catch (error) {
        console.error("Error fetching games:", error);
      }
    };

    fetchGames();
  }, []);

  const handleAdd = (game: string) => {
    if (gamesList.includes(game)) {
      setSelectedGames([...selectedGames, game]);
      setGamesList(gamesList.filter((g) => g !== game));
    }
  };

  const handleRemove = (game: string) => {
    setSelectedGames(selectedGames.filter((g) => g !== game));
    setGamesList([...gamesList, game]);
  };

  return (
    <div className="mb-2">
      <Autocomplete
        id="game"
        options={gamesList}
        freeSolo
        renderInput={(params) => <TextField {...params} label="Select Game" />}
        onChange={(event, value) => value && handleAdd(value)}
      />
      <div>
        {selectedGames.map((game) => (
          <Chip
            key={game}
            label={game}
            onDelete={() => handleRemove(game)}
            variant="outlined"
            color="primary"
            sx={{
              margin: "0.5rem 0",
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default GameSelector;
