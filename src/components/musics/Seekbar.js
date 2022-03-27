import React, { Fragment, useState, useCallback, useEffect, memo } from 'react'
import "./Seekbar.css"
function Seekbar({ currentTime, updateCurruntTime, duration }) {
    const [dragging, setDragging] = useState(false);
    const [seekbarWidth, setSeekbarWidth] = useState(0);
    const [showCurrentTime, setShowCurrnTime] = useState({ minute: 0, second: 0 })
    const [durations, setDurations] = useState({ minute: 0, second: 0 })
    const seekbarRef = React.useRef();

    useEffect(() => {
        setDurations(
            {
                minute: Math.floor(duration / 60),
                second: Math.floor(duration % 60)
            }
        )
    }, [duration]);

    useEffect(() => {
        setShowCurrnTime({
            minute: Math.floor(currentTime / 60),
            second: Math.floor(currentTime % 60)
        })
        const percentageWidth = Math.floor(currentTime / duration * 100);
        setSeekbarWidth(percentageWidth)
    }, [currentTime, duration]);

    const mouseMoveAction = (event) => {
        if (dragging === false) return;
        const totalWidth = seekbarRef.current.clientWidth
        const clickedWidth = event.nativeEvent.offsetX;
        const percentage = Math.floor(clickedWidth / totalWidth * 100);
        updateCurruntTime(Math.floor(clickedWidth / totalWidth * duration));
        console.log(Math.floor(clickedWidth / totalWidth * duration));
        console.log()

        setSeekbarWidth(percentage);
    }

    const mouseDownEvent = useCallback(() => {
        setDragging(true)
    }, []);

    const mouseUpEvent = useCallback(() => {
        setDragging(false)
    }, []);

    React.useEffect(() => {
        window.addEventListener("mousedown", mouseDownEvent);
        window.addEventListener("mouseup", mouseUpEvent);
        return () => {
            window.removeEventListener("mousedown", mouseDownEvent);
            window.removeEventListener("mouseup", mouseUpEvent);
        };
    }, [mouseDownEvent, mouseUpEvent, dragging]);

    const defineSeekwidth = {
        width: `${seekbarWidth}%`
    }

    return (
        <Fragment>
            <div className="main-seek-container">
                <div className="seek-time-box">
                    <div>
                        {`${showCurrentTime.minute < 10 ? 0 : ""}${showCurrentTime.minute}:`}
                        {`${showCurrentTime.second < 10 ? 0 : ""}${showCurrentTime.second}`}
                    </div>
                    <div>
                        {`${durations.minute < 10 ? 0 : ""}${durations.minute}:`}
                        {`${durations.second < 10 ? 0 : ""}${durations.second}`}
                    </div>
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

export default memo(Seekbar)