let boxes = document.querySelectorAll('.box');
let resetGameBtn = document.querySelector('#reset-btn');
let newGameBtn = document.querySelector('#new-btn');
let msgContainer = document.querySelector('#message');
let msg = document.querySelector('#winner-message');
let turn0 = true;
let enablehide = document.querySelector('.enable-hide');
const winningCombos = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

boxes.forEach((box) => {
    box.addEventListener('click', () => {
        if (turn0) {
            box.innerText = "0";
            turn0 = false;
        } else {
            box.innerText = "X";
            turn0 = true;
        }
        box.style.pointerEvents = 'none';
        checkWinner();
    })
});

const disableboxes = () => {
    for(let box of boxes){
        box.style.pointerEvents = 'none';
    }
}

const showWinner = (winner) => {
    msg.innerText = `Player ${winner} has won!`;
    enablehide.classList.remove('hidden');
    disableboxes();
}
const checkWinner = () => {
    let winnerFound = false;
    // Check all the patterns
    for (let pattern of winningCombos) {
        let pos1val = boxes[pattern[0]].innerText;
        let pos2val = boxes[pattern[1]].innerText;
        let pos3val = boxes[pattern[2]].innerText;
        if ((pos1val != "" && pos2val != "" && pos3val != "") && (pos1val == pos2val && pos2val == pos3val)) {
            showWinner(pos1val);
            winnerFound = true;
            return;
        }
    }
    // Check for draw
    if (!winnerFound) {
        let allBoxesFilled = true;
        for (let box of boxes) {
            if (box.innerText == "") {
                allBoxesFilled = false;
                break;
            }
        }
        if (allBoxesFilled) {
            msg.innerText = "It's a draw!";
            enablehide.classList.remove('hidden');
            disableboxes();
        }
    }
}
const enableboxes = () => {
    for(let box of boxes){
        box.style.pointerEvents = 'auto';
        box.innerText = "";
        enablehide.classList.add('hidden');
    }
}

const resetGame = () => {
    turn0 = true; // Reset player's turn to Player 0
    enableboxes();
};

resetGameBtn.addEventListener('click',resetGame);
newGameBtn.addEventListener('click', resetGame);