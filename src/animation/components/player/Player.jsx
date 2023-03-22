import React, {useEffect, useRef} from 'react';
import './player.css';

const Player = React.forwardRef((props, ref) => {
    const playerRef = useRef(null);

    const colorJersey = props?.event?.color ?? '#' + Math.floor(Math.random() * 16777215).toString(16);
    const numberJersey = props?.event?.jerseyNum ?? '10';
    const nameJersey = props?.event?.playerName ?? 'CALHANOGLU';
    const svgDimensionJersey = props?.dimensionJersey ?? '25';

    const svgDimensions = svgDimensionJersey;
    const svgDimensionsY = (parseInt(svgDimensions) + 10).toString();;
    const circleDimensions = (parseInt(svgDimensions)/2).toString();
    const circleRadius = (parseInt(circleDimensions) - 2).toString();
    const textY = (parseInt(circleDimensions) + 4).toString();
    const textNameY = (parseInt(circleDimensions) + 14).toString();

    return (
        <div ref={ref} id={nameJersey} className={'playerref'}>
            <svg width={svgDimensions} height={svgDimensionsY} ref={playerRef}>
                <circle cx={circleDimensions} cy={circleDimensions} r={circleRadius} fill={colorJersey} />
                <text x={circleDimensions} y={textY} textAnchor="middle" fontSize="10" fontWeight="bold" fill="white">
                    {numberJersey}
                </text>
                <text x={circleDimensions} y={textNameY} textAnchor="middle" fontSize="8" fontWeight="bold" fill="white">
                    {nameJersey}
                </text>
            </svg>
        </div>
    );
});

export default Player;