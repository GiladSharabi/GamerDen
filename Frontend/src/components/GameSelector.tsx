import { useEffect, useState } from "react";

const gamesList = [
  "Call Of Duty: Warzone",
  "Fortnite",
  "Counter-Strike Global Offensive 2",
  "Apex Legends",
  "Rocker League",
];

const GameSelector = () => {
  const [game, setGame] = useState<string>("");
  const handleChange = (e: any) => {
    setGame(e.target.value);
  };
  return (
    <div>
      <select
        id="game"
        name="game"
        value={game}
        className="rounded mb-3"
        onChange={handleChange}
      >
        <option value="">Select Game</option>
        {gamesList.map((game) => (
          <option key={game} value={game}>
            {game}
          </option>
        ))}
      </select>
    </div>
  );
};

export default GameSelector;
