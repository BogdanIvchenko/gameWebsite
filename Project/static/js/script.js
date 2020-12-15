function ageInDays() {
  var dateOfBirth = document.getElementById("datePicked").value;

  // LOGIC TO GET RESULT

  // Getting today's date for refference.
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  var yyyy = today.getFullYear();

  // Processing HTM input
  var DoBString = String(dateOfBirth);
  // Format: YYYY-MM-DD
  var year = Number(DoBString.substring(0, 4));
  var month = Number(DoBString.substring(5, 7));
  var day = Number(DoBString.substring(8, 10));

  //Calculations

  var ageInDaysValue = (yyyy - year) * 365;
  ageInDaysValue = ageInDaysValue + (mm - month) * 30;
  ageindays = ageInDaysValue + dd - day;

  //Displaying the result
  var h1 = document.createElement("h1");
  var textAnswer = document.createTextNode(
    "You are " + ageInDaysValue + " days old, bro!"
  );
  h1.setAttribute("id", "ageinDays");
  h1.appendChild(textAnswer);

  document.getElementById("resultOutput").appendChild(h1);

  // TODO:
  // Count prime years & the february's anomaly.
  // Make the new shit  printed stay in the same block.
}

function reset() {
  document.getElementById("ageinDays").remove();
}

function generateCat() {
  var image = document.createElement("img");
  var div = document.getElementById("flex-cat-gen");
  image.src =
    "http://thecatapi.com/api/images/get?format=src&type=gif&size=small";
  div.appendChild(image);
}

function removecat() {
  document.getElementById("flex-cat-gen").remove();
}

// TODO:
// fix a bug when removing all cats you can't re-add new cats
// Make cats different.
// Paly with the api and make a "size slider

function rpsGame(PlayerResponse) {
  //Processing Input
  var moves = getMoves(PlayerResponse);

  // Rock:    0
  // Paper:   1
  // Scisors: 2

  // Getting a winner
  var winner = getWinner(moves);

  // User:  0
  // Random:  1

  displayOutput(moves, winner);
}

function getMoves(usrMove) {
  // converting user input to a number
  if (usrMove.id == "rock") {
    usrMove = 0;
  } else if (usrMove.id == "paper") {
    usrMove = 1;
  } else if (usrMove.id == "scisors") {
    usrMove = 2;
  } else {
    return false;
  }

  // geting random number
  var randMove = Math.floor(Math.random() * 2.9);

  // It returns a JSON object with two numbers
  return { usrMove: usrMove, randMove: randMove };
}

function getWinner(moves) {
  // Rock:    0
  // Paper:   1
  // Scisors: 2

  // User:  0
  // Random:  1
  // Draw: 2

  //User wins
  if (moves.usrMove === 0 && moves.randMove === 2) {
    return 0;
  }
  if (moves.usrMove === 1 && moves.randMove === 0) {
    return 0;
  }
  if (moves.usrMove === 2 && moves.randMove === 1) {
    return 0;
  }

  //Random Wins
  if (moves.usrMove === 0 && moves.randMove === 1) {
    return 1;
  }
  if (moves.usrMove === 1 && moves.randMove === 2) {
    return 1;
  }
  if (moves.usrMove === 2 && moves.randMove === 0) {
    return 1;
  }

  //Draw
  return 2;
}

function displayOutput(moves, winner) {
  //returns JSON of message and message's color
  var finalMessage = createFinalMessage(winner);

  //getting sources for images to use images later
  var images = {
    rock: document.getElementById("rock").src,
    paper: document.getElementById("paper").src,
    scisors: document.getElementById("scisors").src,
  };

  //Removing previous elements
  document.getElementById("rock").remove();
  document.getElementById("paper").remove();
  document.getElementById("scisors").remove();

  //Making divs
  var userDiv = document.createElement("div");
  var resultDiv = document.createElement("div");
  var computerDiv = document.createElement("div");
  var resetButton = document.createElement("div");
  // Converting numbers to keys
  moves = convertNumbers2keys(moves);

  //Creating HTML Elements of output
  userDiv.innerHTML =
    "<img src='" +
    images[moves.usrMove] +
    "' height=150 width=150 style='box-shadow: 0px 10px 50px rgba(181, 69, 255, 0.7);' >";

  resultDiv.innerHTML =
    "<h2 style='color: " +
    finalMessage.color +
    "; font-size: 60px; padding: 0 , margin:0; '>" +
    finalMessage.message +
    "</h2>" +
    '<button class="btn btn-danger" onclick="location = location"> Reset </button>';

  computerDiv.innerHTML =
    "<img src='" +
    images[moves.randMove] +
    "' height=150 width=150 style='box-shadow: 0px 10px 50px rgba(181, 69, 255, 0.7);' >";

  //Appending Output to the flex-box
  document.getElementById("flex-box-rps-div").appendChild(userDiv);
  document.getElementById("flex-box-rps-div").appendChild(resultDiv);
  document.getElementById("flex-box-rps-div").appendChild(computerDiv);
}

function convertNumbers2keys(moves) {
  // Rock:    0
  // Paper:   1
  // Scisors: 2

  if (moves.usrMove === 0) {
    moves.usrMove = "rock";
  }
  if (moves.usrMove === 1) {
    moves.usrMove = "paper";
  }
  if (moves.usrMove === 2) {
    moves.usrMove = "scisors";
  }

  if (moves.randMove === 0) {
    moves.randMove = "rock";
  }
  if (moves.randMove === 1) {
    moves.randMove = "paper";
  }
  if (moves.randMove === 2) {
    moves.randMove = "scisors";
  }
  return moves;
}

function createFinalMessage(winner) {
  // Returns JSON of message and message's color
  // User:  0
  // Random:  1
  // Draw: 2

  switch (winner) {
    case 0:
      return { message: "You won!", color: "green" };
    case 1:
      return { message: "You lost!", color: "red" };
    case 2:
      return { message: "it's a tie!", color: "orange" };
  }
  return 0;
}

// Challange 4
// this piece of code records the initial state of
//buttons for reset so taht user can choosemultiple
// colors and still go back

// all buttons as html objects
var allButtons = document.getElementsByTagName("button");

// Storing classnames here
var buttonClasses = [];

for (let i = 0; i < allButtons.length; i++) {
  //.classlist[0] is just "btn"
  buttonClasses.push(allButtons[i].classList[1]);
}

//this function just extracts the value

function buttonCollorsSelector(color) {
  switch (color) {
    case "red":
      changeCollors("btn-danger");
      break;
    case "green":
      changeCollors("btn-success");
      break;
    case "blue":
      changeCollors("btn-primary");
      break;
    case "yellow":
      changeCollors("btn-warning");
      break;
    case "random":
      randomButtonColor();
      break;
    case "reset":
      resetButtons();
      break;
  }
}

function resetButtons() {
  for (let i = 0; i < allButtons.length; i++) {
    allButtons[i].classList.remove(allButtons[i].classList[1]);
    allButtons[i].classList.add(buttonClasses[i]);
  }
}

function changeCollors(buttonClass) {
  for (let i = 0; i < allButtons.length; i++) {
    allButtons[i].classList.remove(allButtons[i].classList[1]);
    allButtons[i].classList.add(buttonClass);
  }
}

function randomButtonColor() {
  var colors = ["btn-danger", "btn-success", "btn-primary", "btn-warning"];

  for (let i = 0; i < allButtons.length; i++) {
    allButtons[i].classList.remove(allButtons[i].classList[1]);
    var random = Math.floor(Math.random() * 4);
    allButtons[i].classList.add(colors[random]);
  }
}

let BJ = {
  player: {
    scoreSpan: "playerScore",
    div: "BJPlayerBox",
    score: 0,
    player: "player",
    busted: 0,
  },

  bot: {
    scoreSpan: "botScore",
    div: "BJBotBox",
    score: 0,
    player: "bot",
    busted: 0,
  },

  cards: {
    2: "2.png",
    3: "3.png",
    4: "4.png",
    5: "5.png",
    6: "6.png",
    7: "7.png",
    8: "8.png",
    9: "9.png",
    10: "10.png",
    11: "A.png",
    12: "J.png",
    13: "K.png",
    14: "Q.png",
  },
  gameStatus: 1,
  scores: {
    wins: 0,
    loses: 0,
    draws: 0,
  },
};

function bjhit(player) {
  console
    .log
    // "bjhit() gamestatus: " + BJ.gameStatus + " player: " + player.player
    ();
  //player playing
  if (player.player === "player" && BJ.gameStatus == 1) {
    if (player.score < 21) {
      // console.log("spawn1");
      spawncard(player);
    }

    if (player.score == 21) {
      player.score = player.score + 1;
      Bust();
    }
  }
  //bot playing
  else if (player.player === "bot" && player.score < 21) {
    // console.log("spawn2");
    spawncard(player);
  } else if (player.score == 21) {
    player.score = player.score + 1;
    Bust();
  }
}

function spawncard(player) {
  console
    .log
    // "spawncard gamestatus: " + BJ.gameStatus + " player: " + player.player
    ();
  console.log("asdf" + BJ.gameStatus);
  var random = Math.floor(Math.random() * 12 + 2);

  //generating a card
  var card = document.createElement("img");
  card.src = "./static/blackjack_assets/images/" + BJ.cards[random];
  document.getElementById(player.div).appendChild(card);

  if (random <= 10) {
    var score = random;
  } else if (random === 14) {
    if (player.score <= 11) {
      var score = 10;
    } else {
      var score = 1;
    }
  } else {
    var score = 10;
  }

  if (player.player == "player") {
    BJ.player.score = BJ.player.score + score;
  } else {
    BJ.bot.score = BJ.bot.score + score;
  }

  updateScore();
}

function updateScore() {
  // console.log("updateScore() gamestatus: " + BJ.gameStatus);
  if (BJ.player.busted == 0) {
    score = BJ.player.score;
    document.getElementById(BJ.player.scoreSpan).textContent = score;
  }
  score = BJ.bot.score;
  document.getElementById(BJ.bot.scoreSpan).textContent = score;
  Bust();
}

function Bust() {
  // console.log("bust() gamestatus: " + BJ.gameStatus);
  if (BJ.player.score > 21 && BJ.player.busted == 0) {
    document.getElementById(BJ.player.scoreSpan).textContent = "Bust!";
    BJ.gameStatus = 0;
    BJ.player.busted = 1;
    bjstand();
  }
  if (BJ.bot.score > 21 && BJ.bot.busted == 0) {
    document.getElementById(BJ.bot.scoreSpan).textContent = "Bust!";
    BJ.bot.busted = 1;
  }
}

function bjstand() {
  // console.log("bjstand() gamestatus: " + BJ.gameStatus);
  BJ.gameStatus = 0;
  botPlay();
}
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function botPlay() {
  // console.log("botplay gamestatus: " + BJ.gameStatus);/
  while (BJ.bot.score <= 16) {
    bjhit(BJ.bot);
    await sleep(1000);
  }
  computeWinner();
}

function computeWinner() {
  //Draws
  // console.log("computewinner()gamestatus: " + BJ.gameStatus);
  if (BJ.player.score >= 21 && BJ.bot.score >= 21) {
    document.getElementById("gameMessage").textContent = "It's a Draw!";
    BJ.scores.draws = BJ.scores.draws + 1;
  } else if (BJ.player.score == BJ.bot.score) {
    document.getElementById("gameMessage").textContent = "It's a Draw!";
    BJ.scores.draws = BJ.scores.draws + 1;
  }

  //Player Win
  else if (BJ.player.score <= 21 && BJ.bot.score > 21) {
    document.getElementById("gameMessage").textContent = "You Won!";
    BJ.scores.wins = BJ.scores.wins + 1;
  } else if (BJ.player.score > BJ.bot.score && BJ.player.score <= 21) {
    document.getElementById("gameMessage").textContent = "You Won!";
    BJ.scores.wins = BJ.scores.wins + 1;
  }
  //BotWin
  else if (BJ.player.score >= 21 && BJ.bot.score <= 21) {
    document.getElementById("gameMessage").textContent = "You Lost!";
    BJ.scores.loses = BJ.scores.loses + 1;
  } else if (BJ.player.score < BJ.bot.score && BJ.bot.score <= 21) {
    document.getElementById("gameMessage").textContent = "You Lost!";
    BJ.scores.loses = BJ.scores.loses + 1;
  }
}

function bjdeal() {
  // console.log("bjdeal() gamestatus: " + BJ.gameStatus);
  console.log(BJ.gameStatus);
  if (BJ.gameStatus == 0) {
    let playerCards = document
      .querySelector("#BJPlayerBox")
      .querySelectorAll("img");
    let botCards = document.querySelector("#BJBotBox").querySelectorAll("img");

    for (i = 0; i < playerCards.length; i++) {
      playerCards[i].remove();
    }
    for (i = 0; i < botCards.length; i++) {
      botCards[i].remove();
    }

    BJ.player.score = 0;
    BJ.bot.score = 0;
    BJ.player.busted = 0;
    BJ.bot.busted = 0;
    BJ.gameStatus = 1;
    document.getElementById("gameMessage").textContent = "Press Hit to play!";

    document.getElementById("winsNumber").textContent = BJ.scores.wins;
    document.getElementById("losesNumber").textContent = BJ.scores.loses;
    document.getElementById("drawsNumber").textContent = BJ.scores.draws;
  }
}

/*

todo:
document.querryselsctor ('div')addeventlistener (click, bjhit());
Add aces logic
Dim buttons that can't be clicked
Add animations when the card hits the table
ChaNGE FIONTS IN BJ
add sounds


  hit(player): 
if gamestatus:1
  spawncard(player)
  
stand: 
  gamestatus: 0;
  botplay()

botplay():
hit hit hit until score is mnore or = to 16 (paralell 
element)

spawncard:
spawn a random card
scores += score
if bust: bust 

bust(player)
if human: botplay()
if bot: calculate  the winner


calculate winner:

both bust or scores are equal: draw()

player won: player won()

bot won: bot won()

deal()
clear everything
update table scores
*/
