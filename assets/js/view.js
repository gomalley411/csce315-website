/////////////////////////////////////////////////////////////////////////////////
//Author: George O'Malley
//Purpose: Controls the View of an MVC blackjack game
/////////////////////////////////////////////////////////////////////////////////
//view.js
//addMessage(msg) – adds a given text (msg) to the message div.
function addMessage(msg) {
    console.log("in addMessage");
    var messageDiv = document.getElementById("messages");
    if (messageDiv !== null)
        messageDiv.innerHTML += msg+"<br>";
    messageDiv.scrollTop = messageDiv.scrollHeight;
};

//clearMessages – Removes all messages from the message div.
function clearMessages() {
    console.log("in clearMessages");
    var messageDiv = document.getElementById("messages");
    messageDiv.innerHTML == "<br>";
    messageDiv.scrollTop = messageDiv.scrollHeight;
};

//show a div given the div's ID
function showDiv(divID) {
    console.log("in showDiv");
    var userDiv = document.getElementById(divID);
    if (userDiv !== null)
        userDiv.style.display = "block";
};
//hide a div given the div's ID
function hideDiv(divID) {
    console.log("in hideDiv");
    var userDiv = document.getElementById(divID);
    if (userDiv !== null)
            userDiv.style.display = "none";

};

//check if a class has a given class
function hasClass(element, className) {
    console.log("in hasClass");
    return element.classList.contains(className);
};

//adds a given class to an element if it does not have the class. Does nothing otherwise.
function addClass(element, className) {
    console.log("in addClass");
    if (element.classList)	//if element has a class list
        {
            console.log("element has class list, adding class " + className);
            element.classList.add(className);
        }	//add class
    else if (!hasClass(element, className))	//else check if it doesn't have the class
        {
            console.log("element does not have class list, adding class " + className);
            element.className += " " + className;
        }
};
//removeClass(element, className) – removes a given class from an element if the class has it. Does nothing otherwise.
function removeClass(element, className) {
    console.log("in removeClass");
    if (element.classList)
        element.classList.remove(className);
};
// adds text from the URL to the given element
function setUsername(username) {
    console.log("in setUsername(" + username + ")");
    var messageDiv = document.getElementById("userName");
    messageDiv.innerHTML += "<h2>Hello " + username + "!</h2>";
};

// resets the game board
function resetView() {
    var dHand = document.getElementById("dealerhand");
    var pHand = document.getElementById("playercards");
    dHand.innerHTML = "<div id = \"dealerhand\"></div><div id = \"dealerscore\"></div><br>";
    pHand.innerHTML = "<!--player's cards--><p>Your hand</p><div id = \"hand\"> <!--JS will put cards here--></div>";

    document.getElementById('messages').innerHTML = "";
    document.getElementById('score').innerHTML = '<p> You have 0 points.</p>';
    document.getElementById("gamebuttons").style.display='block';
};

// shows a dealt card for a given player -- user or dealer
// with a boolean on whether to face the card down or not
function showDealtCard(faceup) {
    var numCards = gamePlay.Blackjack.player.userhand.cards.length;
    if (faceup === true)
        document.getElementById('playercards').innerHTML = document.getElementById('playercards').innerHTML +
        '<div class="card_deck" id=' + gamePlay.Blackjack.player.userhand.cards[numCards-1].suit + gamePlay.Blackjack.player.userhand.cards[numCards-1].rank +'></div>';
    else {
        document.getElementById('playercards').innerHTML = document.getElementById('playercards').innerHTML +
        '<div class="card_deck" id="facedown"></div>';
    }
};

// shows a dealt card for a given player -- user or dealer
// with a boolean on whether to face the card down or not
function showDealtCardDealer(faceup) {
    var numDealerCards = gamePlay.Blackjack.dealer.cards.length;
    if (faceup === true)
        document.getElementById('dealerhand').innerHTML = document.getElementById('dealerhand').innerHTML + '<div class="card_deck" id=' + gamePlay.Blackjack.dealer.cards[numDealerCards-1].suit + gamePlay.Blackjack.dealer.cards[numDealerCards-1].rank +'></div>';
    else {
        document.getElementById('dealerhand').innerHTML = document.getElementById('dealerhand').innerHTML + '<div class="card_deck" id="facedown"></div>';
    }
};

// flips dealer's card over so user can see it after round is over
function flipCard() {
    console.log("flipping card");
    var numDealerCards = gamePlay.Blackjack.dealer.cards.length;
    document.getElementById('facedown').innerHTML = document.getElementById('facedown').innerHTML.replace('<div class="card_deck" id=' + gamePlay.Blackjack.dealer.cards[numDealerCards-1].suit + gamePlay.Blackjack.dealer.cards[numDealerCards-1].rank +'></div>');
};

// adjusts the user's score
function showScore(s) {
    document.getElementById('score').innerHTML = '<p> You have ' + s + ' points.</p>';

};

// shows dealer's score
function showDealerScore(s) {
    document.getElementById('dealerscore').innerHTML = '<p> The dealer has ' + s + ' points.</p>';
};

// updates the view based on changes to setting the bet value
function updateBet(bet) {
    document.getElementById("betamt").innerHTML = "<p>Current bet amount: $" + bet + "</p>";
};

function updateWallet(amt) {
    document.getElementById("walletinfo").innerHTML = "<p>You have $" + amt + " in your wallet</p>";
};

$(document).ready(function() {
    $("button").click(function() {
        $("div1").fadeOut();
    });
});
