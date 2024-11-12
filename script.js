let scores = { score1: 0, score2: 0 };
let winningScore = 10;

function increment(scoreId) {
    if (scores[scoreId] < winningScore) {
        scores[scoreId]++;
        updateScore(scoreId);
    }
    checkWinner();
}

function decrement(scoreId) {
    if (scores[scoreId] > 0) {
        scores[scoreId]--;
        updateScore(scoreId);
    }
    checkWinner();
}

function updateScore(scoreId) {
    document.getElementById(scoreId).textContent = scores[scoreId];
    updateLeader();
}

function updateLeader() {
    const leader = scores.score1 > scores.score2 ? 'Marek' :
                   scores.score2 > scores.score1 ? 'Kobos' : 'nikt';
    document.getElementById('leader').textContent = leader;
}

function checkWinner() {
    if (scores.score1 >= winningScore || scores.score2 >= winningScore) {
        // po wygranej zmienia na obraz wygranego
        let winnerId = scores.score1 >= winningScore ? 'player1' : 'player2';
        let winnerImage = winnerId === 'player1' ? 'marekpwin.jpg' : 'koboswin.png';
        let audio = new Audio('piekneoczy.mp3');
        audio.play();
        document.getElementById(winnerId).style.backgroundImage = `url('${winnerImage}')`;
        let winner = winnerId === 'player1' ? 'Gracz 1' : 'Gracz 2';
        alert(winner + " jest kozakiem!!1!!11!");
        disableButtons();

        //czas resetu po kliknieciu ok
        setTimeout(resetGame, 1000000);
    }
}

function disableButtons() {
    document.querySelectorAll("button").forEach(button => {
        button.disabled = true;
    });
}

function enableButtons() {
    document.querySelectorAll("button").forEach(button => {
        button.disabled = false;
    });
}

function resetGame() {
    scores = { score1: 0, score2: 0 };
    document.getElementById('score1').textContent = 0;
    document.getElementById('score2').textContent = 0;
    document.getElementById('player1').classList.remove('winner');
    document.getElementById('player2').classList.remove('winner');
    enableButtons();
    updateLeader();
}

document.getElementById('winningScore').addEventListener('input', function() {
    winningScore = parseInt(this.value) || 10;
    resetGame();
});