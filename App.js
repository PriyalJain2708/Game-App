import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import Header from './components/Header';
import { StatusBar } from 'expo-status-bar';
import StartGameScreen from './screens/StartGameScreen';
import GameScreen from './screens/GameScreen';
import GameOverScreen from './screens/GameOverScreen';

export default function App() {
  const [userNumber, setUserNumber ] = useState ();
  const [guessRounds, setGuessRounds] = useState(0);

  const configureNewGameHandler = () => {
    setUserNumber(null);
    setGuessRounds(0);
  };

  const startGameHandler = (selectedNumber) => {
    setUserNumber(selectedNumber);
  };

  const gameOverHandler = numOfRounds => {
    setGuessRounds(numOfRounds); //passing the execution of rounds to guess our number
  }

  let content = <StartGameScreen onStartGame={startGameHandler} />;

  if(userNumber && guessRounds <= 0){             // game is definitely starting
    content = <GameScreen userChoice={userNumber} onGameOver={gameOverHandler} />;
  }
  else if (guessRounds > 0){
    content = (
    <GameOverScreen roundsNumber = {guessRounds} 
    userNumber = {userNumber} onRestart = {configureNewGameHandler} />
  );
  }

  return (
    <View style={styles.screen}>
      <Header title="Guess a Number" />
      {content} 
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1

  }

});
