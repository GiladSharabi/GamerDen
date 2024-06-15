import { useState, useEffect } from "react";
import { TextField, Chip } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import { Game } from "../../api/types";
import { getGames } from "../../api/api.endpoints";

type props = {
  selectedGames?: Game[];
  onChange: (newGame: Game | undefined) => void;
};

const GameSelector = ({ selectedGames = [], onChange }: props) => {
  const [allGames, setAllGames] = useState<Game[]>([]);
  const [gamesList, setGamesList] = useState<Game[]>([]);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        setAllGames(await getGames());
        setGamesList(await getGames());
        // setGamesList(gamesList.filter((game) => game.name !== selectedGame)); // remove the selected game from the gameList
        // const games: Game[] = await getGames();
        // const names: string[] = games.map(({ name }) => name);
        // setGamesList(names.filter((name) => !selectedGames.includes(name)));
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
      onChange(theGame); // add the game to selectedGames
      setGamesList(gamesList.filter((game) => game.name !== selectedGame)); // remove the selected game from the gameList
    }
  };

  const handleRemove = (removedGame: string) => {
    // console.log("the Game: " + removedGame);
    const theGame: Game | undefined = allGames.find(
      (game) => game.name === removedGame
    );
    if (theGame) {
      console.log("the Game: " + theGame);
      onChange(theGame); // delete the game from the selectedGames
      setGamesList([...gamesList, theGame]); // add the removed game (from selectedGames) to the gameList
    }
  };

  return (
    <div className="mb-2">
      <Autocomplete
        id="game"
        options={gamesList.map((game) => game.name)}
        freeSolo
        renderInput={(params) => <TextField {...params} label="Select Game" />}
        onChange={(event, value) => value && handleAdd(value)}
      />
      <div>
        {selectedGames.map((game) => (
          <Chip
            key={game.name}
            label={game.name}
            onDelete={(event) => {
              handleRemove(game.name);
            }}
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
