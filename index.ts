#! /usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";

// Initialize user balance and pin code
let myBalance = 40000;
let myPin = 1010;

console.log(chalk.yellow("\n \tWelcome to Minza Ishaq - ATM Machine\n"));

let pinAnswer = await inquirer.prompt([
    {
        name: "pin",
        type: "number",
        message: chalk.green("Enter your pin code:")
    }
])

if (pinAnswer.pin === myPin){
    console.log(chalk.blue("\nYour pin is correct, Login Successfully!\n"));
    //console.log(`Current Account Balance is ${myBalance}`);

    let operationAnswer = await inquirer.prompt([
        {
            name: "operation",
            type: "list",
            message: "Select an operation:",
            choices: ["Withdraw Amount", "Check Balance"]
        }
    ])

    if (operationAnswer.operation === "Withdraw Amount"){
        let withdrawAnswer = await inquirer.prompt([
            {
                name: "withdrawMethod",
                type: "list",
                message: "Select a withdrawal method:",
                choices: ["Fast Cash", "Enter Amount"]
            }
        ])
        if(withdrawAnswer.withdrawMethod === "Fast Cash"){
            let fastCashAnswer = await inquirer.prompt([
                {
                    name: "fastCash",
                    type: "list",
                    message: "Select Amount",
                    choices: [1000, 2000, 5000, 10000, 20000, 50000]
                }
            ])
            if(fastCashAnswer.fastCash > myBalance){
                console.log("Insufficient Balance");
            }
            else{
                myBalance -= fastCashAnswer.fastCash
                console.log(`${fastCashAnswer.fastCash} Withdraw Successfully`);
                console.log(`Your Remaining Balance is ${myBalance}`);
            }
        }
        else if(withdrawAnswer.withdrawMethod === "Enter Amount"){
            let amountAnswer = await inquirer.prompt([
                {
                    name: "amount",
                    type: "number",
                    message: "Enter the amount to withdraw:"
                }
            ])
            if(amountAnswer.amount > myBalance){
                console.log(chalk.red("Insufficient Balance"));
            }
            else{
                myBalance -= amountAnswer.amount;
                console.log(`${amountAnswer.amount} Withdraw Successfully`);
                console.log(`Your remaining balance is: ${myBalance}`)
            }
        }
        
    }
    else if (operationAnswer.operation === `Check Balance`){
        console.log(`Your Account Balance is: ${myBalance}`);
    }
}
else{
    console.log(chalk.red("Pin Is Incorrect, Try Again!"));
}


