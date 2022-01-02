//Random number generator
var randomNumber = function(min, max) {
    var value = Math.floor(Math.random() * (max - min + 1) + min);

    return value;
};

//Player info object for use in functions
playerInfo = {
    name: window.prompt("What is your robot's name?"),
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
    }
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
    console.log("Fighting:", enemy);
    
    while(playerInfo.health > 0 && enemyHealth > 0) {

        var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle?\nEnter \'FIGHT\' or \'SKIP\'.");
        console.log(promptFight);

        //Evaluation if player chooses to skip
        if (promptFight === "skip" || promptFight === "SKIP") {

            //Check if player has enough money to skip, and confirm choice or prompt error message
            if (playerInfo.money >= 10) {
                var confirmSkip = window.confirm("Are you sure you want to skip this fight and forfeit 10 coins?");

                //Message upon confirm
                if (confirmSkip) {
                    window.alert("Skipped fight.  Subtracting 10 coins from inventory.");
                    playerInfo.money = Math.max(0, playerInfo.money - 10);
                    console.log("player money: ", playerInfo.money);
                    break;
                }
            }
            else {
                window.alert("You don't have enough money!");
            }
        }

        //Evaluation if player chooses to fight

        //Player's turn to attack enemy
        var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);
        enemyInfo.health = Math.max(0, enemyInfo.health - damage);
        console.log("Enemy received", damage, " damage from player.  New enemy HP: ", enemyInfo.health);

        //Check enemy HP
        if (enemyInfo.health <= 0) {
            window.alert(enemyInfo.name + " has died!");
            playerInfo.money += 20;
            break;
        }
        else {
            window.alert(enemyInfo.name + " still has " + enemyInfo.health + " HP left.");
        }

        //Enemy's turn to attack player
        debugger;
        var damage = randomNumber(enemyInfo.attack - 3, enemyInfo.attack);
        playerInfo.health = Math.max(0, playerInfo.health - damage);
        console.log("Player received", damage, " damage from enemy.  New player HP: ", playerInfo.health);
    
        //Check player HP
        if (playerInfo.health <= 0) {
            window.alert(playerInfo.name + " has died!");
            break;
        }  
        else {
            window.alert(playerInfo.name + " still has " + playerInfo.health + " HP left.");
        }   
    }
};

//For loop to execute the fight function for each each enemy until dead or skipped
var startGame = function() {

    //Initialize player variables
    playerInfo.reset();

    for (i = 0; i < enemyInfo.length; i++) {

        if (playerInfo.health > 0) {
            window.alert("Welcome to Robot Gladiators! - Round "+(i + 1)+"!");
    
            // pick new enemy to fight based on the index of the enemyInfo array
            var pickedEnemyObj = enemyInfo[i];
    
            // Set enemy health to a random value between 40 and 60
            pickedEnemyObj.health = randomNumber(40, 60);
    
            // use debugger to pause script from running and check what's going on at that moment in the code
            // debugger;
    
            // pass the pickedEnemyName variable's value into the fight function, where it will assume the value of the enemyName parameter
            fight(pickedEnemyObj);

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
        
        //Upgrade cases
        case "upgrade":
        case "Upgrade":
        case "UPGRADE":
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

        
        //Default case to catch unexpected input
        default:
            window.alert("You did not pick a valid option.  Try again.");
            shop();
            break;

    }
};

startGame();