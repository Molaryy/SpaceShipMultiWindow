const geoObject = document.querySelector(".geo-object");
let rotation = 0;
let isDown = false;
let canGoBack = false;
const startingPos = geoObject.getBoundingClientRect();
let countPositions = {
    x: 0,
    y: 0
}
const gravity = 0.5;

setInterval(() => {
    const updatedPos = geoObject.getBoundingClientRect();

    // geoObject.style.rotate = `${rotation}deg`;
    if (canGoBack) {
        const roundedValues = {
            updateX: Math.floor(updatedPos.x),
            updateY: Math.floor(updatedPos.y),
            startX: Math.floor(startingPos.x),
            startY:  Math.floor(startingPos.y)
        }
        countPositions.x = updatedPos.x;
        countPositions.y = updatedPos.y;
        if (roundedValues.updateX < roundedValues.startX) {
            countPositions.x +=  gravity;
        } else if (roundedValues.updateX > roundedValues.startX) {
            countPositions.x -=  gravity;
        }
        if (roundedValues.updateY < roundedValues.startY) {
            countPositions.y += gravity;
        } else if (roundedValues.updateY > roundedValues.startY){
            countPositions.y -= gravity;
        }
        if (roundedValues.updateX === roundedValues.startX && roundedValues.updateY === roundedValues.startY) {
            console.log("\n\n===========================\n\n")
            console.log("===========================")
            canGoBack = false;
        } else {
            console.log(roundedValues)
        }
        geoObject.style.left = countPositions.x + "px";
        geoObject.style.top = countPositions.y + "px";
    }

    rotation += 2;

    if (rotation >= 180) {
        rotation = 0;
    }
}, 10);

geoObject.addEventListener("mousedown", (e) => {
    isDown = true;
})

geoObject.addEventListener("mouseup", (e) => {
    isDown = false;
    canGoBack = true;
})

document.onmousemove = (e) => {
    if (!isDown){
        return;
    }
    const elementSize = {
        width: geoObject.offsetWidth,
        height: geoObject.offsetHeight
    };
    const mousePos = {
        x: e.pageX,
        y: e.pageY
    }
    geoObject.style.left = mousePos.x - elementSize.width / 2 + "px";
    geoObject.style.top = mousePos.y - elementSize.height / 2 + "px";
}
