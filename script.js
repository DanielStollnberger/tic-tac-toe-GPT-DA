let fields = [
    null, null, null,
    null, null, null,
    null, null, null
];
let currentPlayer = 'circle';

document.addEventListener("DOMContentLoaded", init);

function handleClick(index) {
    if (!fields[index]) {
        fields[index] = currentPlayer;
        updateCell(index);
        currentPlayer = currentPlayer === 'circle' ? 'cross' : 'circle';
        if (currentPlayer == 'circle') {
            document.getElementById('circle-svg').classList.add('bg-white');
            document.getElementById('cross-svg').classList.remove('bg-white');
        } else {
            document.getElementById('cross-svg').classList.add('bg-white');
            document.getElementById('circle-svg').classList.remove('bg-white');
        }

    }
}

function init() {
    document.getElementById('circle-svg').classList.add('bg-white');
    const container = document.getElementById('container');
    let html = '<table class="tic-tac-toe">';
    for (let i = 0; i < 3; i++) {
        html += '<tr>';
        for (let j = 0; j < 3; j++) {
            const index = i * 3 + j;
            html += `<td class="cell" id="cell-${index}" onclick="handleClick(${index})"></td>`;
        }
        html += '</tr>';
    }
    html += '</table>';
    container.innerHTML = html + `<div id='winner-line' class='winner-line hidden'></div>`;
}

function updateCell(index) {
    const cell = document.getElementById(`cell-${index}`);
    let content = '';
    if (fields[index] === 'circle') {
        content = `<svg width="50" height="50" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="40" fill="none" stroke="#67809F" stroke-width="6"
                stroke-dasharray="251.2" stroke-dashoffset="251.2"
                transform="rotate(-90 50 50)">
                <animate attributeName="stroke-dashoffset" from="251.2" to="0" dur=".5s" fill="freeze"/>
            </circle>
        </svg>`;
    } else if (fields[index] === 'cross') {
        content = `<svg width="60" height="60" viewBox="0 0 100 100">
            <line x1="20" y1="20" x2="80" y2="80" stroke="#8B0000" stroke-width="6" stroke-dasharray="84.85" stroke-dashoffset="84.85">
                <animate attributeName="stroke-dashoffset" from="84.85" to="0" dur=".5s" fill="freeze"/>
            </line>
            <line x1="80" y1="20" x2="20" y2="80" stroke="#8B0000" stroke-width="6" stroke-dasharray="84.85" stroke-dashoffset="84.85">
                <animate attributeName="stroke-dashoffset" from="84.85" to="0" dur=".5s" fill="freeze"/>
            </line>
        </svg>`;
    }
    cell.innerHTML = content;

    const winner = checkWinner();
    if (winner) {
        setTimeout(alertWinner(winner), 3000);
    }
}

function checkWinner() {
    const winningCombinations = [
        [0, 1, 2], // obere Reihe
        [3, 4, 5], // mittlere Reihe
        [6, 7, 8], // untere Reihe
        [0, 3, 6], // linke Spalte
        [1, 4, 7], // mittlere Spalte
        [2, 5, 8], // rechte Spalte
        [0, 4, 8], // diagonale von links oben nach rechts unten
        [2, 4, 6]  // diagonale von rechts oben nach links unten
    ];

    for (let combination of winningCombinations) {
        let winnerRef = document.getElementById('winner')
        const [a, b, c] = combination;
        if (fields[a] && fields[a] === fields[b] && fields[a] === fields[c]) {
            document.getElementById(`cell-${a}`).style.filter = "drop-shadow(0px 0px 3px white)";
            document.getElementById(`cell-${b}`).style.filter = "drop-shadow(0px 0px 3px white)";
            document.getElementById(`cell-${c}`).style.filter = "drop-shadow(0px 0px 3px white)";

            drawWinnerLine([a, b, c]);

            setTimeout(() => {
                if (fields[a] == 'circle') {
                    winnerText = 'circle';
                    fields[a] = `<svg width="20" height="20" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="40" fill="none" stroke="#67809F" stroke-width="6"
                stroke-dasharray="251.2" stroke-dashoffset="251.2"
                transform="rotate(-90 50 50)">
                <animate attributeName="stroke-dashoffset" from="251.2" to="0" dur=".5s" fill="freeze"/>
            </circle>
        </svg>`;
                } else {
                    winnerText = 'cross';
                    fields[a] = `<svg width="20" height="20" viewBox="0 0 100 100">
            <line x1="20" y1="20" x2="80" y2="80" stroke="#8B0000" stroke-width="6" stroke-dasharray="84.85" stroke-dashoffset="84.85">
                <animate attributeName="stroke-dashoffset" from="84.85" to="0" dur=".5s" fill="freeze"/>
            </line>
            <line x1="80" y1="20" x2="20" y2="80" stroke="#8B0000" stroke-width="6" stroke-dasharray="84.85" stroke-dashoffset="84.85">
                <animate attributeName="stroke-dashoffset" from="84.85" to="0" dur=".5s" fill="freeze"/>
            </line>
        </svg>`
                }
                winnerRef.classList.remove('hidden')
                winnerRef.innerHTML = `<h2>And the winner meine Damen und Herren is <b class='${fields[a]}'>${fields[a]}</b>!</h2>
<p><b class='${fields[a]}'>${fields[a]}</b> setzte sich souverän durch und gewann dieses interessante Spiel nach Verlängerung!</p>
<button onclick='resetGame()' class='${winnerText}-button'>Restart the Game</button>
   `;
            }, 1000); // Wartezeit von 500ms, bevor der Alert erscheint
        }
    }
    return null; // Kein Gewinner
}

function drawWinnerLine([a, b, c]) {

    let containerRect = document.getElementById(`container`).getBoundingClientRect();
    let rectA = document.getElementById(`cell-${a}`).getBoundingClientRect();
    let rectB = document.getElementById(`cell-${b}`).getBoundingClientRect();
    let rectC = document.getElementById(`cell-${c}`).getBoundingClientRect();
    console.log(rectA, rectB, rectC, containerRect);

    let winnerLine = document.getElementById('winner-line')
    if (rectA.top == rectC.top) {
        winnerLine.style.left = rectA.left - containerRect.left;
        winnerLine.style.top = rectA.top - containerRect.top + 37 + `px`;
    } else if (rectA.left == rectC.left) {
        winnerLine.style.left = rectA.left - containerRect.left - 125 + 41.5 + 'px';
        winnerLine.style.top = rectA.top - containerRect.top + 125 + 'px';
        winnerLine.style.transform = 'rotate(90deg)';
    } else if (rectA.left == containerRect.left && rectA.left != rectC.left) {
        winnerLine.style.left = rectA.left - containerRect.left + 'px';
        winnerLine.style.top = rectA.top - containerRect.top + 125 + 'px';
        winnerLine.style.transform = 'rotate(45deg)';
    } else {
        winnerLine.style.left = rectA.left - containerRect.left - 170 + 'px';
        winnerLine.style.top = rectA.top - containerRect.top + 125 + 'px';
        winnerLine.style.transform = 'rotate(-45deg)';
    }


    winnerLine.classList.remove('hidden');
}

function resetGame() {
    fields = [null, null, null,
              null, null, null,
              null, null, null];
              document.getElementById('cross-svg').classList.remove('bg-white');
              document.getElementById('winner').classList.add('hidden');
              init();
}


