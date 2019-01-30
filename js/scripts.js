function Player(name, active) {
  this.name = name;
  this.score = 0;
  this.active = active;
}


function GameManager() {
  this.diceSides = 6;
  this.turnScore = 0;
  this.rolls = [];
  this.totalScore = 0;
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

GameManager.prototype.checkVictory = function (playerScore){
  if(playerScore >= 100){
    console.log("You Win!!!")
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
  $(".holdbtn").hide();
  this.switchPlayers();
}

GameManager.prototype.applyScore = function(score){
  for(var i = 0; i < this.players.length; i += 1){
    if(this.players[i].active) {
      this.players[i].score += score
      this.checkVictory(this.players[i].score);
    }
  }
}

GameManager.prototype.getScore =function() {
  for(var i=0;i<this.rolls.length;i+=1) {
    this.turnScore += this.rolls[i]
  }
  return this.turnScore
}

var game = new GameManager();
var player1 = new Player("player1", true);
var player2 = new Player("player2", false);
game.addPlayer(player1);
game.addPlayer(player2);

$(function() {

  $(".roll-button").click(function(){
    var returnRoll = game.roll();
    var totalsDisplay = ""
      if(returnRoll === 1){
        game.resetBoard();
      } else {
        game.rolls.forEach(function(roll){
          totalsDisplay += "<li>" + roll + "</li>"
        })
        $(".results").html(totalsDisplay);
        $(".holdbtn").show();
      }
  });

  $(".holdbtn").click(function(){
    game.hold();
    $("#player1-score").html(game.players[0].score);
    $("#player2-score").html(game.players[1].score);
  })

});
