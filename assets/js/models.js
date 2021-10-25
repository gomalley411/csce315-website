/////////////////////////////////////////////////////////////////////////////////
//Author: George O'Malley
//Purpose: Sets up the Models of an MVC blackjack game
/////////////////////////////////////////////////////////////////////////////////
//models.js
const suits = ["H","S","C","D"];	//allowable suits
const maxCardsPerSuit = 13;		//max cards per suit

var card = {
    rank:0,
    suit:"",
    //sets rank of card
    setRank: function (value) {
        //console.log("in setRank: setting rank to " + value);
        this.rank = value;
    },
    //gets rank of card
    getRank: function () {
        console.log("in getRank");
        return this.rank;
    },

    // gets suit
    getSuit: function() {
        console.log("in getSuit");
        return this.suit;
    },

    // sets suit
    setSuit: function(value) {
        //console.log("in setSuit: setting suit to " + value);
        this.suit = value;
    },

    // constructor
    Card: function (rank, suit) {
        console.log("in card constructor");
        this.rank = rank;
        this.suit = suit;
    }
};

var card_deck = {
    deck : [],
    DeckSize: 52,
    cardsLeft: 52,

    // constructor
    CardDeck: function() {
        console.log("in CardDeck constructor");
        this.deck = [];
        this.DeckSize = 52;
        this.cardsLeft = this.DeckSize;
    },

    // populates the deck array member with 52 cards -- four suits, 13 cards each
    initialize: function() {
        console.log("in card_deck:initialize()");
        for (let i = 1; i <= maxCardsPerSuit; i++) {
            for (let j=0; j < suits.length; j++) {
                var c = Object.create(card);
                c.setRank(i);
                c.setSuit(suits[j]);
                this.deck.push(c);
            }
        }
        this.shuffle();
    },

    getDeck: function() {
        console.log("in card_deck:getDeck");
        return this.deck;
    },

    // shuffles the deck
    shuffle: function() {
        console.log("in card_deck:shuffle");
        let a = card;
        let b = card;
        for (let i = 0; i < this.cardsLeft; i++) {
            let k = Math.floor(Math.random() * this.cardsLeft);
            let l = Math.floor(Math.random() * this.cardsLeft);
            // get the two cards to be switched, randomly

            // switch them
            //console.log("Switching deck items " + k + " and " + l);
            temp = this.deck[k];
            this.deck[k] = this.deck[l];
            this.deck[l] = temp;
        }
    },

    // gets number of cards left
    getCardsLeft: function() {
        console.log ("in card_deck:getCardsLeft");
        return this.cardsLeft;
    },

    // selects and then returns a card from the top of the deck
    // If there are less than 16 cards left, shuffle cards that are not in play
    // and then let the user know the cards are being shuffled
    dealCard: function() {
        console.log("in card_deck:dealCard");
        this.cardsLeft--;
        if (this.cardsLeft < 16) {
            console.log("Shuffling...");
            this.deck.shuffle();
        }
        let first = this.deck;

        return first.shift();
    },
};

var hand = {
    Hand: function() {
        console.log("in hand constructor");
        this.cards = 0;
        this.score = 0;
    },
    cards: [],
    score: 0,
    addCard: function(card) { // adds the card to the player's hand
        if (this.cards == 0) this.cards = [];
        console.log("in hand:addCard");
        //myDeck = Object.create(card_deck);
        //myDeck.initialize();
        this.cards.push(card);
        // remove the added card from the deck
        showDealtCard(true);
        this.getScore();
    },
    addCardDealer: function(card, bool) { // adds the card to the dealer's hand
        if (this.cards == 0) this.cards = [];
        this.score = 0;
        console.log("in hand:addCardDealer");
        this.cards.push(card);
        // remove the added card from the deck
        showDealtCardDealer(bool);
        this.getScore();
    },
    setScore: function(value) {
        console.log("in hand:setScore - setting score to " + value);
        this.score = value;
    },
    getScore: function() {
        console.log("in hand:getScore");
        // transverse the hand and add up values
        if (this.cards === 0) this.cards = [];
        var val = 0;
        const scoreInit = this.score;
        console.log("score is " + this.score);
        for (let i = 0; i < this.cards.length; i++) {
            // if the card is an ace
            if (this.cards[i].getRank() == 1) { // if the card is an ace
                console.log("value of new card is an ace");
                if (this.score + 11 <= 21) {         // if value of 11 would be less than or equal to 21
                    console.log("value of score + 11 <= 21 (" + this.cards[i].getSuit() + this.cards[i].getRank() + "). adding 11 to val.");
                    val += 11;
                }
                else if (this.score + 11 > 21) {     // if value of 11 would be greater than 21
                    console.log("value of score + 11 > 21 (" + this.cards[i].getSuit() + this.cards[i].getRank() + ") adding 1 to val.");
                    val += 1;
                }
            }
            else if (this.cards[i].getRank() > 10) {
                console.log("value of card is a king, queen or jack. adding 10 to val.");
                // if the card is a king, queen or jack
                val += 10;
            }
            else {
                // if the card is 2-10
                console.log("value of card is 2-10 (" + this.cards[i].getSuit() + this.cards[i].getRank() + "). adding " + this.cards[i].getRank() + " to val.");
                val += this.cards[i].rank;
            }

        }
        this.score += val - scoreInit;
        console.log("score is now " + this.score);
        if (blackjack.didPlayerBust() || blackjack.didPlayerGetTwentyOne() || blackjack.didDealerBust() || blackjack.didDealerGetTwentyOne() || blackjack.doesPlayerHaveMorePoints()) {

        }
    },
    reset: function() {
        console.log("in hand:reset");
        delete this.cards;
        delete this.score;
        this.cards = 0;
        this.score = 0;
    },
    getDeck: function() { // unsure if this function is needed, but good idea just in case
        return this.deck;
    },
};

var wallet = {
    cash: 0,
    Wallet: function() {
        console.log("in wallet constructor");
        this.cash = 0;
    },
    setCash: function(value) {
        console.log("in wallet:setCash(" + value + ")");
        this.cash = value;
    },
    getValue: function() {
    console.log("in wallet:getValue");
        return this.cash;
    },
    addValue: function(amount) {
        console.log("in wallet:addValue(" + amount + ")");
        this.cash += amount;
    },
    decrementValue: function(amount) {
        console.log("in wallet:decrementValue(" + amount + ")");
        this.cash -= amount;
    },
};

var user = {
    userhand: Object.create(hand),
    userBet: 0,
    userWallet: Object.create(wallet),
    User: function() {
        console.log("in user constructor");
        this.userBet = 0;
    },
    addCard: function(card) {
        console.log("in user:addCard");
        userhand.addCard(card); // deals the card and adds to hand
    },
    setUserBet: function(amount) {
        console.log("in user:setUserBet(" + amount + ")");
        this.userBet = amount;
    },
    initialize: function(amount) {
        console.log("in user:initialize");
        this.userWallet.setCash(1000);
        updateWallet(1000);
    },

};

var blackjack = {
    carddeck: Object.create(card_deck),
    dealer: Object.create(hand),
    player: Object.create(user),
    dealersHitLimit: 16,
    initialize: function() {
        // deck is already created
        this.carddeck.initialize();
        this.player.initialize();   // gets $$ ready
        this.setBet(0);
    },
    deal: function() {
        // deals a hand in a blackjack game
        console.log("adding face down card to dealer");
        this.dealer.addCardDealer(this.carddeck.dealCard(), false);
        console.log("adding face up card to dealer");
        while(this.dealer.score < 16) this.dealer.addCardDealer(this.carddeck.dealCard(), true);
        showDealerScore(this.dealer.score);
        console.log("adding cards to player");
        this.player.userhand.addCard(this.carddeck.dealCard(), true);
        showScore(this.player.userhand.score);

    },
    hit: function() {
        // deals a player a card as long as their score < 21
        if (this.player.score < 21) this.player.addCard();
    },
    setBet: function(amount) {
        this.player.setUserBet(amount);
        updateBet(amount);
    },
    didPlayerBust: function() {
        if (this.player.userhand.score > 21) return true;
        else {
            return false;
        }
    },
    didPlayerGetTwentyOne: function() {
        if (this.player.userhand.score == 21) return true;
        else {
            return false;
        }
    },
    didDealerBust: function () {
        if (this.dealer.score > 21) return true;
        else return false;
    },
    didDealerGetTwentyOne: function() {
        if (this.dealer.score == 21) return true;
        else return false;
    },

    // when you hit the stay button, dealer has enough cards and you have more points than them
    doesPlayerHaveMorePoints: function() {
        if (this.dealer.score >= 16 && this.dealer.score < 21) {
            if (this.player.userhand.score > this.dealer.score && this.player.userhand.score < 21) {
                return true;
            }
        }
        else return false;
    },
};


