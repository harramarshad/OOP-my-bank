"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const inquirer_1 = __importDefault(require("inquirer"));
// Bank account class
class BankAccount {
    constructor(accountNumber, Balance) {
        this.accountNumber = accountNumber;
        this.Balance = Balance;
    }
    // Debit money(With Draw money)
    withDraw(amount) {
        if (this.Balance >= amount) {
            this.Balance -= amount;
            console.log(`WithDraw of $${amount} successful. Remaining balance is: $${this.Balance}`);
        }
        else {
            console.log("Insufficient Balance.");
        }
    }
    //Credit money(Deposit money)
    deposit(amount) {
        if (amount > 100) {
            amount -= 1; // $1 fee charge if more then $100 is deposited
        }
        this.Balance += amount;
        console.log(`Deposit  of $${amount} successful. Remaining balance $${this.Balance}`);
    }
    // Check balance
    checkBalance() {
        console.log(`Current balance : $${this.Balance}`);
    }
}
//Customer class
class Customer {
    constructor(firstName, lastName, gender, Age, mobileNumber, account) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = gender;
        this.Age = Age;
        this.mobileNumber = mobileNumber;
        this.account = account;
    }
}
//Create bank accounts
const accounts = [
    new BankAccount(1001, 500),
    new BankAccount(1002, 1000),
    new BankAccount(1003, 2000),
    new BankAccount(1004, 5000),
];
//Create customers
const customers = [
    new Customer("Hassan", "Rana", "Male", 25, 3167328416, accounts[0]),
    new Customer("Harram", "Arshad", "Female", 18, 3337328416, accounts[1]),
    new Customer("Ayesha", "Khan", "Female", 25, 3417328416, accounts[3]),
    new Customer("Fatima", "Ansari", "Male", 25, 3167328416, accounts[4]),
];
//Function to interact with bank account
function servive() {
    return __awaiter(this, void 0, void 0, function* () {
        do {
            const accountNumberInput = yield inquirer_1.default.prompt({
                name: "accountNumber",
                type: "number",
                message: "Enter your account number:",
            });
            const customer = customers.find(customer => customer.account.accountNumber === accountNumberInput.accountNumber);
            if (customer) {
                console.log(`Welcome, ${customer.firstName} ${customer.lastName}!\n`);
                const ans = yield inquirer_1.default.prompt([{
                        name: "Select",
                        type: "list",
                        message: "Select an operation",
                        choices: ["Deposit", "WithDraw", "CheckBalance", "Exit"],
                    }]);
                switch (ans.Select) {
                    case "Deposit":
                        const depositAmount = yield inquirer_1.default.prompt({
                            name: "amount",
                            type: "number",
                            message: "Enter the amount to deposit:",
                        });
                        customer.account.deposit(depositAmount.amount);
                        break;
                    case "WithDraw":
                        const WithDrawAmount = yield inquirer_1.default.prompt({
                            name: "amount",
                            type: "number",
                            message: "Enter the amount to deposit:",
                        });
                        customer.account.deposit(WithDrawAmount.amount);
                        break;
                    case "CheckBalance":
                        customer.account.checkBalance();
                        break;
                    case "Exit":
                        console.log("Exiting bank programe...");
                        console.log("\nThanks for using our Bank services. Have a good day!");
                        return;
                }
            }
            else {
                console.log("Invalid account number. please try again.");
            }
        } while (true);
    });
}
servive();
