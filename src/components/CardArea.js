import React, {useEffect, useState} from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
const axios = require('axios');

const CardArea = () => {
    const [score, setScore] = useState(0);
    const [cards, setCards] = useState({});
    const [currentCard, setCurrentCard] = useState(null);
    const [cardImage, setCardImage] = useState(null);
    const [guess, setGuess] = useState(null);

    function getCards(){
        const cardUrl = 'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1';
        axios.get(cardUrl)
      .then(function (response) {
        setCards(response.data);
      })
      .catch(function (error) {
        console.log(error);
      }).then(drawCard());
    }

    const drawCard = () => {
        const cardUrl = `https://deckofcardsapi.com/api/deck/${cards.deck_id}/draw/?count=1`;
        axios.get(cardUrl)
      .then(function (response) {
        setCards(response.data);
        setCurrentCard(response.data.cards[0]);
        setCardImage(response.data.cards[0].image);
        if((guess === "high" && (response.data.cards[0]?.value > currentCard.value))
        || (guess === "low" && (response.data.cards[0]?.value < currentCard.value))){
            setScore(currentScore => currentScore + 1);
        }
        console.log(response.data.cards[0].value);
      })
      .catch(function (error) {
        console.log(error);
      });
    }

    const guessHigher = () => {
        setGuess("high");
        drawCard();
    }
    
    const guessLower = () => {
        setGuess("low");
        drawCard();
    }

    const renderImage = () => {
        const imgSource=cardImage;
        return (
            <Image
                style={{width: 226, height: 314}}
                source={{uri: imgSource}}
            />
        )
    }

    useEffect(() => {
        getCards();
    }, []);

    return (
        <View>
            <Text>Score: {score}</Text>
            <Text>Cards remaining: {cards.remaining}</Text>
            {renderImage()}
            <TouchableOpacity onPress={() => guessHigher()}>
                <Text>Higher</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => guessLower()}>
                <Text>Lower</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
});

export default CardArea
