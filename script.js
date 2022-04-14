// button click handler
var player = "Player1";
var xo = "X";
var move = 9;
const play = (event) => {

    //apply event to generate new game state

    // game state renderer renders the generated game state
    let element = event.target;
    // renders text on button clicked with X or O
    element.innerHTML = xo;
    xo = (xo == "X") ? "O" : "X";
    // disable the button clicked
    element.disabled = true;
    // update panel values such as Turn Played By and Moves Left
    player = (player == "Player1") ? "Player2" : "Player1";
    document.getElementById("next-player").innerHTML = "Turn Played By: " + player;
    document.getElementById("move-count").innerHTML = "Moves Left: " + (--move);

    // reset panel values to default values
    if (move < 5) {
        var finish = false;
        for (let i = 0; i < 3; i++) {
            var s = 3 * i;
            var match = false;
            if ((document.getElementById("box-" + (s + 1)).innerHTML == "O") || (document.getElementById("box-" + (s + 1)).innerHTML == "X")) {
                match = true;
                console.log((document.getElementById("box-" + (s + 1)).innerHTML));
                for (let j = 1; j < 3; j++) {
                    if (document.getElementById("box-" + (s + j)).innerHTML != document.getElementById("box-" + (s + j + 1)).innerHTML) {
                        match = false;
                        break;
                    }
                }
            }
            if (match) {
                var winner = (document.getElementById("box-" + (s + 1)).innerHTML == "X") ? "Player1" : "Player2";
                finish = true;
                console.log("1 " + (s + 1) + document.getElementById("box-" + (s + 1)).innerHTML);
                break;
            }
        }

        for (let i = 1; i <= 3; i++) {
            s = i;
            match = true;
            // if ((document.getElementById("box-" + s).innerHTML == "O") || (document.getElementById("box-" + s).innerHTML == "X")) {
            for (let j = 1; j < 3; j++) {
                if (document.getElementById("box-" + (s)).innerHTML != document.getElementById("box-" + (s = s + 3)).innerHTML) {
                    match = false;
                    break;
                }
            }
            // }
            if (match && (document.getElementById("box-" + (s + 1)).innerHTML == "X" || "O")) {
                winner = (document.getElementById("box-" + (s)).innerHTML == "X") ? "Player1" : "Player2";
                finish = true;
                console.log("2 " + s);
                break;
            }
        }
        if ((document.getElementById("box-1").innerHTML == document.getElementById("box-5").innerHTML) &&
            (document.getElementById("box-5").innerHTML == document.getElementById("box-9").innerHTML) &&
            (document.getElementById("box-1").innerHTML == "X" || document.getElementById("box-1").innerHTML == "O")) {
            winner = (document.getElementById("box-1").innerHTML == "X") ? "Player1" : "Player2";
            console.log("3 ");
            finish = true;
        }
        if ((document.getElementById("box-3").innerHTML == document.getElementById("box-5").innerHTML) &&
            (document.getElementById("box-5").innerHTML == document.getElementById("box-7").innerHTML) &&
            (document.getElementById("box-3").innerHTML == "X" || document.getElementById("box-3").innerHTML == "O")) {
            winner = (document.getElementById("box-3").innerHTML == "X") ? "Player1" : "Player2";
            console.log("4 ");
            finish = true;
        }
        console.log(finish);
        // implement logic to get the winner

        // announce winner
        if (finish) {
            document.getElementById("winner-display-board").innerHTML = "<h1>WINNER : " + winner + "</h1>";
            document.getElementById("winner-display-board").style.setProperty("display", "inline")
            for (let i = 1; i <= 9; i++) {
                document.getElementById("box-" + i).disabled = true;
            }
        }

        else if (move == 0) {
            document.getElementById("winner-display-board").style.setProperty("display", "inline")
            document.getElementById("winner-display-board").innerHTML = "GAME OVER";
        }
    }
}

// REPLAY-MODE :: replay-game-button-clicked->fetches events recorded->apply event->generates new game state->render game state


// reset game to start a new
function restart() {
    window.location.reload();
}


// bind events to clickable buttons
function enableButtons() {
    for (let i = 1; i <= 9; i++) {
        document.getElementById("box-" + i).addEventListener("click", play);
    }
    document.getElementById("reset").addEventListener("click", restart);
    document.getElementById("next-player").innerHTML = "Turn Played By: Player1";
}

module.exports = { play, enableButtons };
// export default play;