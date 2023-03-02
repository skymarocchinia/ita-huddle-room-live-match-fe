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

function delayer(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function generateUniqueId() {
    return 'id-' + Math.random().toString(36).substr(2, 16);
}


function drawAndAnimationBall(ballRef, tlBall, ball, newCoord, duration ) {
    const svg = document.getElementById('my-svg');

    tlBall.add({
        targets: ball,
        translateX: newCoord.x,
        translateY: newCoord.y,
        duration: duration,
        update: (anim) => {
            const uniqueId = generateUniqueId();
            // Create a new circle to represent the trail
            let trailCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            trailCircle.setAttribute('id', uniqueId);
            //console.log("anim.animations[0].currentValue) :: ", anim.animations[0].currentValue);
            trailCircle.setAttribute('cx', convertAnimationInTrailNumber(anim.animations[0].currentValue));
            //console.log("anim.animations[1].currentValue) :: ", anim.animations[1].currentValue);
            trailCircle.setAttribute('cy', convertAnimationInTrailNumber(anim.animations[1].currentValue));
            trailCircle.setAttribute('r', '3');
            trailCircle.setAttribute('fill', 'white');
            trailCircle.setAttribute('fill-opacity', '0.5');
            svg.appendChild(trailCircle);

            // Fade out the trail circle over 1 second
            anime({
                targets: trailCircle,
                duration: 2000,
                easing: 'linear',
                opacity: 0,
                complete: function(anim) {
                    svg.removeChild(trailCircle);
                    /*const circles = svg.querySelectorAll('[id="' + uniqueId + '"]');
                    circles.forEach((circle) => {
                        circle.remove();
                    });*/
                }
            });
        },
        complete: function(anim) {

        }
    });



    const prevCoord = newCoord;
    return prevCoord;
}

function addRandomAnimationsWithPrevCoord(ballRef, tlBall, ball, prevCoord) {
    const newCoord = generateRandomCoordinates(prevCoord);
    const duration = Math.floor(Math.random() * (2001 - 500) + 500);
    return drawAndAnimationBall(ballRef, tlBall, ball, newCoord, duration);
}

function generateRandomCoordinates(prevCoord) {
    const maxX = 400;
    const maxY = 300;

    const xRange = Math.min(maxX, prevCoord.x + 101) - Math.max(0, prevCoord.x - 100);
    const yRange = Math.min(maxY, prevCoord.y + 101) - Math.max(0, prevCoord.y - 100);

    const x = Math.floor(Math.random() * xRange) + Math.max(0, prevCoord.x - 100);
    const y = Math.floor(Math.random() * yRange) + Math.max(0, prevCoord.y - 100);

    return {
        x: x,
        y: y
    };
}

function convertAnimationInTrailNumber(animationNumber) {
    const animationSPlit = animationNumber.split('px');
    const animationNumberInTrail = parseFloat(animationSPlit[0]) - 5;
    //console.log("animationNumberInTrail :: ", animationNumberInTrail);
    //console.log("===========================");
    return animationNumberInTrail.toString() + "px";
}

export { randomCoordinatesMax500, randomCoordinatesArray, addRandomAnimationsWithPrevCoord, generateRandomCoordinates,
    convertAnimationInTrailNumber, delayer };