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
                style={styles.cardStyle}
                source={{uri: imgSource}}
            />
        )
    }

    useEffect(() => {
        getCards();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Score: {score}</Text>
            <Text style={styles.text}>Cards remaining: {cards.remaining}</Text>
            {renderImage()}
            <View style={styles.btnRow}>
                <TouchableOpacity onPress={() => guessHigher()} style={styles.btn}>
                    <Text style={styles.btnText}>Higher</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => guessLower()} style={styles.btn}>
                    <Text style={styles.btnText}>Lower</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    text: {
        fontSize: 24
    },
    btnText: {
        fontSize: 18
    },
    cardStyle: {
        width: 226,
        height: 314
    },
    btnRow: {
        flexDirection: 'row',
    },
    btn: {
        backgroundColor: '#f0f0f0',
        borderWidth: 1,
        borderRadius: 5,
        margin: 5,
        padding: 5
    }
});

export default CardArea
