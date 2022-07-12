const game = () => {

    // Variáveis de pontuação
    let pScore = 0;
    let cScore = 0;
    let winnerMSG = "";
    let matchCounter = 0;
    let counter = 0;

    // Função que inicia o jogo
    const startGame = () => {
        const playButton = document.querySelector(".intro button");
        const introScreen = document.querySelector(".intro");
        const match = document.querySelector(".match");

        // Escuta pelo click do botão para iniciar e adiciona classes
        playButton.addEventListener("click", () => {
            introScreen.classList.remove("fadeIn");
            introScreen.classList.add("fadeOut");
            match.classList.add("fadeIn");

            optionsFadeOut(10);

            winnerMSG = "Escolha umas das 3 opções:"
            const winner = document.querySelector(".winner");

            winner.textContent = winnerMSG

        });
        
    };

    // Função que controla a partida
    const playMatch = () => {

        const options = document.querySelectorAll(".options button");
        const playerHand = document.querySelector(".player-hand");
        const computerHand = document.querySelector(".computer-hand");
        const hands = document.querySelectorAll(".hands img");

        const computerOptions = ["pedra", "papel", "tesoura"];


        // Escuta pelo fim da animação para redefinir o padrão com as mãos fechadas
        hands.forEach(hand => {
            hand.addEventListener("animationend", function(){
                console.log(this);

                const winner = document.querySelector(".winner");
                winner.textContent = winnerMSG

                setTimeout(() => {
                    this.style.animation = "";
                    playerHand.src = "./assets/pedra.png";
                    computerHand.src = "./assets/pedra.png";

                    

                    // Chama a função para atualizar os resultados
                    updateScore(); 

                    
                    matchCounter++;
                    console.log(matchCounter);
                    
                    // Cria a dinâmica 3 jogadas por partida
                    if (matchCounter === 6) {
                        const match2 = document.querySelector(".match");
                        const introScreen2 = document.querySelector(".intro");
                        const lastMSG = document.querySelector(".intro h1");
                        const buttonMSG = document.querySelector(".intro button");

                        match2.classList.remove("fadeIn");
                        match2.classList.add("fadeOut");
                        introScreen2.classList.add("fadeIn");

                        const restartScore = () => {
                            // Zera a pontuação para uma nova partida
                            pScore = 0;
                            cScore = 0;
                            matchCounter = 0;
                            counter = 0;
                            updateScore();
                            console.log("playerScore: "+ pScore + " e  computerScore: " + cScore)

                            optionsFadeOut(2);
                        };
                        
                        // Mostra uma mensagem de acordo com o resultado da partida
                        if(pScore > cScore) {
                            lastMSG.textContent = "Você ganhou a partida, parabéns!";
                            buttonMSG.textContent = "Recomeçar";
                            reactiveScore();
                            restartScore();
                        } 
                        else if (pScore === cScore) {
                            lastMSG.textContent = "Os dois empataram, na próxima você vai ganhar!";
                            buttonMSG.textContent = "Recomeçar";
                            reactiveScore();
                            restartScore();
                        } else {
                            lastMSG.textContent = "Você perdeu a partida! Não desista, tente novamente!";
                            buttonMSG.textContent = "Recomeçar";
                            reactiveScore();
                            restartScore();
                        }

                    }
                
                }, 600);

            })
        });
        

        // Controla as escolhas do jogador e do computador, seta as imagens e a animação
        options.forEach(option => {
            option.addEventListener("click", function(){
                
                // Ecolha randomica do computador com Math.floor
                const computerNumber = Math.floor(Math.random() * 3);
                console.log(computerOptions[computerNumber]);

                var computerChoice = computerOptions[computerNumber];
                var playerChoice =  this.innerHTML.toLowerCase();
                console.log(playerChoice);

                counter++
                winnerMSG = counter
                const winner2 = document.querySelector(".winner");
                winner2.textContent = winnerMSG
               
                // Seta a animação para as mãos antes da escolha
                playerHand.style.animation = "chosed .7s ease 3";
                computerHand.style.animation = "cChosed .7s ease 3";

                // Muda a imagem dinamicamente de acordo com as escolhas após a animação
                setTimeout(() => {
                    playerHand.src = `./assets/${playerChoice}.png`;
                    computerHand.src = `./assets/${computerChoice}.png`;
               }, 1800);

                // Chama a função de comparação com os parametros de escolha
                compareHands(playerChoice, computerChoice);

                
            });            
        });
        

    };

    // Função que compara as escolhas e define os resultados para o frontend
    const compareHands = (playerChoice, computerChoice) => {

        //  Se o jogador e o computador escolherem a mesma opção
        if (playerChoice === computerChoice) {
            console.log("EMPATE");
            winnerMSG = "Empate, escolhas iguais!";
            return;
        };

        // Se o jogador escolher pedra
        if (playerChoice === "pedra") {
            if (computerChoice === "tesoura") {
                console.log("vc ganhou");
                winnerMSG = "Parabéns, você ganhou!";
                pScore = pScore + 1;
                return;
            }
            if (computerChoice === "papel") {
                console.log("vc perdeu");
                winnerMSG = "Que pena, você perdeu!";
                cScore = cScore + 1;
                return;
            } 
        };

        // Se o jogador escolher papel
        if (playerChoice === "papel") {
            if (computerChoice === "pedra") {
                console.log("vc ganhou");
                winnerMSG = "Parabéns, você ganhou!";
                pScore = pScore + 1;
                return;
            }
            if (computerChoice === "tesoura") {
                console.log("vc perdeu");
                winnerMSG = "Que pena, você perdeu!";
                cScore = cScore + 1;
                return;
            } 
        };

        // Se o jogador escolher tesoura
        if (playerChoice === "tesoura") {
            if (computerChoice === "papel") {
                console.log("vc ganhou");
                winnerMSG = "Parabéns, você ganhou!";
                pScore = pScore + 1
                return;
            }
            if (computerChoice === "pedra") {
                console.log("vc perdeu");
                winnerMSG = "Que pena, você perdeu!";
                cScore = cScore + 1;
                return;
            } 
        };

    };
    
    // Função que atualiza a pontuação no frontend
    const updateScore = (x) => {
    let playerCounter = document.querySelector(".player-score p");
    let computerCounter = document.querySelector(".computer-score p");

    playerCounter.textContent = pScore;
    computerCounter.textContent = cScore;
    } 

    // função que muda a cor do background se houver vitória ou derrota do player
    const reactiveScore = () => {
        let sectionBG = document.querySelector("section");
    
        if (pScore < cScore) {
        
            setTimeout(() => {
                sectionBG.style.backgroundColor = "rgb(174, 202, 226)";
                
            }, 3200);
            
           
            sectionBG.style.transition = " background-color 800ms linear ";
            sectionBG.style.backgroundColor = "rgb(233, 41, 41)";
        }
        if (pScore > cScore) {
        
            setTimeout(() => {
                sectionBG.style.backgroundColor = "rgb(174, 202, 226)";
                
            }, 3300);

            sectionBG.style.transition = " background-color 800ms linear ";
            sectionBG.style.backgroundColor = "rgb(80,195, 51)";
            
        }
        if (pScore === cScore) {
            
            setTimeout(() => {
                sectionBG.style.backgroundColor = "rgb(174, 202, 226)";
                
            }, 3300);

            sectionBG.style.transition = " background-color 800ms linear ";
            sectionBG.style.backgroundColor = "rgb(207, 216, 226)"
           
        }
        
    } 

    // função que adiciona ou remove classe "fadeIn/fadeOut" da div options
    const optionsFadeOut = (x) => {
        const options2 = document.querySelector(".options");
        if(x === 10){
        options2.classList.remove("fadeOut");
        options2.classList.add("fadeIn")
        } else {
            options2.classList.remove("fadeIn");
            options2.classList.add("fadeOut")
        }
    };

    // Chama as funções dentro da partida
    startGame();
    playMatch();
    

};



// Inicia o jogo
game();

