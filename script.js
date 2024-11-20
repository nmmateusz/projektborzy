// wyniki graczy
let scores = { score1: 0, score2: 0 }; 
// liczba punktów do wygranej
let winningScore = 10; 

// funkcja zwiększająca wynik
function increment(scoreId) {
    // sprawdź, czy wynik jest mniejszy od liczby punktów do wygranej
    if (scores[scoreId] < winningScore) { 
        // zwiększ wynik o 1
        scores[scoreId]++; 
        // aktualizuje wynik na stronie
        updateScore(scoreId); 
    }
    checkWinner(); // sprawdź, czy ktoś wygrał
}

function decrement(scoreId) {
    if (scores[scoreId] > 0) {
        scores[scoreId]--;
        updateScore(scoreId);
    }
    checkWinner();
}

//aktualizacja wyswietlanego wyniku 
function updateScore(scoreId) {
    document.getElementById(scoreId).textContent = scores[scoreId];
    updateLeader();
}

//update leadera 
function updateLeader() {
    const leader = scores.score1 > scores.score2 ? 'Marek' :
                   scores.score2 > scores.score1 ? 'Kobos' : 'nikt';
    document.getElementById('leader').textContent = leader;
}

//funckja sprawdzajaca czy ktoś wygral
function checkWinner() {
     // jeśli któryś z graczy osiągnął wymagany wynik
     if (scores.score1 >= winningScore || scores.score2 >= winningScore) { 
        // okresla wygranego
        let winnerId = scores.score1 >= winningScore ? 'player1' : 'player2'; 
        // wybór image wygranego
        let winnerImage = winnerId === 'player1' ? 'marekpwin.jpg' : 'koboswin.png'; 
        // odtwarzanie muzy
        let audio = new Audio('piekneoczy.mp3'); 
        audio.play(); 
        // ustaw tło z obrazkiem zwycięzcy
        document.getElementById(winnerId).style.backgroundImage = `url('${winnerImage}')`; 
        // wybiera tekst z gratulacjami dla wygranego
        let winner = winnerId === 'player1' ? 'gracz 1' : 'gracz 2'; 
        // pokaż komunikat 
        alert(winner + " jest kozakiem!!1!!11!"); 
        disableButtons(); // wyłącz przyciski

        //czas resetu po kliknieciu ok
        setTimeout(resetGame, 1000000);
    }
}
//funkcja wylaczajaca wszystkie przyciski
function disableButtons() {
    document.querySelectorAll("button").forEach(button => {
        button.disabled = true;
    });
}

//funkcja wlaczajaca wszystkie przyciski
function enableButtons() {
    document.querySelectorAll("button").forEach(button => {
        button.disabled = false;
    });
}

// funkcja resetująca gre
function resetGame() {
    // resetuj wyniki
    scores = { score1: 0, score2: 0 }; 
    // ustaw wynik gracza 1 na 0
    document.getElementById('score1').textContent = 0; 
    // ustaw wynik gracza 2 na 0
    document.getElementById('score2').textContent = 0; 
    // usuń klasę 'winner' dla gracza 1
    document.getElementById('player1').classList.remove('winner'); 
    // usuń klasę 'winner' dla gracza 2
    document.getElementById('player2').classList.remove('winner'); 
    enableButtons();
    updateLeader(); 
}

// funkcja zmieniająca liczbę punktów do wygranej
document.getElementById('winningScore').addEventListener('input', function() {
    // ustaw wartość wygranej
    winningScore = parseInt(this.value) || 10;
    resetGame();// resetuj grę po zmianie wygranej
});
