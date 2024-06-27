import { useState, useEffect } from "react";
import { TextField, Chip, Grid } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import { Game } from "../../api/types";
import { getGames } from "../../api/api.endpoints";

type props = {
  selectedGames: Game[];
  onChange: (newGame: Game) => void;
};

const GameSelector = ({ selectedGames = [], onChange }: props) => {
  const [allGames, setAllGames] = useState<Game[]>([]);
  const [gamesList, setGamesList] = useState<Game[]>([]);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        setAllGames(await getGames());
        setGamesList(await getGames());

      } catch (error) {
        console.error("Error fetching games:", error);
      }
    };
    fetchGames();
  }, []);

  const handleAdd = (selectedGame: string) => {
    const theGame: Game | undefined = gamesList.find(
      (game) => game.name === selectedGame
    );
    if (theGame) {
      onChange(theGame);
      setGamesList(gamesList.filter((game) => game.name !== selectedGame));
    }
  };

  const handleRemove = (selectedGame: string) => {
    const theGame: Game | undefined = allGames.find(
      (game) => game.name === selectedGame
    );
    if (theGame) {
      onChange(theGame);
      setGamesList([...gamesList, theGame]);
    }
  };

  return (
    <Grid className="mb-2">
      <Autocomplete
        id="game"
        options={gamesList.map((game) => game.name)}
        freeSolo
        renderInput={(params) => <TextField {...params} label="Select Game" />}
        onChange={(event, value) => value && handleAdd(value)}
      />
      <Grid className="mt-2">
        {selectedGames.map((game) => (
          <Chip
            key={game.name}
            label={game.name}
            onDelete={(event) => {
              handleRemove(game.name);
            }}
            variant="outlined"
            color="primary"
            style={{ margin: '2px' }}
          />
        ))}
      </Grid>
    </Grid>
  );
};

export default GameSelector;
