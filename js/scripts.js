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
  for(var i = 0; i < this.players.length; i++) {
    if(this.players[i].active === true) {

      this.players[i].active = false;
      if(this.players[i + 1]) {
        this.players[i + 1].active = true;
        return;
      } else {
        this.players[0].active = true;
      }
    }
  }
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
  $(".holdbtn").attr("disabled", true);
  $("#player1-score").html(0);
  $("#player2-score").html(0);
}

GameManager.prototype.resetGame = function() {
  var newGame = new GameManager();
  var player0 = new Player($("#p0").val(), true);
  $(".player0").text(player0.name);
  var player1 = new Player($("#p1").val(), false);
  $(".player1").text(player1.name);
  newGame.addPlayer(player0);
  newGame.addPlayer(player1);
  for (var i = 2; i < $(".player").length; i++) {
    var extraPlayer = new Player($("#p" + i).val(), false);
    $(".scoreContainer").append("<div class='col-md-3'><p><span class='playerScore" + i + "Name'></span>" + extraPlayer.name + " Score: <span id='player" + i + "-score'>0</span> </p></div>")
    newGame.addPlayer(extraPlayer);
  }

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

GameManager.prototype.showScores = function () {
  for (var i = 0; i < this.players.length; i++) {
    $("#player" + i + "-score").html(this.players[i].score)
  }
}

$(function() {
  var game = new GameManager();

  $(".add-player").click(function(){
    var playerCount = $(".player").length;
    $(".player-container").append("<input class='player' id='p" + playerCount + "'></input>");
  });

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
    game.showScores();

  })

  $(".reset").click(function(){
    game = game.resetGame();
    game.resetUi();
  })
  $(".nameInput").click(function(){
    $(".game-container").slideDown();
    game = game.resetGame();
  });
});
