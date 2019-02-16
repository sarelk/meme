var canvas = new fabric.Canvas('theCanvas', {
    backgroundColor: 'rgb(225,225,225)',
      width:525,
      height:725,
      containerClassName:'theCanvas',
      preserveObjectStacking: true,
  });

  
  function resize() {
      var canvasSizer = document.getElementById("canvasSizer");
      var canvasScaleFactor = canvasSizer.offsetWidth/525;
      var width = canvasSizer.offsetWidth;
      var height = canvasSizer.offsetHeight;
      var ratio = canvas.getWidth() /canvas.getHeight();
           if((width/height)>ratio){
               width = height*ratio;
           } else {
               height = width / ratio;
           }
    var scale = width / canvas.getWidth();
    var zoom = canvas.getZoom();
    zoom *= scale;
    canvas.setDimensions({ width: width, height: height });
      canvas.setViewportTransform([zoom , 0, 0, zoom , 0, 0])
  }
  
  window.addEventListener('load', resize, false);
  window.addEventListener('resize', resize, false);
  
  var textObj = new fabric.IText("Test Text", {
      fontSize:22,
    top:362.5,
    left:262.5,
    hasControls:true,
    fontWeight:'normal',
    fontStyle:'normal',
    centeredrotation:true,
    originX:'center',
    originY:'center'
  });
  
  canvas.add(textObj);
  canvas.setActiveObject(textObj);
  canvas.renderAll();


  