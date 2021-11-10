import React, { createRef, useEffect } from "react";
import { Game } from "../../game/game";

export const GamePage = (): JSX.Element => {
    const canvasRef = createRef<HTMLCanvasElement>();

    useEffect(() => {
        if (!canvasRef.current) {
            throw new Error('Expected canvasRef.current to be defined');
        }
        const canvasSize = {
            width: canvasRef.current.width,
            height: canvasRef.current.height,
        };
        const context2d = canvasRef.current.getContext('2d');
        if (!context2d) {
            throw new Error('Expected context2d to be defined');
        }
        const game = new Game(canvasSize, context2d);
        game.start();
    }, [])

    return <canvas ref={canvasRef} width="500" height="500"></canvas>;
}
