pl = document.getElementById('play');
document.getElementById('play').remove();
e = document.getElementById('exit');
document.getElementById('exit').remove();

function rps(userchoice) {
    var human = userchoice.id;
    var index = Math.floor(Math.random() * 3);
    var comp = ['rock', 'paper', 'scissor'][index];
    var result = whowon(human, comp);
    frontend(result, human, comp);
}
function whowon(h, c) {
    var dbobj = {
        'rock': { 'rock': 0.5, 'paper': 0, 'scissor': 1 },
        'paper': { 'rock': 1, 'paper': 0.5, 'scissor': 0 },
        'scissor': { 'rock': 0, 'paper': 1, 'scissor': 0.5 }
    };
    let ans = dbobj[h][c];
    if (ans === 1)
        return { 'message': 'You won!', 'color': 'green', 'score': '1' };
    else if (ans === 0.5)
        return { 'message': 'Tie!', 'color': 'blue', 'score': '0' };
    else if (ans === 0)
        return { 'message': 'You lost!', 'color': 'red', 'score': '-1' };
}
var detached;
function frontend(msg, user, bot) {
    var imgdb = {
        'rock': document.getElementById('rock').src,
        'paper': document.getElementById('paper').src,
        'scissor': document.getElementById('scissor').src
    };

    r = document.getElementById('rock');
    document.getElementById('rock').remove();
    p = document.getElementById('paper');
    document.getElementById('paper').remove();
    s = document.getElementById('scissor');
    document.getElementById('scissor').remove();

    var userdiv = document.createElement('div');
    var msgdiv = document.createElement('div');
    var botdiv = document.createElement('div');

    const sound = new Audio('sounds/aww.mp3');
    sound.play();

    userdiv.innerHTML = "<img src='" + imgdb[user] + "' height=150 weight=150 style='box-shadow:0px 10px 30px blue'>"
    document.getElementById('flex-box-rps').appendChild(userdiv);
    msgdiv.innerHTML = "<h3 style='color:" + msg['color'] + ";font-size:60px'>" + msg['message'] + "</h3>"
    document.getElementById('flex-box-rps').appendChild(msgdiv);
    botdiv.innerHTML = "<img src='" + imgdb[bot] + "' height=150 weight=150 style='box-shadow:0px 10px 30px red'>"
    document.getElementById('flex-box-rps').appendChild(botdiv);

    document.getElementById('reset').appendChild(pl);
    pl.onclick = function () {
        // location.reload();
        userdiv.remove();
        msgdiv.remove();
        botdiv.remove();

        document.getElementById('flex-box-rps').append(r);
        document.getElementById('flex-box-rps').append(p);
        document.getElementById('flex-box-rps').append(s);

        document.getElementById('play').remove();
        document.getElementById('exit').remove();
    }

    document.getElementById('reset').appendChild(e);
    e.onclick = function () {
        window.close();
    }

    if (msg['score'] === '1')
        document.getElementById('score').innerHTML++;
    else if (msg['score'] === '-1')
        document.getElementById('botscore').innerHTML++;
}
