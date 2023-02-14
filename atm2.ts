import inquirer from "inquirer";

type ansType = {
  input: string,
  Withdraw:string,
  Deposit:string
}

class User {
  balance: number;
  constructor(balance: number) {
    this.balance = balance;
  }
}

class ATM {
  user: User;
  constructor(user: User) {
    this.user = user;
  }

  async run() {
    while (true) {
      let ans: ansType = await inquirer.prompt([
        {
          type: 'input',
          message: "ATM\n1. Withdraw\n2. Deposit\n3. Check balance\n4. Exit\nEnter your choice:",
          name: 'input'
        }
      ])

      if (ans.input === "1") {
        let answer: ansType = await inquirer.prompt([
          {
            type: "string",
            name: "Withdraw",
            message: "Enter amount to withdraw:"
          }
        ])
        let withdrawalAmount = parseInt(answer.Withdraw || '0', 10);

        if (withdrawalAmount > this.user.balance) {
          console.log("Insufficient balance");
        } else {
          this.user.balance -= withdrawalAmount;
          console.log(`Withdrawn: ${withdrawalAmount}, Balance: ${this.user.balance}.`);
        }
      } else if (ans.input === "2") {
        let answer: ansType = await inquirer.prompt([
          {
            type: "string",
            name: "Deposit",
            message: "Enter amount to deposit:"
          }
        ])
        let depositAmount = parseInt(answer.Deposit || '0', 10);
        this.user.balance += depositAmount;
        console.log(`Deposited: ${depositAmount}, Balance: ${this.user.balance}.`);
      } else if (ans.input === "3") {
        console.log(`Balance: ${this.user.balance}.`);
      } else {
        console.log("Thank you");
        break;
      }
    }
  }
}

const user = new User(1000);
const atm = new ATM(user);
atm.run();



