var playerName = window.prompt("Welcome to Robot Gladiators! What is your robot's name?");
var playerHealth = 100;
var playerAttack = 10;
var playerMoney = 10;

// Log player variables' current values
console.log(playerName+": ", "Attack ", playerAttack, "HP ", playerHealth);

//Enemy variables
var enemyHealth = 50;
var enemyAttack = 12;

//Combatant array
var enemyNames = ["Roborto", "Amy Android", "Robo Trumble"];

//Game States
/*
Win - Player robot has defeated all enemy robots
    - Fought all enemy robots
    - Defeated all robots

Lose - Player health falls to 0
*/

var fight = function(enemyName) {
    
    while(playerHealth > 0 && enemyHealth > 0) {

        var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle?\nEnter \'FIGHT\' or \'SKIP\'.");
        console.log(promptFight);

        //Evaluation if player chooses to skip
        if (promptFight === "skip" || promptFight === "SKIP") {

            //Check if player has enough money to skip, and confirm choice or prompt error message
            if (playerMoney >= 10) {
                var confirmSkip = window.confirm("Are you sure you want to skip this fight and forfeit 10 coins?");

                //Message upon confirm
                if (confirmSkip) {
                    window.alert("Skipped fight.  Subtracting 10 coins from inventory.");
                    playerMoney = Math.max(0, playerMoney - 10);
                    console.log("player money: ", playerMoney);
                    break;
                }
            }
            else {
                window.alert("You don't have enough money!");
            }
        }

        //Evaluation if player chooses to fight

        //Player's turn to attack enemy
        var damage = randomNumber(playerAttack - 3, playerAttack);
        enemyHealth = Math.max(0, enemyHealth - damage);
        console.log("Enemy received", damage, " damage from player.  New enemy HP: ", enemyHealth);

        //Check enemy HP
        if (enemyHealth <= 0) {
            window.alert(enemyName + " has died!");
            playerMoney += 20;
            break;
        }
        else {
            window.alert(enemyName + " still has " + enemyHealth + " HP left.");
        }

        //Enemy's turn to attack player
        debugger;
        var damage = randomNumber(enemyAttack - 3, enemyAttack);
        playerHealth = Math.max(0, playerHealth - damage);
        console.log("Player received", damage, " damage from enemy.  New player HP: ", playerHealth);
    
        //Check player HP
        if (playerHealth <= 0) {
            window.alert(playerName + " has died!");
            break;
        }  
        else {
            window.alert(playerName + " still has " + playerHealth + " HP left.");
        }   
    }
};

//For loop to execute the fight function for each each enemy until dead or skipped
var startGame = function() {

    //Initialize player variables
    playerHealth = 100;
    playerAttack = 10;
    playerMoney = 10;

    for (i = 0; i < enemyNames.length; i++) {

        if (playerHealth > 0) {
            window.alert("Welcome to Robot Gladiators! - Round "+(i + 1)+"!");
    
            // pick new enemy to fight based on the index of the enemyNames array
            var pickedEnemyName = enemyNames[i];
    
            // Set enemy health to a random value between 40 and 60
            enemyHealth = randomNumber(40, 60);
    
            // use debugger to pause script from running and check what's going on at that moment in the code
            // debugger;
    
            // pass the pickedEnemyName variable's value into the fight function, where it will assume the value of the enemyName parameter
            fight(pickedEnemyName);

            //Allow entry to the shop if this is not the last round and player is still alive
            if (i < enemyNames.length - 1 && playerHealth > 0) {
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
    if (playerHealth > 0) {
        window.alert("Great job, you've survived the game! You now have a score of " + playerMoney + ".");
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
            if (playerMoney >= 7) {
                window.alert("Refilling "+playerName+"'s health by 20 for $7...");
            
                playerHealth += 20;
                playerMoney -= 7;
              }
              else {
                window.alert("You don't have enough money!");
              }
            break;

        case "Refill":
            if (playerMoney >= 7) {
                window.alert("Refilling "+playerName+"'s health by 20 for $7...");
            
                playerHealth += 20;
                playerMoney -= 7;
            }
            else {
                window.alert("You don't have enough money!");
            }
            break;

        case "REFILL":
            if (playerMoney >= 7) {
                window.alert("Refilling "+playerName+"'s health by 20 for $7...");
            
                playerHealth += 20;
                playerMoney -= 7;
            }
            else {
                window.alert("You don't have enough money!");
            }
            break;

        
        //Upgrade cases
        case "upgrade":
            if (playerMoney >= 7) {
                window.alert("Upgrading "+playerName+"'s attack by 6 dmg for $7...");

                playerAttack += 6;
                playerMoney -= 7;
            }
            else {
                window.alert("You don't have enough money!");
            }
            
            break;

        case "Upgrade":
            if (playerMoney >= 7) {
                window.alert("Upgrading "+playerName+"'s attack by 6 dmg for $7...");

                playerAttack += 6;
                playerMoney -= 7;
            }
            else {
                window.alert("You don't have enough money!");
            }
            break;

        case "UPGRADE":
            if (playerMoney >= 7) {
                window.alert("Upgrading "+playerName+"'s attack by 6 dmg for $7...");

                playerAttack += 6;
                playerMoney -= 7;
            }
            else {
                window.alert("You don't have enough money!");
            }
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

var randomNumber = function(min, max) {
    var value = Math.floor(Math.random() * (max - min + 1) + min);

    return value;
};

startGame();