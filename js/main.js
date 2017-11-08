'use strict'
console.log('in picture');

var gCurrQuestIdx = 0;
var gQuests = [
    {
        id: 1,
        options: ['Hamburger', 'Pizza'],
        correctOptionIdx: 1,
        imagePaths: ['img/pizza.jpg']
    },
    {
        id: 2,
        options: ['New York', 'Tel Aviv'],
        correctOptionIdx: 1,
        imagePaths: ['img/tlv.jpg']
    }
];

function initGame() {
    renderQuestion();
}

function renderQuestion() {
    renderPics(gCurrQuestIdx);
    renderOptions(gCurrQuestIdx);
}

function renderPics(questIdx) {
    var strHTML = '';
    var picPaths = gQuests[questIdx].imagePaths
    for (var i = 0; i < picPaths.length; i++) {
        var picPath = picPaths[i];
        strHTML += '<img src="' + picPath + '" class="optionImage"/>'

    }
    document.querySelector('.pics').innerHTML = strHTML
}

function renderOptions(questIdx) {
    var strHTML = '';
    var options = gQuests[questIdx].options
    for (var i = 0; i < options.length; i++) {
        var option = options[i];
        strHTML += '<div class="option" id="' + i + '" onclick = "checkAns(this.id)"> ' + option + ' </div>';
    }
    document.querySelector('.options').innerHTML = strHTML;
}

function checkAns(optionIdx) {
    var elFeedback = document.querySelector('.feedback');
    elFeedback.style.display = 'block';
    if (+optionIdx === gQuests[gCurrQuestIdx].correctOptionIdx) {
        elFeedback.classList.remove('negFeedback');
        elFeedback.classList.add('positiveFeedback');
        elFeedback.querySelector('.feedbackTxt').innerText = 'AMAZING!'
        elFeedback.querySelector('.nextBtn').disabled = false;
    } else {
        elFeedback.classList.remove('positiveFeedback');                
        elFeedback.classList.add('negFeedback');
        elFeedback.querySelector('.feedbackTxt').innerText = 'Maybe Next Time?!'
        elFeedback.querySelector('.nextBtn').disabled = true;
    }
}

function nextQuest() {
    if (gCurrQuestIdx === gQuests.length - 1) {
        alert('Game Over');
    } else {
        gCurrQuestIdx++;
        renderQuestion();
        var elFeedback = document.querySelector('.feedback');
        elFeedback.style.display = 'none';
    }
}

function createQuest() {
    var quest = {};
    quest.id = gQuests.length;
    quest.options = []
    quest.options.push(prompt('option 1 text?'));
    quest.options.push(prompt('option 2 text?'));
    quest.correctOptionIdx = +prompt('correct option index?');
    quest.imagePaths = [];
    quest.imagePaths.push(prompt('image path?'));

    gQuests.push(quest);
}