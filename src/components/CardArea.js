import React, {useEffect, useState} from 'react'
import { StyleSheet, Text, View } from 'react-native'
const axios = require('axios');

const CardArea = () => {
    const [cards, setCards] = useState({});

    function getCards(){
        console.log("getCards")
        const cardUrl = 'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1';
        axios.get(cardUrl)
      .then(function (response) {
        setCards(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
    }
    
    useEffect(() => {
        getCards();
    }, []);
        return (
        <View>
            <Text>Cards remaining: {cards.remaining}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
});

export default CardArea
