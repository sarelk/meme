'use strict'
// When page loads, show only gallery 
function init() {
    renderGallery();

}

// loads gallery 
function renderGallery(filter = null) {
    var imgs = getImgsToDisplay(filter) || [];
    var strHtmls = imgs.map(function (img) {
        return `
    <div class="lab_item">
    <div class="hexagon hexagon2">
        <div class="hexagon-in1">
            <div class="hexagon-in2" onclick="onChoseImg(${img.id})" style="background-image: url('${img.url}');">
            </div>
        </div>
    </div>
</div>
    `
    });
    document.querySelector('.imgs-container').innerHTML = strHtmls.join('');
}

// When user chose a photo - render it to editor
function onChoseImg(id) {
    var sectionGallery = document.querySelector('.meme-gallery');
    sectionGallery.classList.add('display-none');

    gCanvas = document.getElementById('myCanvas');
    gCtx = gCanvas.getContext('2d');
    loadImg(id);

    var sectionEditor = document.querySelector('.meme-editor');
    sectionEditor.classList.remove('display-none');
}

// When user upload a photo - render it to canvas
function renderCanvas(img) {
    gCanvas.width = img.width;
    gCanvas.height = img.height;
    gCtx.drawImage(img, 0, 0);
}

// Draw line 
function renderLine(line) {
    gCtx.font = line.size + 'px ' + line.font;
    gCtx.strokeStyle = 'black';
    gCtx.lineWidth = 6;
    gCtx.textAlign = 'center';
    gCtx.strokeText(line.line, gCanvas.width / 2, line.y);
    gCtx.fillStyle = line.color;
    gCtx.fillText(line.line, gCanvas.width / 2, line.y);
}


function drawLine(gMeme) {
    Object.keys(gMeme.txts).forEach(key => {
        var line = gMeme.txts[key];
        renderLine(line)
    })
}

function onFileInputChange(ev) {
    handleImageFromInput(ev, renderCanvas)
}

function downloadImg(elLink) {
    var imgContent = gCanvas.toDataURL('image/jpeg');
    elLink.href = imgContent
}

//UPLOAD IMG WITH INPUT FILE
function handleImageFromInput(ev, onImageReady) {
    document.querySelector('.share-container').innerHTML = ''
    var reader = new FileReader();
    //save in global object
    //gMeme.uploadedImage
    reader.onload = function (event) {
        var img = new Image();
        img.onload = onImageReady.bind(null, img)
        img.src = event.target.result;
        gMeme.uploadedImage = img;
    }
    reader.readAsDataURL(ev.target.files[0]);
}

function onDoMeme() {
    var targetElementInput =  event.target;
    var wrapper = $(targetElementInput).parents('.line-wrapper')[0];
    var wrapperName = wrapper.dataset.name;

    var colorChoosen = wrapper.querySelector('.txt-color').value;
    var font = wrapper.querySelector('.font').value;
    var lineInputValue = wrapper.querySelector('.line-input').value;
    var fontSize = wrapper.querySelector(".fontSize").value;
    var yPos = wrapper.querySelector('.yPos').value;
    yPos = +yPos;
    if (yPos < 0) {
        yPos = gCanvas.height + (+yPos);
    }

    gMeme.txts[wrapperName] = createTxt(lineInputValue, fontSize, 'center', colorChoosen, font, gCanvas.width / 2, yPos)

    // if no uploadedImage in the global object
    if (!gMeme.uploadedImage) {

        var img = new Image();
        img.src = 'img/' + gMeme.selectedImgId + '.jpg';

        img.onload = function () {
            gCanvas.width = img.naturalWidth
            gCanvas.height = img.naturalHeight
            gCtx.drawImage(img, 0, 0);
            drawLine(gMeme);
        }
    } else {
        //else - use the uploaded image
        gCtx.drawImage(gMeme.uploadedImage, 0, 0);
        drawLine(gMeme);
    }
}

function onAddLine() {
    var elMyDiv = document.querySelector('.extra-lines');
    var divtest = document.createElement("div");
    divtest.innerHTML = generateLineHtml();
    elMyDiv.appendChild(divtest);
}

function onSearch(value) {
    renderGallery(value);
}


function generateLineHtml() {
    var yPos =  gCanvas.height / 2;
    var name = '_' + Math.random().toString(36).substr(2, 9);
    return `
    <div class="line-wrapper" data-name="${name}">
    <input type="text" class="line-input" placeholder="Write line here" onkeyup="onDoMeme()" /><br />
    <input type="hidden" class="fontSize" value="48" />
    <input type="hidden" class="yPos" value="${yPos}" />

    <div class="control-box">
        <div class="btn-group" role="group">
            <button type="button" class="btn btn-secondary"><i class="fas fa-align-left"></i></button>
            <button type="button" class="btn btn-secondary" autofocus><i
                    class="fas fa-align-justify"></i></button>
            <button type="button" class="btn btn-secondary"><i class="fas fa-align-right"></i></button>
        </div>

        <div class="btn-group" role="group">
            <button type="button" class="btn btn-secondary"><i class="fas fa-font"></i>
                <select class="font" onchange="onDoMeme()">
                    <option value="impact">Impact</option>
                    <option value="arial">Arial</option>
                    <option value="curier-new">Curier New</option>
                    <option value="Times New Roman">Times New Roman</option>
                </select>
            </button>
            <button type="button" class="btn btn-secondary"><label for="iPalette"><i class="fas fa-palette"></i></label><input type="color"
                        class="txt-color" value="#ffffff" id="iPalette" onchange="onDoMeme()" /></button>
            <div id="palette"></div>
        </div>

        <div class="btn-group" role="group">
            <button type="button" class="btn btn-secondary" onclick="onDoFontSize('plus')"><i class="fas fa-plus"></i></button>
            <button type="button" class="btn btn-secondary" onclick="onDoFontSize('minus')"><i class="fas fa-minus"></i></button>
        </div>
        <button type="button" class="btn btn-secondary" onclick="onRemove()"><i class="fas fa-trash-alt"></i></i></button>
    </div>
</div>
    `
}

function onDoFontSize(val) {
    var targetElementInput =  event.target;
    var wrapper = $(targetElementInput).parents('.line-wrapper')[0];
    if (val === 'minus') {
        wrapper.querySelector('.fontSize').value--;
        onDoMeme()
    } else if (val === 'plus') {
        wrapper.querySelector('.fontSize').value++;
        onDoMeme()
    }
}

function onRemove() {
    var targetElementInput =  event.target;
    var wrapper = $(targetElementInput).parents('.line-wrapper')[0];
    var lineInput= wrapper.querySelector('.line-input');
    var wrapperName = wrapper.dataset.name;
    removeLine(wrapperName);
    lineInput.value='';
    onDoMeme();
}