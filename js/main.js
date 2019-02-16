'use strict'
// When page loads, show only gallery 
function init() {
    renderGallery();
    getKeywords();
}

// loads gallery 
function renderGallery(filter = null) {
    var imgs = getImgsToDisplay(filter) || [];
    console.log(imgs);
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
        console.log(line);
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

function onDoMeme(lineWrapperClass) {
    //first/second line ?
    var wrapper = document.querySelector('.' + lineWrapperClass);


    var colorChoosen = wrapper.querySelector('.txt-color').value;
    var font = wrapper.querySelector('.font').value;
    var lineInputValue = wrapper.querySelector('.line-input').value;
    var fontSize = wrapper.querySelector(".fontSize").value;
    var yPos = wrapper.querySelector('.yPos').value
    if (lineWrapperClass == 'second-line-wrapper') {
        yPos = gCanvas.height + (+yPos);
    }

    gMeme.txts[lineWrapperClass] = createTxt(lineInputValue, fontSize, 'center', colorChoosen, font, gCanvas.width / 2, yPos)

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
    var divtest = document.createElement("span");
    divtest.innerHTML = '<input type="text" class="another-line" placeholder="Write meme here" /><br/>';
    elMyDiv.appendChild(divtest);
}

function onSearch(value) {
    renderGallery(value);
}