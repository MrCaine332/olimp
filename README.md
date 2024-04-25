# Transactions Application

## Project Overview:
- Displays persons in a table.
- New transactions can be added to one, or multiple selected persons at once.
- To add transaction to specific person, ***"+ Add Transaction"*** button could be pressed.
- To add multiple transactions, one or more persons must be selected with checkboxes on the left side of the table. 
Then, amount might be adjusted with the input in the header of the table. Once persons are selected and amount is correct,
***"+ Add Transactions To Selected"*** button must be pressed. It will generate the same transaction for all selected persons.
- All amounts of transactions might be adjusted by entering correct amount in the corresponding input field.
- Once all transactions are generated, they can be submitted to the server by clicking on ***"Send Transactions"*** button.
- Before transactions are sent, users are able to preview, how much total transactions will be sent and total change to the bank balance.
- After transactions are sent and processed, user will be able to see successful and failed transactions, as well as to add new transactions for the next submission.

## Setup Instructions:
As stated in the requirements, I tried to avoid adding new dependencies as much as possible. Ultimately, I ended up with 7 dependencies:

### Client Side:
- After cloning repository, move to the ***client*** folder by command ```cd ./client```.
- Once in the ***client*** directory, use ```npm install``` command to install all dependencies.
- Use ```npm run start``` command to start the project
- App will launch on [localhost:3000](http://localhost:3000)

### Backend Side:
- After cloning repository, move to the ***server*** folder by command ```cd ./server```.
- Once in the ***server*** directory, use ```npm install``` command to install all dependencies.
- add ```.env``` file with the following fields to the server root (replace values with yours):
  - POSTGRES_HOST='db-host'
  - POSTGRES_PORT=db-port
  - POSTGRES_USERNAME='db-username'
  - POSTGRES_PASSWORD='db-password'
  - POSTGRES_DATABASE='db-name'
- Use ```npm run start``` command to start the project

## Design Choices:
As written in the requirements, I have attempted to keep simple and intuitive User Interface. I chose table to be main ***body*** of the application.
I believe, expandable table in this case serves quite well. 

Speaking about styling, I chose ***shadcn/ui*** for UI components and ***TailwindCSS*** for styling. Together, they allow
fast and efficient development of interactive and visually pleasant components.

Unfortunately, UI was not made to properly work on mobile devices, hence, I recommend to use desktop option.