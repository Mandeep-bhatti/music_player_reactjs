import React, { Fragment } from "react"
import Controls from "./Controls"

import "./Music.css"

function Music() {

    const css = {
        backgroundImage: `linear-gradient(360deg,  rgba(0,0,0,.3) 0%,rgba(0,0,0,.0) 100%),url('./assets/1.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center"
    }
    return (
        <Fragment>
            <div className="main-container">
                <div className="main-box">
                    <div className="music-thumbnail" style={css}></div>
                    <div className="music-title"></div>
                    <Controls />
                </div>
            </div>
        </Fragment>
    )
}

export default Music