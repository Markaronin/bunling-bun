import React from "react";
import { Link } from "react-router-dom";

export const LandingPage = (): JSX.Element => {
    return <div>Landing Page
        <br />
        <Link to={"/game"}>Start Game</Link>
    </div>
};
