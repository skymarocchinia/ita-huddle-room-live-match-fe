import React, { useRef, useEffect } from 'react';
import anime from 'animejs';
import Field from "../Field/field";
import {addRandomAnimationsWithPrevCoord, randomCoordinatesArray, randomCoordinatesMax500} from "../../utils/utils";
import './FootballAnimation.css';

function FootballAnimation() {
    const playerRef = useRef(null);
    const ballRef = useRef(null);

    useEffect(() => {
        const player = playerRef.current;
        const ball = ballRef.current;


        let tl = anime.timeline({
            duration: 2000,
            easing: 'easeInOutQuad'
        });

        addRandomAnimationsWithPrevCoord(tl, player, ball);


    }, []);

    return (
        <Field>
            <div
                ref={playerRef}
                className={'player'}
            />
            <div
                ref={ballRef}
                className="football-ball"
                style={{ background: `url(/soccer-ball.png) no-repeat center center / cover`, position: 'relative' }}
            />
        </Field>
    );
}

export default FootballAnimation;
