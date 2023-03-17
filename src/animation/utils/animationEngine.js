import {createAndDrawAndAnimationBall} from "./animations/animationBall";

function mainAnimationEgine(event) {
    const prevCoord = {x: event.x, y: event.y};
    const newCoord = {x: event.payload.pass.x, y: event.payload.pass.y};
    switch (event.type) {
        case 'pass':
            return createAndDrawAndAnimationBall(prevCoord, newCoord);
            break;
        default:
    }
}

export {mainAnimationEgine};