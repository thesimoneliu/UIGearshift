class App {
    constructor(){
        this.handler = document.querySelector(".handler");
        this.sbtn = document.querySelector(".sbtn");
        this.viewport = {};
        this.mouseX = {
            current: 0,
            target: 0,
            lerp: 0.1
        };
        this.mouseY = {
            current: 0,
            target: 0,
            lerp: 0.1
        };
        this.addEventListeners(this.handler);
        this.update();
    }
    transformFromViewportToSVGElement(x, y, sctm, elementTransform = null) {
        // Transforms coordinates from the client (viewport) coordinate
        // system to coordinates in the SVG element's coordinate system.
        // Call this, for example, with clientX and clientY from mouse event.
        // create a new DOM point based on coordinates from client viewport
        const p = new DOMPoint(x, y);
        // invert sctm, so we can transform from screen/viewport to element
        // transform the point using the inverted matrix
        const transformedPoint = p.matrixTransform(sctm.inverse());
        // adjust the point for the currently applied scale on the element
        if (elementTransform !== null) {
            transformedPoint.x *= elementTransform[0] // scale x
            ;
            transformedPoint.y *= elementTransform[3] // scale y
            ;
        }
        return {
            x: transformedPoint.x,
            y: transformedPoint.y
        };
    }
    /* -------------
   ------------ EVENTS
   -------------- */ onResize() {
        this.viewport.width = window.innerWidth;
        this.viewport.height = window.innerHeight;
        window.requestAnimationFrame((_)=>{});
    }
    onTouchStart({ clientX , clientY  }) {}
    onTouchMove({ clientX , clientY  }) {
        this.mouseX.current = clientX;
        this.mouseY.current = clientY;
    }
    onTouchEnd({ clientX , clientY  }) {}
    /* -------------
   ------------ LOOPS & FRAMES
   -------------- */ update() {
        // get svg matrix and turn it into an array
        const MATRIX_STR = document.getElementById("gear__svg-active__wrapper").getAttribute("transform");
        const MATRIX = MATRIX_STR.replace(/^matrix\(/, "").replace(/\)$/, "").split(",").map(parseFloat);
        // get the transform matrix used to convert from the SVG element's coordinates to the screen/viewport coordinate system
        const SCTM = document.getElementById("gear__svg-active__wrapper").getScreenCTM();
        const mouseStart = this.transformFromViewportToSVGElement(this.mouseX.current, this.mouseY.current, SCTM, MATRIX);
        console.log(SCTM);
        // update next frames
        this.frame = window.requestAnimationFrame(this.update.bind(this));
    }
    /* -------------
  ------------ LISTENERS
  -------------- */ addEventListeners(element) {
        element.addEventListener("mousedown", this.onTouchStart.bind(this));
        element.addEventListener("mousemove", this.onTouchMove.bind(this));
        element.addEventListener("mouseup", this.onTouchEnd.bind(this));
        element.addEventListener("touchstart", this.onTouchStart.bind(this));
        element.addEventListener("touchmove", this.onTouchMove.bind(this));
        element.addEventListener("touchend", this.onTouchEnd.bind(this));
        window.addEventListener("resize", this.onResize.bind(this));
    }
}
new App() /* -------------
  ------------ WEBSOCKET
  -------------- */ ;

//# sourceMappingURL=index.7c0ccee6.js.map
