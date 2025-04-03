let fields = [
    null, 'x', 'o',
    null, null, null,
    null, null, null
];

function init() {
    renderGame()
}

function renderGame() {
    let html = '<table class="tic-tac-toe">';
    
    for (let i = 0; i < 3; i++) {
        html += '<tr>';
        for (let j = 0; j < 3; j++) {
            const index = i * 3 + j;
            html += `<td class="cell">${fields[index] ? fields[index] : ''}</td>`;
        }
        html += '</tr>';
    }
    
    html += '</table>';
    document.getElementById('container').innerHTML = html;
}