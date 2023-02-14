import inquirer from "inquirer";
let users = [{ user_id: "123", user_pin: "123", balance: 2000 }, { user_id: "345", user_pin: "456", balance: 3000 }];
const userIdentify = (user_id, user_pin) => {
    for (let i = 0; i < users.length; i++) {
        if (users[i].user_id === user_id && users[i].user_pin === user_pin) {
            return true;
        }
    }
    return false;
};
const getUser = (user_id) => {
    for (let i = 0; i < users.length; i++) {
        if (users[i].user_id === user_id) {
            return users[i];
        }
    }
    return undefined;
};
const runATM = async () => {
    let answer = await inquirer.prompt([
        {
            type: 'string',
            name: 'user_id',
            message: 'Enter your id:',
        },
        {
            type: 'string',
            name: 'user_pin',
            message: 'Enter your password:',
        }
    ]);
    if (!userIdentify(answer.user_id, answer.user_pin)) {
        console.log("Invalid information. Try again");
        await runATM();
        return;
    }
    const user = getUser(answer.user_id);
    if (!user) {
        console.log("User not found");
        return;
    }
    while (true) {
        let ans = await inquirer.prompt([
            {
                type: 'input',
                message: "ATM\n1. Withdraw\n2. Deposit\n3. Check balance\n4. Exit\nEnter your choice:",
                name: 'input'
            },
        ]);
        if (ans.input === "1") {
            let ans = await inquirer.prompt([
                {
                    type: "string",
                    name: "Withdraw",
                    message: "Enter amount to withdraw:"
                }
            ]);
            let withdrawalAmount = parseInt(ans.Deposit || '0', 10);
            if (withdrawalAmount > user.balance) {
                console.log("Insufficient balance");
            }
            else {
                user.balance -= withdrawalAmount;
                console.log(`Withdrawn: ${withdrawalAmount}, Balance: ${user.balance}.`);
            }
        }
        else if (ans.input === "2") {
            let ans = await inquirer.prompt([
                {
                    type: "string",
                    name: "Dposit",
                    message: "Enter amount to withdraw:"
                }
            ]);
            let depositAmount = parseInt(ans.Deposit || '0', 10);
            user.balance += depositAmount;
            console.log(`Deposited: ${depositAmount}, Balance: ${user.balance}.`);
        }
        else if (ans.input === "3") {
            console.log(`Balance: ${user.balance}.`);
        }
        else {
            console.log("Thank you");
            break;
        }
    }
};
runATM();
