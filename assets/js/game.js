//Random number generator
var randomNumber = function(min, max) {
    var value = Math.floor(Math.random() * (max - min + 1) + min);

    return value;
};

//Name getter and prompt loop to exclude null values
var getPlayerName = function() {
    var name = "";

    while (name === "" || name === null) {
        name = prompt("Enter a name for your robot.");
        console.log("Name:", name);
    }
    
    return name;
}

//Fight/Skip function
var fightOrSkip = function() {
    // ask player if they'd like to fight or skip using fightOrSkip function
    var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle?\nEnter \'FIGHT\' or \'SKIP\'.");
  
    if (promptFight === "" || promptFight === null) {
        fightOrSkip();
    }

    //Currently accepts values other than "fight" or "skip"
  
    // if player picks "skip" confirm and then stop the loop
    //First convert to lower to ease comparison
    promptFight = promptFight.toLowerCase();

    if (promptFight === "skip") {
      // confirm player wants to skip
      var confirmSkip = window.confirm("Are you sure you'd like to quit?");
  
      //If they confirm, skip and enter shop
      if (confirmSkip) {
        window.alert(playerInfo.name + " has decided to skip this fight. Goodbye!");
        playerInfo.money -= 7;

        return true;
      }


    }

    return false;
  }

//Player info object for use in functions
playerInfo = {
    name: getPlayerName(),
    health: 100,
    attack: 10,
    money: 10,
    reset: function() {
        this.health = 100;
        this.money = 10;
        this.attack = 10;
    },
    refillHealth: function() {
        if (this.money >= 7) {
            window.alert("Refilling player's health by 20 for 7 coins.");
            this.health += 20;
            this.money -= 7;
          } 
          else {
            window.alert("You don't have enough money!");
          }
    },
    upgradeAttack: function() {
        if (this.money >= 7) {
            window.alert("Upgrading player's attack by 6 for 7 coins.");
            this.attack += 6;
            this.money -= 7;
          } 
          else {
            window.alert("You don't have enough money!");
          }
    },
};

//Enemy robot array
var enemyInfo = [
    {
        name: "Roborto",
        attack: randomNumber(9, 15)
    },

    {
        name: "Amy Android",
        attack: randomNumber(9, 15)
    },

    {
        name: "Robo Trumble",
        attack: randomNumber(9, 15)
    }
];


// Log player variables' current values
console.log(playerInfo.name+": ", "Attack ", playerInfo.attack, "HP ", playerInfo.health);

var fight = function(enemy) {

    //Track the initiative order
    var isPlayerTurn = true;

    if (Math.random() > 0.5) {
        isPlayerTurn = false;
    }
    
    while(playerInfo.health > 0 && enemy.health > 0) {
        console.log(playerInfo);
        console.log(enemyInfo);

        if (isPlayerTurn) {

        
            //Call the fight or skip prompt
            if (fightOrSkip()) {
                break;
            }

            //Evaluation if player chooses to fight

            //Player's turn to attack enemy
            var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);
            console.log("player dealt damage: ", damage);
            enemy.health = Math.max(0, enemy.health - damage);
            console.log("deducted health from enemy.  New HP: ", enemy.health);
        
            //Check enemy HP
            if (enemy.health <= 0) {
                window.alert(enemy.name + " has died!");
                playerInfo.money += 20;
                break;
            }
            else {
                window.alert(enemy.name + " still has " + enemy.health + " HP left.");
            }
        }
        else {
            //Enemy's turn to attack player
            var damage = randomNumber(enemy.attack - 3, enemy.attack);
            console.log("Player took damage from enemy: ", damage);
            playerInfo.health = Math.max(0, playerInfo.health - damage);
            console.log("Deducted health from player.  New HP: ", playerInfo.health);
            
            //Check player HP
            if (playerInfo.health <= 0) {
                window.alert(playerInfo.name + " has died!");
                break;
            }  
            else {
                window.alert(playerInfo.name + " still has " + playerInfo.health + " HP left.");
            } 
        }

        //Switch the state of isPlayerTurn to reverse turn order
        isPlayerTurn = !isPlayerTurn;
    }
};

//For loop to execute the fight function for each each enemy until dead or skipped
var startGame = function() {

    //Initialize player variables and proLimpt for a new name
    playerInfo.reset();

    for (i = 0; i < enemyInfo.length; i++) {

        if (playerInfo.health > 0) {
            window.alert("Welcome to Robot Gladiators! - Round "+(i + 1)+"!");
    
            // pick new enemy to fight based on the index of the enemyInfo array
            var pickedEnemyObj = enemyInfo[i];
            console.log("Picked enemy obj.: ", pickedEnemyObj);
    
            // Set enemy health to a random value between 40 and 60
            pickedEnemyObj.health = randomNumber(40, 60);
            console.log("Enemy health initialized randomly to ", pickedEnemyObj.health);

            // pass the pickedEnemyName variable's value into the fight function, where it will assume the value of the enemyName parameter
            fight(pickedEnemyObj);
            console.log("Passing enemy obj index into fight function...");

            //Allow entry to the shop if this is not the last round and player is still alive
            if (i < enemyInfo.length - 1 && playerInfo.health > 0) {
                var storeConfirm = window.confirm("The fight is over.  Do you want to visit the store before the next round?");
                
                if (storeConfirm) {
                    shop();
                }
                
            }
    
        }
        else {
            window.alert("You have lost your robot in battle! Game Over!");
            break;
        }
    }

    endGame();
}

var endGame = function() {
    if (playerInfo.health > 0) {
        window.alert("Great job, you've survived the game! You now have a score of " + playerInfo.money + ".");
        
        //Check high score and set to 0 if none exists.
        var highScore = localStorage.getItem("highScore");
        if (highScore === null) {
            highScore = 0;
        }

        //Evaluate player score against high score
        if (playerInfo.money > highScore) {
            localStorage.setItem("highScore", playerInfo.money);
            localStorage.setItem("name", playerInfo.name);
            window.alert("You achieved a new high score of "+playerInfo.money+"!");
        }
        //Display if the player did not reach high score
        else {
            window.alert("You did not beat the high score.\nHigh Score: "+
            localStorage.getItem("name")+": "+highScore);
        }
    } 
    else {
        window.alert("You've lost your robot in battle.");
    }

    var playAgainConfirm = window.confirm("Would you like to play again?");

    if (playAgainConfirm) {
    // restart the game
    startGame();
    } 
    else {
    window.alert("Thank you for playing Robot Gladiators! Goodbye!");
    }

};

var shop = function() {
    
    var shopOptionPrompt = window.prompt("Would you like to refill your health, upgrade your attack"+
    " or leave the store?\nType \"REFILL\", \"UPGRADE\", or \"LEAVE\".");

    //Switch for input validation
    switch (shopOptionPrompt) {

        //Refill cases
        case "refill":
        case "Refill":
        case "REFILL":
            playerInfo.refillHealth();
            break;

        case "1":
            playerInfo.refillHealth();
            break;
        
        //Upgrade cases
        case "upgrade":
        case "Upgrade":
        case "UPGRADE":
            playerInfo.upgradeAttack();
            break;

        case "2":
            playerInfo.upgradeAttack();
            break;
        
        //Leave cases
        case "leave":
            window.alert("Leaving the store...");
            break;

        case "Leave":
            window.alert("Leaving the store...");
            break;

        case "LEAVE":
            window.alert("Leaving the store...");
            break;

        case "3":
            window.alert("Leaving the store...");
            break;
        
        //Default case to catch unexpected input
        default:
            window.alert("You did not pick a valid option.  Try again.");
            shop();
            break;

    }
};

startGame();