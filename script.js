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
let array =["Concombre", "Anticonstitutionnellement","Bombe", "fleche", "circulaire", "rond", "laboratoire", "Kaleidoscope", "arbalete", "catcheur", "article", "kangourou"];
let wordLettres = [];
let wordLettresR = [];
let point = 6;
let wordPin = document.createElement("p");

wordPin.id = "wordPin"
game.append(wordPin);

rules.innerHTML = "Quelques régles: " + "<br><br>" + "Vous pouvez choisir la difficulté pour votre nombre d'erreur autorisé (facile: 6, normal: 4, difficile: 2)." + "<br>";
letters.innerHTML = "lettres utilisées :" + "<br><br>";
gameOn(point)

tentative.id = "tentative";
game.append(tentative);
input.id = "input";
input.pattern ="[a-z]{1}"
enter.id = "enter";
enter.innerHTML = "Entrer";
game.append(input);
game.append(enter);

function gameOn(point) {
    let img = document.createElement("img");
    img.style.width = "100%";
    img.style.height = "100%";
    img.src = "un.webp";
    pendu.append(img);
    let points = point;
    let win = 0;
    tentative.innerHTML = "Nombre de tentavive: " + points;
    let num = random();
    let word = array[num];
    wordLettresR.splice(0, wordLettresR.length);
    for(let x = 0; x < word.length; x++) {
        wordLettresR.push(word.substring(x, (x+1)));
    }
    wordChoice(num);
    choice(word, points, img, win, point);
}

function random() {
    return  Math.trunc(Math.random() * array.length);
}

function wordChoice(random) {
    let word = array[random];
    wordLettres.splice(0, wordLettres.length);
    for(let x = 0; x < word.length; x++) {
        wordPin.innerHTML += "_ ";
        wordLettres.push("_ ")
    }
}

function reset(point) {
    pendu.removeChild(pendu.lastElementChild);
    wordPin.innerHTML = "";
    letters.innerHTML = "lettres utilisées :" + "<br><br>";
    gameOn(point);
}

function choice(word, points, img, win, point) {

    let test = function() {
        if(input.value.length === 1) {
            let essay = input.value;
            let length = 0;
            input.value = "";
            letters.innerHTML += essay + "<br>";
            for(let x = 0; x < word.length; x++) {
                if((essay.toLowerCase() === wordLettresR[x].toLowerCase()) && wordLettres[x] === "_ ") {
                    wordLettres.splice(x, 1, (essay + " "));
                    win++
                }
                else {
                    length++
                }
            }
            if(length === word.length) {
                points--;
                image(points, img);
            }
            tentative.innerHTML = "Nombre de tentavive: " + points;
            wordPin.innerHTML = "";
            for(let y = 0; y < word.length; y++) {
                wordPin.innerHTML += wordLettres[y];
            }
            if(points === 0) {
                alert("Perdu");
                reset(point);
                enter.removeEventListener("click", test);
                easy.removeEventListener("click", easyGame);
                normal.removeEventListener("click", normalGame);
                hard.removeEventListener("click", hardGame);
            }
            else if(win === word.length) {
                alert("Gagné");
                reset(point);
                enter.removeEventListener("click", test);
                easy.removeEventListener("click", easyGame);
                normal.removeEventListener("click", normalGame);
                hard.removeEventListener("click", hardGame);
            }
        }
    }
    enter.addEventListener("click", test);

    let easyGame = function () {
        let point = 6;
        reset(point,test);
        easy.removeEventListener("click", easyGame);
        enter.removeEventListener("click", test);
        normal.removeEventListener("click", normalGame);
        hard.removeEventListener("click", hardGame);
    }

    easy.addEventListener("click", easyGame);

    let normalGame = function () {
        let point = 4;
        reset(point,test);
        easy.removeEventListener("click", easyGame);
        enter.removeEventListener("click", test);
        normal.removeEventListener("click", normalGame);
        hard.removeEventListener("click", hardGame);
    }

    normal.addEventListener("click", normalGame);

    let hardGame = function () {
        let point = 2;
        reset(point,test);
        easy.removeEventListener("click", easyGame);
        enter.removeEventListener("click", test);
        normal.removeEventListener("click", normalGame);
        hard.removeEventListener("click", hardGame);
    }

    hard.addEventListener("click", hardGame);
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