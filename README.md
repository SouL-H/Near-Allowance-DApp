# Student Allowance application on NEAR Protocol

With this project, it is aimed to provide ease of payment of student scholarships over the Near Protocol according to monthly determined periods.

## Instructions
First, log-in to your NEAR Testnet account:
```
near login
```

Clone this repository:
```
git clone https://github.com/SouL-H/Near-Allowance-DApp.git
```

Install dependencies:
```
cd Near-Allowance-DApp
yarn
```

Run the dev-deploy script:
```
bash ./scripts/1.dev-deploy.sh
```

Your dev account will be shown on the console.
Set environment variable CONTRACT to your dev account:
```
export CONTRACT=<your-dev-account>
```

Add a student:
```
bash ./scripts/2.add-student.sh <student-name> <student-near-wallet-adress> <payable-mount> <total-allowance> <your-adress> 

## Example  
## bash ./scripts/2.add-student.sh StudentName student.near 10 10 my.near
## Payment will be made to student.near for a total of 10 months, 1 near per month.
## The fee is transferred from my.near.

```

Start playing after the player joins a created game:
```
bash ./scripts/3.get-paid.sh <student-near-wallet-adress>

## For example, a total of 10 near is distributed for 5 months, as 2 near per month.

## By running this command every month, the student transfers the 2 near to her/his account.
## He can review his remaining rights in step 4. 
## "_status: false" was not charged. 
## "_status:true" has received the fee.
```


View the monthly payment period of the entered wallet:
```
bash ./scripts/4.student-info.sh <student-near-wallet-adress>
```



In this project, I wanted students/scholars to receive their monthly payments by using the near protocol, thanks to the blockchain infrastructure.


Thanks for checking out my project!