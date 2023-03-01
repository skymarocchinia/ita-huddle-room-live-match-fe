import anime from "animejs";

function randomCoordinatesMax500() {
    return {
        x: Math.floor(Math.random() * 700),
        y: Math.floor(Math.random() * 400)
    };
}

function randomCoordinatesArray() {
    const coordinates = randomCoordinatesMax500();
    return [coordinates.x, coordinates.y];
}

function addRandomAnimationsWithPrevCoord(tl, player, ball) {
    let prevCoord = {
        x: 0,
        y: 0,
    };

    const randomAnimations = new Array(20).fill().map(() => {
        const newCoord = generateRandomCoordinates(prevCoord);
        const duration = Math.floor(Math.random() * (2001 - 500) + 500);
        prevCoord = newCoord;
        return tl.add({
            targets: [player, ball],
            translateX: newCoord.x,
            translateY: newCoord.y,
            duration: duration
        });
    });

    return randomAnimations;
}

function generateRandomCoordinates(prevCoord) {
    const maxX = 500;
    const maxY = 300;

    const xRange = Math.min(maxX, prevCoord.x + 101) - Math.max(0, prevCoord.x - 100);
    const yRange = Math.min(maxY, prevCoord.y + 101) - Math.max(0, prevCoord.y - 100);

    const x = Math.floor(Math.random() * xRange) + Math.max(0, prevCoord.x - 100);
    const y = Math.floor(Math.random() * yRange) + Math.max(0, prevCoord.y - 100);

    return { x, y };
}



export { randomCoordinatesMax500, randomCoordinatesArray, addRandomAnimationsWithPrevCoord };