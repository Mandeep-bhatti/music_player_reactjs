import React, { Fragment, useState, useRef, useCallback } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { nextSong, preSong } from "../../redux/actions";
import Seekbar from "./Seekbar"
import "./Control.css";

function Controls() {

    const dispatch = useDispatch();
    const state = useSelector((state) => state.Control);
    console.log("components rendring")
    const [isPlaying, setPlaying] = useState(false);
    const [curentPlayTime, setPlayTime] = useState(0)
    const [duration, setDuration] = useState(0)
    const audioElement = useRef();

    const SongPath = React.useMemo(() => {
        return state.path
    }, [state.path])

    const handleMusic = React.useCallback(() => {
        if (audioElement.current.paused) {
            setPlaying(true)
            audioElement.current.play()
        } else {
            setPlaying(false)
            audioElement.current.pause()
        }
    }, []);

    const myNextSong = useCallback(() => {
        dispatch(nextSong());
        audioElement.current.pause();
        audioElement.current.load();
        audioElement.current.play();
    }, [dispatch])

    const prePlaySong = useCallback(() => {
        dispatch(preSong());
        audioElement.current.pause();
        audioElement.current.load();
        audioElement.current.play();
    }, [dispatch]);

    const updateTiming = (event) => {
        setTimeout(() => {
            // cons ole.log(event.target.currentTime)
            setPlayTime(event.target.currentTime)
        }, 1000)

    }
    return (
        <Fragment>
            <Seekbar
                currentTime={curentPlayTime}
                duration={duration}

            />
            <div className="main-control">
                <div
                    onClick={prePlaySong}
                    className="pre-btn">
                    <i className="fa-solid fa-backward"></i>
                </div>
                <div
                    onClick={handleMusic}
                    className="play-pause">
                    {
                        isPlaying ? <i className="fa-solid fa-pause anim"></i>
                            : <i className="fa-solid fa-play anim"></i>
                    }
                </div>
                <audio
                    onTimeUpdate={updateTiming}
                    onEnded={myNextSong}
                    ref={audioElement}>
                    <source src={SongPath} />
                </audio>
                <div
                    onClick={myNextSong}
                    className="next-btn">
                    <i className="fa-solid fa-forward"></i>
                </div>
            </div>
        </Fragment>
    )
}


export default Controls