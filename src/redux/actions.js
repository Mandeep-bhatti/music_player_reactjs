import {
    NEXT_MUSIC,
    PRE_MUSIC
} from "./constants";



export const nextSong = () => dispatch => {
    dispatch({
        type: NEXT_MUSIC,
    })
}

export const preSong = () => dispatch => {
    dispatch({
        type: PRE_MUSIC,
    })
}