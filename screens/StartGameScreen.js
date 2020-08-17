import React, { useState} from 'react';
import { View, Text, StyleSheet, Button, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';

import Card from '../components/Card';
import Colors from '../constants/color';
import Input from '../components/Input';
import NumberContainer from '../components/NumberContainer';

const StartGameScreen = props => {
    const [enteredValue, setEnteredValue] = useState('');       //To pass & store the input value
    const [cofirmed, setConfirmed] = useState(false);           //Confirm button to check confirmation
    const [selectedNumber, setSelectedNumber] = useState('');   //To validate the no after we press  the Confirm button

    const numberInputHandler = inputText => {
        setEnteredValue(inputText.replace(/[^0-9]/g, ' '));
    };

    const resetInputHandler = () => {
        setEnteredValue(' ');
        setConfirmed(false);
    };

    const confirmInputHandler = () => {
        const choosenNumber = parseInt(enteredValue);
        if( isNaN(choosenNumber) || choosenNumber <= 0 || choosenNumber >  99 ){
            Alert.alert('Invalid No!', 'No should be between 1 to 99',
            [{text: 'Okay', style: 'destructive', onPress: resetInputHandler }]
            )
            return;
        }
    setConfirmed(true);
    setEnteredValue(' ');
    setSelectedNumber(choosenNumber);
    Keyboard.dismiss();
    };

    let confirmedOutput; 
    if(cofirmed) { 
        confirmedOutput = (
        <Card style = {styles.summary}>
            <Text>You selected</Text>
            <NumberContainer>{selectedNumber}</NumberContainer>
            
                 <Button  title = "START GAME" color= {Colors.primary} 
                 onPress = {() =>props.onStartGame(selectedNumber)} />
            
        </Card>
        );
    }

    return ( 
    <TouchableWithoutFeedback onPress = { () => {
        Keyboard.dismiss();
    } }> 
        <View style={styles.screens2}>
            <Text style = {styles.title}>Start a New Game !</Text>
            <Card style = {styles.inputContainer}>
            <Text>Select a Number</Text>
             <Input style={styles.Input} blurOnSubmit 
                autoCapitalize ="none" 
                autoCorrect ={false}
                keyboardType ="number-pad" 
                maxLength={2}
                onChangeText = {numberInputHandler}
                value = {enteredValue} 
            />
                <View style = {styles.ButtonContainer}>
                   <View style = {styles.button}> 
                   <Button title = "Reset" onPress={resetInputHandler} color= {Colors.accent}/>
                   </View>
                   <View style = {styles.button}> 
                   <Button title = "Confirm" onPress={confirmInputHandler} color= {Colors.primary} />
                   </View>
               </View>
         </Card>
        {confirmedOutput}
        </View>
    </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    screens2: {
        flex: 1,
        padding: 10,
        alignItems: 'center'
    },
    ButtonContainer:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        paddingHorizontal: 15
   
    },
    title: {
        fontSize: 20,
        marginVertical: 10,
        marginHorizontal: 70 //mahima style
    },
    inputContainer: {
        width: 300,
        maxWidth: '80%',
        alignItems: 'center',
    },
    button: {
        marginVertical: 11, //mahima style
        width: 90
    },
    Input: {
        width: 50,
        textAlign: 'center',
        },
    summary: {
        marginTop: 50,
        alignItems: 'center'
    }

   
});

export default StartGameScreen;