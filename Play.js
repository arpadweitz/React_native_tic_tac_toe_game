import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native';

function Square({ value, onSquarePress }) {
  return (
    <TouchableOpacity style={styles.square} onPress={onSquarePress}>
      <Text style={styles.squareText}>{value}</Text>
    </TouchableOpacity>
  );
}

function Board({ xIsNext, squares, onPlay }) {
  function handleClick(i) {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? 'X' : 'O';
    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }

  return (
    <View>
      <View style={styles.status}>
        <Text>{status}</Text>
      </View>
      <View style={styles.board}>
        {[0, 1, 2].map(row => (
          <View key={row} style={styles.boardRow}>
            {[0, 1, 2].map(col => (
              <Square
                key={col}
                value={squares[row * 3 + col]}
                onSquarePress={() => handleClick(row * 3 + col)}
              />
            ))}
          </View>
        ))}
      </View>
    </View>
  );
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => {
    const description = move > 0 ? 'Go to move #' + move : 'Go to game start';
    return (
      <TouchableOpacity key={move} onPress={() => jumpTo(move)}>
        <Text>{description}</Text>
      </TouchableOpacity>
    );
  });

  return (
    <View style={styles.game}>
      <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      <View style={styles.gameInfo}>
        <FlatList data={moves} renderItem={({ item }) => item} keyExtractor={(item, index) => index.toString()} />
      </View>
    </View>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

const styles = StyleSheet.create({
  game: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff8dc',
  },
  status: {
    marginBottom: 20,
  },
  board: {
    borderWidth: 1,
  },
  boardRow: {
    flexDirection: 'row',
  },
  square: {
    width: 80,
    height: 80,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  squareText: {
    fontSize: 60,
  },
  gameInfo: {
    marginTop: 20,
  },
});