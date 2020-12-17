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

/**
// Start the game and initializes the variables
 */
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

/**
// Create a random number
 */
function random() {
    return  Math.trunc(Math.random() * array.length);
}

/**
// Choice a random word
 */
function wordChoice(random) {
    let word = array[random];
    wordLettres.splice(0, wordLettres.length);
    for(let x = 0; x < word.length; x++) {
        wordPin.innerHTML += "_ ";
        wordLettres.push("_ ")
    }
}

/**
//Reset the game for the next game
 */
function reset(point) {
    pendu.removeChild(pendu.lastElementChild);
    wordPin.innerHTML = "";
    letters.innerHTML = "lettres utilisées :" + "<br><br>";
    gameOn(point);
}

/**
//Manages the various buttons and conditions for win or loose
 */
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
                remove(point);
            }
            else if(win === word.length) {
                alert("Gagné");
                remove(point);
            }
        }
    }
    enter.addEventListener("click", test);

    /**
    //Easy mode of the game
     */
    let easyGame = function () {
        point = 6;
        remove(point);
    }

    easy.addEventListener("click", easyGame);

    /**
    //Normal mode of the game
     */
    let normalGame = function () {
        point = 4;
        remove(point);
    }

    normal.addEventListener("click", normalGame);

    /**
    //Hard mode of the game
     */
    let hardGame = function () {
        point = 2;
        remove(point);
    }

    hard.addEventListener("click", hardGame);

    /**
    //Remove addEvent for the various buttons and reset the game
     */
    function remove(point) {
        reset(point,test);
        easy.removeEventListener("click", easyGame);
        enter.removeEventListener("click", test);
        normal.removeEventListener("click", normalGame);
        hard.removeEventListener("click", hardGame);
    }
}

/**
// Switch the images for the lost points
 */
function image(points, img) {
    switch (points) {
        case 5:
            img.src = "deux.webp";
            break;
        case 4:
            img.src = "trois.webp";
            break;
        case 3:
            img.src = "quatre.webp";
            break;
        case 2:
            img.src = "cinq.webp";
            break;
        case 1:
            img.src = "six.webp";
            break;
        case 0:
            img.src = "sept.webp";
            break;
    }
}