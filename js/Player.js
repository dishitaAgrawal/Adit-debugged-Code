class Player {
  constructor() {
    this.index = null;
    this.name = null;
    this.health = 100; 
    // this.health1 = 5;
    this.distance = 0;
    this.height = 0;
    this.bulletX = 0;
    this.bulletY = 0;
    // this.winner = 0;
  }

  display() {}

  getCount() {
    database.ref("playerCount").on("value", function (data) {
      playerCount = data.val();
    });
  }

  updateCount(count) {
    database.ref("/").update({
      playerCount: count,
    });
  }

  update() {
    //REMOVED THE HEALTH NODE FROM HERE FROM UPDATING, SINCE THAT USED TO CHANGE HEATH AGAIN AND AGAIN BACK TO 100 WHENEVER ANY OTHER PARAMETER GOT UPDATED
    var playerIndex = "players/player" + this.index;
    database.ref(playerIndex).update({
      name: this.name,
      distance: this.distance,
      height: this.height,
      bulletX: this.bulletX,
      bulletY: this.bulletY,
     
      // winner: this.winner,
      // health1: this.health1,
    });
  }

   updatePlayer2Health(health) {
    database.ref("players/player2").update({
      health: health,
    });
  }

   updatePlayer1Health(health) {
    database.ref("players/player1").update({
      health: health,
    });
  }

  static getPlayerInfo() {
    var playerInfoRef = database.ref("players");
    playerInfoRef.on("value", (data) => {
      allPlayers = data.val();
    });
  }
}
