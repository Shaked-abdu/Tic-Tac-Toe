# Tic Tac Toe

## Information
The application use socket io to establish connection for live updates between the server and the players. while players is connecting to the game they connect with socket that allows two players to play against each other in real-time.
###
State
###
The state of the game stored in 3 parameters: board, currentPlayer and winner.
The board is representing the game board of the game using 9 size array, Each element can be X, O or empty string.
the currentPlayer representing the currnet player turn (start with X).
The winner set to empty string until there is a winner and then it set to X or O.
### 
Utils
###
start-state is using to set a new game with default state values:
board - array of 9 elements with empty strings.
currentPlayer - X.
winner - null.
check-win is using to check if there is a win by given board, by taking all the winning options and check if one of the is made by some of the players.

## 
Please set a .env file with the variable PORT.

Please use the following commands:

Install all the packages
```bash
npm i
```
Build the program
```bash
npm run build
```
Start the program
```bash
npm run start
```