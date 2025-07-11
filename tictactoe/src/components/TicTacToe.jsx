import React, { useState } from "react";
import useTicTacToe from "../hooks/useTicTacToe";

const Player = {
  A: 0,
  B: 1,
};

const PlayerIcon = {
  [Player.A]: "X",
  [Player.B]: "O",
};

const TicTacToe = () => {
  const buttons = Array.from(new Array(9));

  const { handleRestart, handleTurn, message, playerTurns, activePlayer } =
    useTicTacToe();

  return (
    <div className="tic-tac-toe">
      {buttons.map((_, index) => {
        const otherPlayer = activePlayer === Player.A ? Player.B : Player.A;
        const playerATurn = playerTurns[activePlayer];
        const playerBTurn = playerTurns[otherPlayer];
        let icon = "";
        if (playerATurn.join("").includes(String(index))) {
          icon = PlayerIcon[activePlayer];
        } else if (playerBTurn.join("").includes(String(index))) {
          icon = PlayerIcon[otherPlayer];
        }
        return (
          <div>
            <button className="button" onClick={handleTurn(index)}>
              {icon}
            </button>
          </div>
        );
      })}
      {!!message && (
        <div className="message">
          <h4>{message}</h4>
          <button onClick={handleRestart}>Restart</button>
        </div>
      )}
    </div>
  );
};

export default TicTacToe;
