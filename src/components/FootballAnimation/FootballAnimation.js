import React, { useRef, useEffect } from 'react';
import anime from 'animejs';
import Field from "../Field/field";
import {addRandomAnimationsWithPrevCoord, randomCoordinatesArray, randomCoordinatesMax500} from "../../utils/utils";
import './FootballAnimation.css';

function FootballAnimation() {
    const playerRef = useRef(null);
    const ballRef = useRef(null);
    const circlePlayerRef = useRef(null);

    useEffect(() => {
        const player = playerRef.current;
        const ball = ballRef.current;
        const circlePlayer = circlePlayerRef.current;


        let tlPlayer = anime.timeline({
            duration: 2000,
            easing: 'easeInOutQuad'
        });
        let tlBall = anime.timeline({
            duration: 2000,
            easing: 'easeInOutQuad'
        });
        let tlPlayerCircle = anime.timeline({
            duration: 2000,
            easing: 'easeInOutQuad'
        });

        addRandomAnimationsWithPrevCoord(tlPlayer, tlBall, tlPlayerCircle, player, ball, circlePlayer);


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
            <div
                ref={circlePlayerRef}
                className="player-circle"
                style={{ background: `url(/player/barella-circle.png) no-repeat center center / cover`, position: 'relative' }}
            />
            <div id="my-svg"></div>
        </Field>
    );
}

export default FootballAnimation;
