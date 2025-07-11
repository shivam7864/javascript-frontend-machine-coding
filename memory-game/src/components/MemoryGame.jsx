import React, { useState } from "react";

const data = ["😊", "❤️", "👍", "😁", "😎"];

const MemoryGame = () => {
  function prepareCards() {
    const array = [...data, ...data];

    let currentIndex = array.length;

    // While there remain elements to shuffle...
    while (currentIndex != 0) {
      // Pick a remaining element...
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }
    return array;
  }

  const [cards, setCards] = useState(prepareCards);
  const [firstClickIndex, setFirstClickIndex] = useState(null);
  const [secondClickIndex, setSecondClickIndex] = useState(null);
  const [turns, setTurns] = useState(0);
  const [matchingIndices, setMatchingIndices] = useState([]);
  console.log(cards);

  const handleClick = (index) => {
    if (firstClickIndex === null) {
      setFirstClickIndex(index);
      setTurns(turns + 1);
    } else {
      const firstValue = cards[firstClickIndex];
      const secondValue = cards[index];
      if (firstValue === secondValue) {
        setFirstClickIndex(null);
        const newWinning = [...matchingIndices, firstClickIndex, index];
        if (newWinning.length === cards.length) {
          alert("You won!");
          setCards(prepareCards());
          setFirstClickIndex(null);
          setSecondClickIndex(null);
          setMatchingIndices([]);
          setTurns(0);
        } else {
          setMatchingIndices(newWinning);
        }
      } else {
        setSecondClickIndex(index);
        setTurns(turns + 1);
        setTimeout(() => {
          setFirstClickIndex(null);
          setSecondClickIndex(null);
        }, 3000);
      }
    }
  };

  return (
    <div className="memory-game">
      {cards?.map((emoji, index) => {
        return (
          <div
            className="card"
            key={index}
            onClick={() => {
              handleClick(index);
            }}
            data-active={matchingIndices.includes(index)}
            data-toggle={
              index === firstClickIndex || index === secondClickIndex
            }
            data-disabled={index === firstClickIndex}
            data-disable-all={
              firstClickIndex !== null && secondClickIndex !== null
            }
          >
            <div className="front"></div>
            <div className="back">{emoji}</div>
          </div>
        );
      })}
      <div className="turns">
        <span>Turns {turns}</span>
        <button
          onClick={() => {
            setCards(prepareCards());
            setFirstClickIndex(null);
            setSecondClickIndex(null);
            setTurns(0);
          }}
        >
          Restart Game
        </button>
      </div>
    </div>
  );
};

export default MemoryGame;
