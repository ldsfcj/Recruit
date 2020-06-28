import React from "react";

import "./logo.less";
import uniMelbourne_logo from "./unimelb_logo.png";

export default function Logo() {
    return (
        <div className="logo-container">
            <img src={uniMelbourne_logo} alt="logo" className="logo-img"/>
        </div>
    )
}