var playerName = window.prompt("What is your robot's name?");
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
    
    while(enemyHealth > 0) {

        var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle?\nEnter \'FIGHT\' or \'SKIP\'.");
        console.log(promptFight);

        //Evaluation if player chooses to fight
        if (promptFight === "fight" || promptFight === "FIGHT") {

            //Player's turn to attack enemy
            enemyHealth -= playerAttack;
            console.log("Enemy received", playerAttack, " damage from player.  New enemy HP: ", enemyHealth);

            //Check enemy HP
            if (enemyHealth <= 0) {
                window.alert(enemyName + " has died!");
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
            }
        
            else {
                window.alert(playerName + " still has " + playerHealth + " HP left.");
            }

        }

        //Evaluation if player chooses to skip
        else if (promptFight === "skip" || promptFight === "SKIP") {
            //Confirm player's choice
            var confirmSkip = window.confirm("Are you sure you want to skip this fight and forfeit 2 coins?");

            //Message upon confirm
            if (confirmSkip) {
                window.alert("Skipped fight.  Subtracting 2 coins from inventory.");
                playerMoney -= 2;
                console.log("player money: ", playerMoney);
            }
            
            else {
                fight();
            }
        }

        //Input validation for invalid inputs
        else {
            window.alert("Invalid option.")
        }   
    }

  };


for (i = 0; i < enemyNames.length; i++) {
    enemyHealth = 50;
    fight(enemyNames[i]);
}
