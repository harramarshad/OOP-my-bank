import inquirer from "inquirer";

//Bank account interface
interface BankAccount{
    accountNumber: number;
    Balance : number;
    withDraw(amount: number): void
    deposit(amount: number): void
    checkBalance(): void
}  //it's basically a TO-DO list like a task which we will going to impliment on over class.


// Bank account class
class BankAccount implements BankAccount{
    accountNumber: number;
    Balance: number;
    

    constructor(accountNumber: number, Balance:number){
        this.accountNumber = accountNumber;
        this.Balance = Balance;
    }

    // Debit money(With Draw money)
withDraw(amount: number): void {
    if(this.Balance >= amount){
        this.Balance -= amount;
        console.log(`WithDraw of $${amount} successful. Remaining balance is: $${this.Balance}`);
        
    }else{
        console.log("Insufficient Balance.");
        
    }
}

   //Credit money(Deposit money)
   deposit(amount: number): void {
       if(amount >100){
        amount -= 1; // $1 fee charge if more then $100 is deposited
       } this.Balance += amount;
       console.log(`Deposit  of $${amount} successful. Remaining balance $${this.Balance}`);
       
   }
// Check balance
checkBalance(): void {
    console.log(`Current balance : $${this.Balance}`);
    
} 
}

//Customer class
class Customer{
    firstName: string;
    lastName: string;
    gender: string;
    Age: number;
    mobileNumber:number;
    account: BankAccount;

    constructor(firstName:string,lastName:string,gender:string,Age:number,mobileNumber:number,account:BankAccount)
    {
        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = gender;
        this.Age = Age;
        this.mobileNumber = mobileNumber;
        this.account = account;
    }
}

//Create bank accounts
const accounts:BankAccount[]=[
    new BankAccount(1001, 500),
    new BankAccount(1002, 1000),
    new BankAccount(1003, 2000),
    new BankAccount(1004,5000),
]

//Create customers
const customers: Customer[]=[
    new Customer("Hassan","Rana","Male",25, 3167328416,accounts[0]),
    new Customer("Harram","Arshad","Female",18, 3337328416,accounts[1]),
    new Customer("Ayesha","Khan","Female",25, 3417328416,accounts[3]),
    new Customer("Fatima","Ansari","Male",25, 3167328416,accounts[4]),
]

//Function to interact with bank account

 async function servive() {
   do{
        const accountNumberInput = await inquirer.prompt({
           name: "accountNumber",
           type: "number",
           message: "Enter your account number:",
        })
         
        const customer = customers.find(customer=> customer.account.accountNumber === accountNumberInput.accountNumber )
        if(customer){
            console.log(`Welcome, ${customer.firstName} ${customer.lastName}!\n`);
            const ans = await inquirer.prompt([{
                name: "Select",
                type: "list",
                message: "Select an operation",
                choices: ["Deposit","WithDraw","CheckBalance","Exit"],
            }]);

            switch(ans.Select){
               case "Deposit" :
                const depositAmount = await inquirer.prompt({
                    name: "amount",
                    type: "number",
                    message: "Enter the amount to deposit:",

                })
                customer.account.deposit(depositAmount.amount)
                break;
            case "WithDraw" :
                const WithDrawAmount = await inquirer.prompt({
                    name: "amount",
                    type: "number",
                    message: "Enter the amount to deposit:",

                })
                customer.account.deposit(WithDrawAmount.amount)
                break;
            case "CheckBalance":
                customer.account.checkBalance();
                break;
            case "Exit" :
                console.log("Exiting bank programe...");
                console.log("\nThanks for using our Bank services. Have a good day!");
                return;  
            }
            
        }else{
            console.log("Invalid account number. please try again.");
            
        }
   } while(true)
}

servive()

































































