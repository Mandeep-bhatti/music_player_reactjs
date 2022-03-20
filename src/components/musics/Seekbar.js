import React, { Fragment, useState, useCallback, useEffect } from 'react'
import "./Seekbar.css"
function Seekbar() {
    const [dragging, setDragging] = useState(false);
    const [seekbarWidth, setSeekbarWidth] = useState(0);
    const seekbarRef = React.useRef();

    const mouseMoveAction = (event) => {
        if (dragging === false) return;
        const totalWidth = seekbarRef.current.clientWidth
        const clickedWidth = event.nativeEvent.offsetX;
        const percentage = Math.floor(clickedWidth / totalWidth * 100)
        console.log(Math.floor(clickedWidth / totalWidth * 100));
        setSeekbarWidth(percentage);
    }

    const mouseDownEvent = useCallback(() => {
        setDragging(true)
    }, []);

    const mouseUpEvent = useCallback(() => {
        setDragging(false)
    }, []);

    useEffect(() => {
        window.addEventListener("mousedown", mouseDownEvent);
        window.addEventListener("mouseup", mouseUpEvent)
        return () => {
            window.removeEventListener("mousedown", mouseDownEvent);
            window.removeEventListener("mouseup", mouseUpEvent);
        }
    }, [mouseDownEvent, mouseUpEvent, dragging]);


    const defineSeekwidth = {
        width: `${seekbarWidth}%`
    }

    return (
        <Fragment>
            <div className="main-seek-container">
                <div className="seek-time-box">
                    <div>2.22</div>
                    <div>5.55</div>
                </div>
                <div
                    ref={seekbarRef}
                    onMouseMove={mouseMoveAction}
                    className="seekbar-line-box">
                    <div className="seekbar-outer">
                        <span
                            style={defineSeekwidth}
                            className="seekbar-inner">
                            <span className="rounder"></span>
                        </span>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default Seekbar