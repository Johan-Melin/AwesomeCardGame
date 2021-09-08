import React, {useEffect, useState} from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
const axios = require('axios');

const CardArea = () => {
    const [score, setScore] = useState(0);
    const [cards, setCards] = useState({});
    const [cardImage, setCardImage] = useState(null);

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
        setCardImage(response.data.cards[0].image);

      })
      .catch(function (error) {
        console.log(error);
      });
    }

    const guessHigher = () => {
        drawCard();
    }
    
    const guessLower = () => {
        drawCard();
    }

    const renderImage = () => {
        const imgSource=cardImage;
        return (
            <Image
                style={{width: 200, height: 200}}
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
