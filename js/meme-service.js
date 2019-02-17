'use strict'
var gCanvas;
var gCtx;
var gLines = 2;
var gImgs = [{ id: 1, url: 'img/1.jpg', keywords: ['happy', 'mountain', 'blond'] },
{ id: 2, url: 'img/2.jpg', keywords: ['trump', 'politics', 'usa'] },
{ id: 3, url: 'img/3.jpg', keywords: ['animals', 'dogs', 'cute'] },
{ id: 4, url: 'img/4.jpg', keywords: ['baby', 'funny', 'succes'] },
{ id: 5, url: 'img/5.jpg', keywords: ['baby', 'dogs', 'funny'] },
{ id: 6, url: 'img/6.jpg', keywords: ['animals', 'cat'] },
{ id: 7, url: 'img/7.jpg', keywords: ['happy', 'hat'] },
{ id: 8, url: 'img/8.jpg', keywords: ['funny', 'baby'] },
{ id: 9, url: 'img/9.jpg', keywords: ['tv'] },
{ id: 10, url: 'img/10.jpg', keywords: ['tv'] },
{ id: 11, url: 'img/11.jpg', keywords: ['tv'] },
{ id: 12, url: 'img/12.jpg', keywords: ['movies'] },
{ id: 13, url: 'img/13.jpg', keywords: ['succes', 'funny', 'baby'] },
{ id: 14, url: 'img/14.jpg', keywords: ['trump', 'politics', 'usa'] },
{ id: 15, url: 'img/15.jpg', keywords: ['happy', 'baby'] },
{ id: 16, url: 'img/16.jpg', keywords: ['funny', 'animals', 'dogs'] },
{ id: 17, url: 'img/17.jpg', keywords: ['obama', 'politics', 'usa'] },
{ id: 18, url: 'img/18.jpg', keywords: ['sport', 'kiss'] },
{ id: 19, url: 'img/19.jpg', keywords: ['movies', 'wine'] },
{ id: 20, url: 'img/20.jpg', keywords: ['matrix', 'movies'] },
{ id: 21, url: 'img/21.jpg', keywords: ['tv'] },
{ id: 22, url: 'img/22.jpg', keywords: ['tv', 'funny'] },
{ id: 23, url: 'img/23.jpg', keywords: ['movies', 'xman'] },
{ id: 24, url: 'img/24.jpg', keywords: ['politics', 'russia', 'putin'] },
{ id: 25, url: 'img/25.jpg', keywords: ['movies', 'animation', 'toy story'] }
];

var gMeme = {
    selectedImgId: 5,
    txts: []
}

function loadImg(id) {
    gMeme.selectedImgId = id;
    var img = new Image();
    img.src = 'img/' + id + '.jpg';

    img.onload = function () {
        gCanvas.width = img.naturalWidth
        gCanvas.height = img.naturalHeight
        gCtx.drawImage(img, 0, 0);
    }
}

function getImgsToDisplay(filter = null) {
    if (filter === null || filter == "") {
        return gImgs;
    } else {
        return gImgs.filter(img => {
            var result = false;
            img.keywords.forEach(keyword => {
                if (keyword.includes(filter)) {
                    result = true;
                }
            })

            return result;
        })
    }
}

function createTxt(line, size, align, color, font, x, y) {
    return {
        line: line,
        size: size,
        align: align,
        color: color,
        font: font,
        x: x,
        y: y
    }
}

function removeLine(line) {
    gMeme.txts[line].line = '';;
}

function drawLine(gMeme) {
    Object.keys(gMeme.txts).forEach(key => {
        var line = gMeme.txts[key];
        renderLine(line)
    })
}

// Draw line 
function renderLine(line) {
    gCtx.font = line.size + 'px ' + line.font;
    gCtx.strokeStyle = 'black';
    gCtx.lineWidth = 6;
    gCtx.textAlign = 'center';
    gCtx.strokeText(line.line, line.x, line.y);
    gCtx.fillStyle = line.color;
    gCtx.fillText(line.line, line.x, line.y);
}

function submitEmail($subject,$msg) {
    window.open('https://mail.google.com/mail/?view=cm&fs=1&to=Sarelk@gmail.com&su='+ $subject +'&body='+ $msg +'', '_blank');
}