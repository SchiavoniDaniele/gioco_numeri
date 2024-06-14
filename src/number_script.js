//schermata iniziale
var start_modal = new bootstrap.Modal(document.getElementById("start_modal"));
start_modal.show();
//funzione che mostra il gioco al momento in cui si chiude la schermata iniziale
function showGame() {
    document.getElementById("game_screen").removeAttribute("hidden");
}
//Variabili globali per il numero vincente e i tentativi massimi
var lucky_number = 0;
var max_tries = 0;
var record = 0;
//Questo blocco di codice mi serve a bloccare la funzione di base del tasto enter, consentendo invece di inviare il dato al gioco
document.getElementById("number").addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        guessNumber();
    }
});


function newGame() {
    
    lucky_number = Math.floor(Math.random() * 101); //Per ottenere un numero intero casuale tra 0 e 100
    max_tries = 10; //reset tentativi e indizi
    document.getElementById("hint").innerHTML = "";
    document.getElementById("game_visibility").removeAttribute("hidden");
    document.getElementById("game_screen").removeAttribute("hidden");
    document.getElementById("lose_screen").setAttribute("hidden", "");
    document.getElementById("tries_left").textContent = max_tries;
    document.getElementById("hint").textContent = lucky_number; //Solo per i test, poi va tolto
}

function guessNumber() {
    
    var number = document.getElementById("number").value;
    document.getElementById("tries_left").innerHTML = max_tries;
    document.getElementById("number").value = ""; //Per maggior fluidità, a ogni tentativo il numero scritto viene cancellato
    
    if (max_tries > 0) { //Cuore del gioco: se i tentativi rimasti sono maggiori di zero:
        if (number >= 0 && number <= 100) { //se il numero è compreso tra 0 e 100 il gioco può iniziare;
            
            switch (true) {
                case number == lucky_number:
                    // Mostra il modale di vittoria
                    var win_modal = new bootstrap.Modal(document.getElementById("win_modal"));
                    win_modal.show();
                    document.getElementById("game_visibility").setAttribute("hidden", "");
                    if (max_tries > parseInt(document.getElementById("record1").innerText)) {
                        getRecord()
                    }
                    break;
                case number > lucky_number:
                    document.getElementById("hint").innerHTML = "Il numero che cerchi è più piccolo!";
                    max_tries--;
                    break;
                case number < lucky_number:
                    document.getElementById("hint").innerHTML = "Il numero che cerchi è più grande!";
                    max_tries--;
                    break;
            }
            document.getElementById("tries_left").innerHTML = max_tries; //Dopo ogni iterazione, i tentativi massimi vengono aggiornati
            
            
        }
        else {
            document.getElementById("hint").innerHTML = "Quale parte di 'inserisci un numero da 0 a 100' ti è sfuggita? Non tieni al tuo cane?<br>Forse non capisci la posta in gioco.";
            max_tries -= 3;
            document.getElementById("tries_left").innerHTML =max_tries;
        }
        
    }
    else {
        var lose_modal = new bootstrap.Modal(document.getElementById("lose_modal"));
        lose_modal.show();
        document.getElementById("game_visibility").setAttribute("hidden", "");
    }
}


function getRecord() {
    let record_name = document.getElementById("record_name").innerText;
    document.getElementById("record_screen").removeAttribute("hidden");

    switch (true) {
        //Caso 1: il giocatore batte tutti i record
        case max_tries > parseInt(document.getElementById("record1").innerText):
            //aggiorna i punteggi 
            document.getElementById("record3").innerText = document.getElementById("record2").innerHTML;
            document.getElementById("record2").innerText = document.getElementById("record1").innerHTML;
            document.getElementById("record1").innerText = max_tries;

            //aggiorna i nomi
            document.getElementById("record_name3").innerText = document.getElementById("record_name2").innerHTML;
            document.getElementById("record_name2").innerText = document.getElementById("record_name1").innerHTML;
            document.getElementById("record_name1").innerText = document.getElementById("record_name").value;

            //aggiorna il numero vincente
            document.getElementById("lucky_number_record3").innerText = document.getElementById("lucky_number_record2").innerHTML;
            document.getElementById("lucky_number_record2").innerText = document.getElementById("lucky_number_record1").innerHTML;
            document.getElementById("lucky_number_record1").innerText = lucky_number;
            break;

        //Caso 2: il giocatore batte gli ultimi due record
        case max_tries > parseInt(document.getElementById("record2").innerText):
            //aggiorna i punteggi 
            document.getElementById("record3").innerText = document.getElementById("record2").innerHTML;
            document.getElementById("record2").innerText = max_tries;

            //aggiorna i nomi
            document.getElementById("record_name3").innerText = document.getElementById("record_name2").innerHTML;
            document.getElementById("record_name2").innerText = document.getElementById("record_name").value;


            //aggiorna il numero vincente
            document.getElementById("lucky_number_record3").innerText = document.getElementById("lucky_number_record2").innerHTML;
            document.getElementById("lucky_number_record2").innerText = lucky_number;
            break;


        //Caso 3: il giocatore batte l'ultimo record
        default:
            //aggiorna i punteggi 
            document.getElementById("record3").innerText = max_tries;

            //aggiorna i nomi
            document.getElementById("record_name3").innerText = document.getElementById("record_name").value;



            //aggiorna il numero vincente
            document.getElementById("lucky_number_record3").innerText = lucky_number;
           

    }


}
