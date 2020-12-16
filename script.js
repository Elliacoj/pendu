let rules = document.getElementById("rules");
let pendu = document.getElementById("pendu");
let letters = document.getElementById("letters");
let game = document.getElementById("game");
let easy = document.getElementById("easy");
let normal = document.getElementById("normal");
let hard = document.getElementById("hard");
let input = document.createElement("input");
let enter = document.createElement("button");
let tentative = document.createElement("p");
let array =["Orange", "Pomme"];
let wordLettres = [];
let wordLettresR = [];
let wordPin = document.createElement("p");

wordPin.style.width = "100%";
wordPin.style.textAlign = "center";
game.append(wordPin);

rules.innerHTML = "Quelques régles: " + "<br><br>" + "Vous pouvez choisir la difficulté pour votre nombre d'erreur autorisé (facile: 6, normal: 4, difficile: 2)." + "<br>";
letters.innerHTML = "lettres utilisées :" + "<br><br>";

gameOn()

tentative.id = "tentative";
tentative.innerHTML = "Nombre de tentavive: ";
game.append(tentative);
input.id = "input";
input.pattern ="[a-z]{1}"
enter.id = "enter";
enter.innerHTML = "Confirmer";
game.append(input);
game.append(enter);

function gameOn() {
    let num = random();
    let word = array[num];
    for(let x = 0; x < word.length; x++) {
        wordLettresR.push(word.substring(x, (x+1)));
    }
    wordChoice(num);

    enter.addEventListener("click", function() {
        let essay = input.value;
        console.log(essay)
        let length = 0;
        letters.innerHTML += essay + "<br>";
        for(let x = 0; x < word.length; x++) {
            if(essay === wordLettresR[x].toLowerCase()) {
                wordLettres.splice(x, 1, (essay + " "));
            }
            else {
                length++
            }
        }
        wordPin.innerHTML = "";
        for(let y = 0; y < word.length; y++) {
            wordPin.innerHTML += wordLettres[y];
        }
        console.log(wordLettres)
    });
}

function random() {
    return  Math.trunc(Math.random() * array.length);
}

function wordChoice(random) {
    let word = array[random];
    for(let x = 0; x < word.length; x++) {
        wordPin.innerHTML += "_ ";
        wordLettres.push("_ ")
    }
    //console.log(word.substring(2, 3));
}



