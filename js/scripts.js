function Player(name, active) {
  this.name = name;
  this.score = 0;
  this.active = active;
}


function GameManager() {
  this.diceSides = 6;
  this.turnScore = 0;
  this.rolls = [];
  this.players = [];
}

GameManager.prototype.addPlayer = function(player) {
  this.players.push(player);
}

GameManager.prototype.roll = function () {
  var randomNumber = Math.floor(Math.random() * this.diceSides) + 1;
  this.rolls.push(randomNumber);
  return randomNumber;
}

GameManager.prototype.checkVictory = function (player){
  if(player.score >= 100){
    $(".hiddenPig").hide();
    $(".victoryScreen").show();
    $("#victor").text(player.name)
  }
}

GameManager.prototype.hold = function () {
  this.applyScore(this.getScore());;
  this.resetBoard();

}

GameManager.prototype.switchPlayers = function () {
  this.players.forEach(function(player){
    player.active = !player.active;
  });
}

GameManager.prototype.resetBoard = function() {
  this.rolls = [];
  this.turnScore = 0;
  $("li").remove();
  $(".holdbtn").attr("disabled", true);
  this.switchPlayers();
}

GameManager.prototype.resetUi = function() {
  $(".hiddenPig").show();
  $(".victoryScreen").hide();
  $("li").remove();
  $(".holdbtn").hide();
  $("#player1-score").html(0);
  $("#player2-score").html(0);
}

GameManager.prototype.resetGame = function() {
  var newGame = new GameManager();
  var player1 = new Player("player1", true);
  var player2 = new Player("player2", false);
  newGame.addPlayer(player1);
  newGame.addPlayer(player2);
  return newGame;
}

GameManager.prototype.applyScore = function(score){
  for(var i = 0; i < this.players.length; i += 1){
    if(this.players[i].active) {
      this.players[i].score += score
      this.checkVictory(this.players[i]);
    }
  }
}

GameManager.prototype.getScore =function() {
  for(var i=0;i<this.rolls.length;i+=1) {
    this.turnScore += this.rolls[i]
  }
  return this.turnScore
}

$(function() {
  var game = new GameManager();
  game = game.resetGame();


  $(".roll-button").click(function(){
    var returnRoll = game.roll();
      if(returnRoll === 1){
        $("#diceDisplay").attr("src", "imgs/dice0" + returnRoll + ".png");
        game.resetBoard();
      } else {
        $(".results").append("<li><img src='imgs/dice0" + returnRoll + ".png'></img></li>");
        $("#diceDisplay").attr("src", "imgs/dice0" + returnRoll + ".png");
        $(".holdbtn").removeAttr("disabled");
      }
  });

  $(".holdbtn").click(function(){
    game.hold();
    $("#player1-score").html(game.players[0].score);
    $("#player2-score").html(game.players[1].score);
  })

  $(".reset").click(function(){
    game = game.resetGame();
    game.resetUi();
  })

});
