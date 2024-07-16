document.addEventListener('DOMContentLoaded', () => {
  let score = {
    wins: 0,
    losses: 0,
    ties: 0
  };

  let level = 1; // Niveau par défaut
  let playerMoves = []; // Liste des coups joués par le joueur

  function resetScore() {
    score.wins = 0;
    score.losses = 0;
    score.ties = 0;
    playerMoves = []; // Réinitialise les coups du joueur
    updateScoreElement();
  }

  function updateScoreElement() {
    document.querySelector('.js-score').innerHTML = `Gagné: ${score.wins}, Perdu: ${score.losses}, Égalité: ${score.ties}`;
  }

  function playRound(playerMove) {
    playerMoves.push(playerMove);
    const computerMove = getComputerMove(level, playerMoves);

    let result = '';
    if (playerMove === computerMove) {
      result = 'tie';
      score.ties++;
    } else if (
      (playerMove === 'rock' && computerMove === 'scissors') ||
      (playerMove === 'paper' && computerMove === 'rock') ||
      (playerMove === 'scissors' && computerMove === 'paper')
    ) {
      result = 'win';
      score.wins++;

      if (level === 1 && score.wins >= 5) {
        unlockNextLevel(); // Débloque le niveau 2 : Alice la Prudente
      } else if (level === 2 && score.wins >= 7) {
        unlockNextLevel(); // Débloque le niveau 3 : Charlie le Chanceux
      } else if (level === 3 && score.wins >= 9) {
        unlockNextLevel(); // Débloque le niveau 4 : Dana la Stratégique
      } else if (level === 4 && score.wins >= 12) {
        unlockNextLevel(); // Débloque le niveau 5 : Élodie l'Intrépide
      }
    } else {
      result = 'loss';
      score.losses++;
    }

    updateResultElement(result);
    updateMovesElement(playerMove, computerMove);
    updateScoreElement();
  }

  function getComputerMove(level, playerMoves = []) {
    switch (level) {
      case 1:
        return 'rock'; // Bob le Stupide
      case 2:
        return getPrudentMove(playerMoves); // Alice la Prudente
      case 3:
        return getLuckyMove(playerMoves); // Charlie le Chanceux
      case 4:
        return getStrategicMove(playerMoves); // Dana la Stratégique
      case 5:
        return getAdvancedMove(playerMoves); // Élodie l'Intrépide
      default:
        return getRandomMove();
    }
  }

  function getPrudentMove(playerMoves) {
    if (playerMoves.length === 0) {
      return getRandomMove();
    }
    const lastMove = playerMoves[playerMoves.length - 1];
    if (lastMove === 'rock') {
      return Math.random() < 0.5 ? 'paper' : getRandomMove();
    } else if (lastMove === 'paper') {
      return Math.random() < 0.5 ? 'scissors' : getRandomMove();
    } else {
      return Math.random() < 0.5 ? 'rock' : getRandomMove();
    }
  }

  function getLuckyMove(playerMoves) {
    if (playerMoves.length < 3) {
      return getRandomMove();
    }
    const moveCounts = { rock: 0, paper: 0, scissors: 0 };
    for (const move of playerMoves.slice(-3)) {
      moveCounts[move]++;
    }
    if (moveCounts.rock > moveCounts.paper && moveCounts.rock > moveCounts.scissors) {
      return 'paper';
    } else if (moveCounts.paper > moveCounts.rock && moveCounts.paper > moveCounts.scissors) {
      return 'scissors';
    } else {
      return 'rock';
    }
  }

  function getStrategicMove(playerMoves) {
    if (playerMoves.length < 2) {
      return getRandomMove();
    }
    const lastMove = playerMoves[playerMoves.length - 1];
    const secondLastMove = playerMoves[playerMoves.length - 2];
    if (lastMove === 'rock' && secondLastMove === 'paper' || lastMove === 'paper' && secondLastMove === 'scissors' || lastMove === 'scissors' && secondLastMove === 'rock') {
      return 'rock';
    } else if (lastMove === 'paper' && secondLastMove === 'rock' || lastMove === 'scissors' && secondLastMove === 'paper' || lastMove === 'rock' && secondLastMove === 'scissors') {
      return 'scissors';
    } else {
      return getRandomMove();
    }
  }

  function getAdvancedMove(playerMoves) {
    if (playerMoves.length < 4) {
      return getRandomMove();
    }
    const pattern = playerMoves.slice(-3).join('');
    if (pattern === 'rockpaperscissors' || pattern === 'paperscissorsrock' || pattern === 'scissorsrockpaper') {
      return 'rock';
    } else if (pattern === 'rockscissorspaper' || pattern === 'scissorspaperrock' || pattern === 'paperrockscissors') {
      return 'scissors';
    } else {
      return getRandomMove();
    }
  }

  function getRandomMove() {
    const moves = ['rock', 'paper', 'scissors'];
    const randomIndex = Math.floor(Math.random() * 3);
    return moves[randomIndex];
  }

  function unlockNextLevel() {
    const levelSelect = document.getElementById('level-select');
    switch (level) {
      case 1:
        levelSelect.options[1].disabled = false; // Débloque le niveau 2 : Alice la Prudente
        alert("Félicitations ! Vous avez débloqué le niveau 2 :\nAlice la Prudente observe et adapte légèrement ses choix en fonction de son dernier échec. Elle est prudente mais pas imprévisible.");
        break;
      case 2:
        levelSelect.options[2].disabled = false; // Débloque le niveau 3 : Charlie le Chanceux
        alert("Félicitations ! Vous avez débloqué le niveau 3 :\nCharlie le Chanceux semble tout miser sur la chance mais il se souvient de vos trois derniers coups. Pouvez-vous anticiper sa chance ?");
        break;
      case 3:
        levelSelect.options[3].disabled = false; // Débloque le niveau 4 : Dana la Stratégique
        alert("Félicitations ! Vous avez débloqué le niveau 4 :\nDana la Stratégique analyse vos deux derniers coups pour déterminer sa stratégie. Elle est rusée et aime déjouer vos attentes.");
        break;
      case 4:
        levelSelect.options[4].disabled = false; // Débloque le niveau 5 : Élodie l'Intrépide
        alert("Félicitations ! Vous avez débloqué le niveau 5 :\nÉlodie l'Intrépide est une adversaire redoutable, utilisant des séquences pour prévoir vos mouvements. Sa stratégie est avancée et difficile à déjouer.");
        break;
      default:
        break;
    }
  }

  function updateResultElement(result) {
    document.querySelector('.js-result').innerHTML = result === 'win' ? 'Vous avez gagné!' : result === 'loss' ? 'Vous avez perdu!' : 'Égalité!';
  }

  function updateMovesElement(playerMove, computerMove) {
    document.querySelector('.js-moves').innerHTML = `Vous: ${getEmoji(playerMove)} - Ordinateur: ${getEmoji(computerMove)}`;
  }

  function getEmoji(move) {
    switch (move) {
      case 'rock':
        return '✊';
      case 'paper':
        return '✋';
      case 'scissors':
        return '✌️';
      default:
        return '';
    }
  }

  document.querySelector('.js-rock-button').addEventListener('click', () => playRound('rock'));
  document.querySelector('.js-paper-button').addEventListener('click', () => playRound('paper'));
  document.querySelector('.js-scissors-button').addEventListener('click', () => playRound('scissors'));

  document.getElementById('level-select').addEventListener('change', (event) => {
    level = parseInt(event.target.value);
    resetScore();
  });

  // Initialisation du score
  updateScoreElement();
});
