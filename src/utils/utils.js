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

function addRandomAnimationsWithPrevCoord(tlPlayer, tlBall, tlPlayerCircle, player, ball, circlePlayer) {
    let prevCoord = {
        x: 0,
        y: 0,
    };

    const svg = document.getElementById('my-svg');
    const lines = [];

    const randomAnimations = new Array(20).fill().map(() => {
        const newCoord = generateRandomCoordinates(prevCoord);
        const duration = Math.floor(Math.random() * (2001 - 500) + 500);
        tlPlayer.add({
            targets: player,
            translateX: newCoord.x,
            translateY: newCoord.y,
            duration: duration
        });
        tlPlayerCircle.add({
            targets: circlePlayer,
            translateX: newCoord.x,
            translateY: newCoord.y,
            duration: duration,
            update: (anim) => {
                // Crea una nuova linea che collega il punto alla posizione precedente
                const newLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
                newLine.setAttribute('x1', prevCoord.x);
                newLine.setAttribute('y1', prevCoord.y);
                newLine.setAttribute('x2', anim.animations[0].currentValue);
                newLine.setAttribute('y2', anim.animations[1].currentValue);
                newLine.setAttribute('stroke', 'white');
                svg.appendChild(newLine);
                lines.push(newLine);
            }
        });
        tlBall.add({
            targets: ball,
            translateX: newCoord.x,
            translateY: newCoord.y,
            duration: duration
        });
        prevCoord = newCoord;
    });
}

function generateRandomCoordinates(prevCoord) {
    const maxX = 400;
    const maxY = 300;

    const xRange = Math.min(maxX, prevCoord.x + 101) - Math.max(0, prevCoord.x - 100);
    const yRange = Math.min(maxY, prevCoord.y + 101) - Math.max(0, prevCoord.y - 100);

    const x = Math.floor(Math.random() * xRange) + Math.max(0, prevCoord.x - 100);
    const y = Math.floor(Math.random() * yRange) + Math.max(0, prevCoord.y - 100);

    return { x, y };
}



export { randomCoordinatesMax500, randomCoordinatesArray, addRandomAnimationsWithPrevCoord };