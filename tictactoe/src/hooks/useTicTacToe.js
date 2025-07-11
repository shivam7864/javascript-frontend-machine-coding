import { useState } from "react";

const Player = {
  A: 0,
  B: 1,
};

const PlayerIcon = {
  [Player.A]: "X",
  [Player.B]: "0",
};

const DefaultTurns = {
  [Player.A]: [],
  [Player.B]: [],
};
const WinningPatterns = [
  "012",
  "345",
  "678",
  "036",
  "147",
  "258",
  "048",
  "246",
];
const useTicTacToe = () => {
  const [activePlayer, setActivePlayer] = useState(Player.A);
  const [playerTurns, setPlayerTurns] = useState(structuredClone(DefaultTurns));
  const [message, setMessage] = useState("");

  const handleTurn = (index) => {
    return () => {
      const newPlayer = activePlayer === Player.A ? Player.B : Player.A;
      const playerATurn = playerTurns[Player.A];
      const playerBTurn = playerTurns[Player.B];
      if (playerATurn.join("").includes(String(index))) {
        return;
      } else if (playerBTurn.join("").includes(String(index))) {
        return;
      }
      const oldPlayerTurns = structuredClone(playerTurns);
      oldPlayerTurns[activePlayer].push(String(index));

      const isWon = isPlayerWon(oldPlayerTurns[activePlayer]);
      if (isWon) {
        setMessage(`Player ${activePlayer} Won the Game`);
      }
      setPlayerTurns(oldPlayerTurns);
      setActivePlayer(newPlayer);
    };
  };

  const isPlayerWon = (turns) => {
    const turnsInStr = turns.sort().join("");
    const isWon = WinningPatterns.some((t) => moreStrict(t, turnsInStr));
    return isWon;
  };

  const moreStrict = (singlePattern, turnsInStr) => {
    return singlePattern.split("").every((p) => turnsInStr.includes(p));
  };

  const handleRestart = () => {
    setActivePlayer(Player.A);
    setPlayerTurns(DefaultTurns);
    setMessage("");
  };

  return { handleRestart, handleTurn, message, playerTurns, activePlayer };
};

export default useTicTacToe;
