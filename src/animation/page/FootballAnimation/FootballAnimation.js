import React, { useRef, useEffect } from 'react';
import Field from "../../components/field/field";
import events from '../../assets/fakeEvents.json'


import './FootballAnimation.css';
import {
    createAnimationTimeline, timeline
} from "../../utils/utils";
import Ball from "../../components/ball/ball";
import Player from "../../components/player/Player";
import anime from "animejs";


function FootballAnimation() {
    const playerRef = useRef(null);
    const ballRef = useRef(null);

    const [event, setEvent] = React.useState(null);

    useEffect( () => {
        async function makeAnimation() {
            const newTimeline = anime.timeline({
                autoplay: true, // imposto autoplay a false per eseguire manualmente la timeline
            }); // creazione di una nuova istanza di anime.timeline()
            //setEvent(event)
            //await createAnimationTimeline(newTimeline, event);
            for (const event of events) {
                setEvent(event)
                await createAnimationTimeline(newTimeline, event);
            }
        }

        window.addEventListener('click', makeAnimation);
    return () => {
        window.removeEventListener('click', makeAnimation);
    };
}, []);

    return (
        <Field>
            <Ball ref={ballRef}></Ball>

            <svg id="soccer-svg" width="700" height="450"></svg>
        </Field>
    );
}

export default FootballAnimation;
