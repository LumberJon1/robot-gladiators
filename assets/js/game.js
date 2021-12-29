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
            //Confirm player's choice
            var confirmSkip = window.confirm("Are you sure you want to skip this fight and forfeit 2 coins?");

            //Message upon confirm
            if (confirmSkip) {
                window.alert("Skipped fight.  Subtracting 2 coins from inventory.");
                playerMoney -= 10;
                console.log("player money: ", playerMoney);
                break;
            }
        }

        //Evaluation if player chooses to fight

        //Player's turn to attack enemy
        enemyHealth -= playerAttack;
        console.log("Enemy received", playerAttack, " damage from player.  New enemy HP: ", enemyHealth);

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
        playerHealth -= enemyAttack;
        console.log("Player received", enemyAttack, " damage from enemy.  New player HP: ", playerHealth);
    
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
for (i = 0; i < enemyNames.length; i++) {

    if (playerHealth > 0) {
        window.alert("Welcome to Robot Gladiators! - Round "+(i + 1)+"!");

        // pick new enemy to fight based on the index of the enemyNames array
        var pickedEnemyName = enemyNames[i];

        // reset enemyHealth before starting new fight
        enemyHealth = 50;

        // use debugger to pause script from running and check what's going on at that moment in the code
        // debugger;

        // pass the pickedEnemyName variable's value into the fight function, where it will assume the value of the enemyName parameter
        fight(pickedEnemyName);

    }
    else {
        window.alert("You have lost your robot in battle! Game Over!");
        break;
      }
}
