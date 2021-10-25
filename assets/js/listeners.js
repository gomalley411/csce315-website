/////////////////////////////////////////////////////////////////////////////////
//Author: George O'Malley
//Purpose: Controls the listeners of an MVC blackjack game
/////////////////////////////////////////////////////////////////////////////////
//listeners.js

// these are just variables to increase code readability

document.getElementById("hit").addEventListener('click', function() {hitActivated()});
function hitActivated() {   // resets score when hit button is clicked after deal button
        console.log("hit button clicked");

        c = gamePlay.Blackjack.carddeck.deck.shift();
        gamePlay.Blackjack.player.userhand.addCard(c);
        showScore(gamePlay.Blackjack.player.userhand.score);
        gamePlay.isGameOver();
        hideDiv("betbuttons");
};
document.getElementById("stay").addEventListener('click', function() {
    console.log("stay button clicked");
    document.getElementById("hit").style.display='list';
    document.getElementById("stay").style.display='list';

    // make dealer draw cards until their score is 16 or greater
    while (gamePlay.Blackjack.dealer.score < 16) {
        console.log("dealer score < 16");
        c = gamePlay.Blackjack.carddeck.dealCard();
        gamePlay.Blackjack.dealer.addCardDealer(c, true);
        gamePlay.isGameOver();
    }
    showDealerScore(gamePlay.Blackjack.dealer.score);
    flipCard();
    hideDiv("betbuttons");
});
document.getElementById("deal").addEventListener('click', function() {
    console.log("deal button clicked");
    gamePlay.Blackjack.deal();
    gamePlay.isGameOver();
    document.getElementById("hit").style.display='';
    document.getElementById("stay").style.display='';
    document.getElementById("deal").style.display='none';
    hideDiv("betbuttons");
});
document.getElementById("reset_game").addEventListener('click', function() {
    console.log("reset button hit");
    const bet = gamePlay.Blackjack.player.userBet;      // keeps track of bet and wallet
    const w = gamePlay.Blackjack.player.userWallet;
    gamePlay.reset();                                   // deletes the Blackjack object and replaces it with a new one
    gamePlay.Blackjack.player.userhand.reset();         // deletes the cards and score and resets them to default values
    gamePlay.Blackjack.dealer.reset();                  // same here
    showDealerScore(gamePlay.Blackjack.dealer.score);
    resetView();
    showDiv("betbuttons");
    document.getElementById("deal").style.display='';
});
document.getElementById("increasebet").addEventListener('click', function() {
    console.log("increasebet button hit");
    // increase bet by $100, check to see if wallet has enough first
    if (gamePlay.Blackjack.player.userWallet.cash >= gamePlay.Blackjack.player.userBet + 100)
        gamePlay.Blackjack.setBet(gamePlay.Blackjack.player.userBet + 100);
});
document.getElementById("decreasebet").addEventListener('click', function() {
    console.log("decreasebet button hit");
    if (gamePlay.Blackjack.player.userBet - 100 >= 0) gamePlay.Blackjack.setBet(gamePlay.Blackjack.player.userBet - 100);
});

