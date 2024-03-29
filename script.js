let question = queryize(window.location.href)['question']
if (question == undefined) { question = 0 }
let answer = queryize(window.location.href)['answer']
let point = queryize(window.location.href)['point']
if (point == undefined) { point = 0 }
console.log(answer)

let data = [
    ["Vilket land har flest öar i världen?",  "Finland", "Sverige", "Indien", 1],
    ["Vad är Japans nationalblomma?", "Bonsai", "Körsbärsblomma", "Lotusblomma", 1],
    ["checkpoint", "Tyvärr svarade du fel på en eller flera frågor.", "Glo på TV, var sitter man bäst?", 2, 0],
    ["Vad kallas New York av lokalbefolkningen?", "Metropolis", "The City", "Gotham", 2],
    ["När grundades Netflix?", "2001", "1997", "2015", 1],
    ["checkpoint", "Lite korkad kanske?", "230 grader", 2, 3],
    ["Vad heter Disneys första film?", "Snövit", "Kalle Anka", "Aladin", 0],
    ["Vad dricker myggor helst?", "Blod", "Vatten", "Nektar", 2],
    ["checkpoint", "Du kan ju inte bara chansa!", "Var trivs mjölk bäst?", 2, 6],
    ["Vad heter Edvard Munch världskända målning?", "Skrattet", "Senap", "Skriet", 2],
    ["Vilken historisk händelse skedde den 20 juli 1969?", "Första elektriska bilen tillverkades", "Första månlandningen", "Abba vann Eurovision", 1],
    ["checkpoint", "Jättefel!", "Kissnödig?", 2, 9],
    ["Vilken bokserie var den mest sålda under 2000-talet?", "Harry Potter", "Sagan om ringen", "Heidi", 0],
    ["Vad är godast?", "Spenat", "Senap", "Smör", 1],
    ["checkpoint", "Suck!", "Du har nått målet! Massor med fredagsdrink!", 2, 12]
]
let alternatives = document.getElementById("alternatives")

quiz();


function quiz() {
    document.getElementById("info").hidden=true
    let isCheckpoint = false
    let checkpointCleared = false;

    if (answer != undefined) {
        let previousCorrectAnswer = data[question - 1][data[question - 1].length - 1]
        let givenAnswer = answer

        if (previousCorrectAnswer == givenAnswer) {
            point++;
        }


        console.log("PreviousCorrectanswer: " + previousCorrectAnswer, "GivenAnswer: " + givenAnswer, "Point: " + point)
        if (data[question][0] == "checkpoint") {
            isCheckpoint = true;
            console.log("Checkpoint", "Points: " + point, "Required: " + data[question][3])
            if (point >= data[question][3]) 
            {
                checkpointCleared = true
            }
        }

    }
    if (!isCheckpoint) {
        document.getElementById("question").innerHTML = data[question][0]
        for (let i = 0; i < data[question].length - 2; i++) {
            let li = "<li>"
            alternatives.innerHTML += li + "<a href='questions.html?question=" + (question - 1 + 2) + "&answer=" + i + "&point=" + point + "'>" + data[question][i + 1] + "</a></li>"
        }
    }
    else if(checkpointCleared)
    {
        document.getElementById("status").innerHTML = "Du klarade det!"
        document.getElementById("info").innerHTML = data[question][2]
        alternatives.hidden = true;
        document.getElementById("info").hidden=false
        document.getElementById("question").hidden=true
    }
    else
    {
        console.log(data[question][4])
        let restartQuestion = data[question][4]
        document.getElementById("status").innerHTML = "<a href='questions.html?question=" + restartQuestion + "' class='question'>" + data[question][1] + " Prova igen!</a>"
        document.getElementById("question").hidden=true
    }
}

function queryize(url) {
    var tokens = url.split('?')[1].split('&');
    var result = {};

    for (var i = 0; i < tokens.length; i++) {
        result[tokens[i].split('=')[0]] = tokens[i].split('=')[1];
    }

    return result;
}