class ScreenBuffer{
    width;
    height;
    size;
    pixelbuffer;
    depthbuffer;
    clearformat;

    constructor(width,height){
        this.resize();
        this.clearformat = 0xff000000;
    }

    resize(width,height){
        this.width = width;
        this.height = height;
        this.size = width * height;
        this.pixelbuffer = new Uint32Array(this.size);
        this.depthbuffer = new Int32Array(this.size);
        this.clear();
    }

    clear(){
        this.pixelbuffer.fill(this.clearformat);
        this.depthbuffer.fill(0);
    }

    readDepth(){
        for(let i = 0;i<this.size;i++){
            this.pixelbuffer[i] = ((this.depthbuffer[i] * 0x010101) & 0xffffff) | 0xff0000ff;
        }
    }
}

class CanvasDriver{
    canvas;
    context;
    screenbuffer;
    imageData;

    constructor(canvas){
        this.canvas = canvas;
        this.screenbuffer = new ScreenBuffer(0,0);
        this.updateStructure();
    }

    updateStructure(){
        this.context = this.canvas.getContext('2d');
        this.screenbuffer.resize(this.canvas.width,this.canvas.height);
        this.imageData = new ImageData(new Uint8ClampedArray(this.screenbuffer.pixelbuffer.buffer),this.screenbuffer.width,this.screenbuffer.height);
    }

    swapBuffer(){
        this.context.putImageData(this.imageData,0,0);
    }
}

let canvas = document.getElementById('canvas');
let driver = new CanvasDriver(canvas);
function updateHeight() {
    document.body.style.height = window.innerHeight - 20 + "px";
    canvas.width = document.body.clientWidth;
    canvas.height = document.body.clientHeight;
    driver.updateStructure();
}
window.onresize = updateHeight;
updateHeight();