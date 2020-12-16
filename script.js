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

wordPin.id = "wordPin"
game.append(wordPin);

rules.innerHTML = "Quelques régles: " + "<br><br>" + "Vous pouvez choisir la difficulté pour votre nombre d'erreur autorisé (facile: 6, normal: 4, difficile: 2)." + "<br>";
letters.innerHTML = "lettres utilisées :" + "<br><br>";

gameOn()

tentative.id = "tentative";
game.append(tentative);
input.id = "input";
input.pattern ="[a-z]{1}"
enter.id = "enter";
enter.innerHTML = "Entrer";
game.append(input);
game.append(enter);

function gameOn() {
    let img = document.createElement("img");
    img.style.width = "100%";
    img.style.height = "100%";
    img.src = "un.webp";
    pendu.append(img);
    let points = 6;
    let win = 0;
    tentative.innerHTML = "Nombre de tentavive: " + points;
    let num = random();
    let word = array[num];
    for(let x = 0; x < word.length; x++) {
        wordLettresR.push(word.substring(x, (x+1)));
    }
    wordChoice(num);
    choice(word, points, img, win);
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
}

function reset() {
    pendu.removeChild(pendu.lastElementChild);
    wordLettres.splice(0, wordLettres.length);
    wordLettresR.splice(0, wordLettresR.length);
    wordPin.innerHTML = "";
    letters.innerHTML = "lettres utilisées :" + "<br><br>";
    gameOn();
}

function choice(word, points, img, win) {

    let test = function() {
        if(input.value.length === 1) {
            let essay = input.value;
            let length = 0;
            input.value = "";
            letters.innerHTML += essay + "<br>";
            for(let x = 0; x < word.length; x++) {
                if(essay === wordLettresR[x].toLowerCase()) {
                    wordLettres.splice(x, 1, (essay + " "));
                    win++
                }
                else {
                    length++
                }
            }
            console.log(length);
            if(length === word.length) {
                points--;
                image(points, img);
            }
            tentative.innerHTML = "Nombre de tentavive: " + points;
            wordPin.innerHTML = "";
            for(let y = 0; y < word.length; y++) {
                wordPin.innerHTML += wordLettres[y];
            }
            console.log(win);
            if(points === 0) {
                alert("Perdu");
                reset();
                enter.removeEventListener("click", test);
            }
            else if(win === word.length) {
                alert("Gagné");
                reset();
                enter.removeEventListener("click", test);
            }
        }
    }
    enter.addEventListener("click", test);
}

function image(points, img){
    if(points === 5) {
        img.src = "deux.webp";
    }
    else if(points === 4) {
        img.src = "trois.webp";
    }
    else if(points === 3) {
        img.src = "quatre.webp";
    }
    else if(points === 2) {
        img.src = "cinq.webp";
    }
    else if(points === 1) {
        img.src = "six.webp";
    }
    else if(points === 0) {
        img.src = "sept.webp";
    }
}