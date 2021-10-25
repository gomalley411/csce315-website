/////////////////////////////////////////////////////////////////////////////////
//Author: George O'Malley
//Purpose: Create a blackjack game using objects and an MVC design
/////////////////////////////////////////////////////////////////////////////////
//app.js
var gamePlay = {
    Blackjack: Object.create(blackjack),
    getUsername: function() {
        let myURL = window.location.search;
        console.log(myURL);
        const myArr = myURL.split("=");
        console.log("Username is " + myArr[myArr.length-1]);
        return myArr[myArr.length-1];
    },
    playGame: function() {
        this.Blackjack.initialize();
    },
    isGameOver: function() {
        if (gamePlay.Blackjack.didPlayerBust() || gamePlay.Blackjack.didDealerGetTwentyOne()) {
            // addMsg is not a function error... why? view.js is loaded before listeners.js
            addMessage("<img src=\"assets\\img\\you lose good day sir.png\" height=\"25%\" width=\"25%\"");
            // not sure how to make this link back to the source I got that image from,
            // but here it is: http://www.quickmeme.com/meme/3pxb8o
            document.getElementById("gamebuttons").style.display='none';
            // user loses their bet, so adjust wallet
            gamePlay.Blackjack.player.userWallet.setCash(gamePlay.Blackjack.player.userWallet.cash - gamePlay.Blackjack.player.userBet);
            if (gamePlay.Blackjack.player.userWallet.cash < 0) gamePlay.Blackjack.player.userWallet.setCash(0);
            updateWallet(gamePlay.Blackjack.player.userWallet.cash);
            return true;
        }
        else if (gamePlay.Blackjack.didPlayerGetTwentyOne() || gamePlay.Blackjack.didDealerBust() || gamePlay.Blackjack.doesPlayerHaveMorePoints()) {
            addMessage("<winmsg>You win!</winmsg>");
            document.getElementById("gamebuttons").style.display='none';
            // user wins their bet, so adjust wallet
            gamePlay.Blackjack.player.userWallet.setCash(gamePlay.Blackjack.player.userWallet.cash + gamePlay.Blackjack.player.userBet);
            updateWallet(gamePlay.Blackjack.player.userWallet.cash);
            return true;
        }
        return false;

    },
    reset: function() {
        // reset game board -- that is, reset the view
        // then reset the message div
        console.log("in reset");
        delete this.Blackjack;
        this.Blackjack = Object.create(blackjack);
        console.log("deleted this.Blackjack and made a new one");
    },

};

// just in case the function in gamePlay doesn't work...
function getName() {
    let myURL = window.location.search;
    console.log(myURL);
    const myArr = myURL.split("=");
    console.log("Username is " + myArr[myArr.length-1]);
    return myArr[myArr.length-1];
};

gamePlay.playGame();
