import { data } from "../../components/musics/data"
import {
    NEXT_MUSIC,
    PRE_MUSIC
} from "../constants";

const demo = (state = 0, action) => {
    switch (action.type) {
        case "DEMO": {
            return { data: state + 1 }
        }
        default: {
            return {
                data: state
            }
        }
    }
}
const controlOptions = {
    isPlaying: false,
    path: data[0].path,
    title: data[0].name,
    singer: data[0].singer,
    thumbnail: data[0].thumbnail,
    songIndex: 0,
    setPath: null
}
const Control = (state = controlOptions, action) => {

    switch (action.type) {

        case NEXT_MUSIC: {

            (state.songIndex >= data.length - 1)
                ? state.songIndex = 0
                : ++state.songIndex;

            const nextSog = data[state.songIndex];
            // console.log("next song condition", nextSog)
            state = {
                path: nextSog.path,
                title: nextSog.name,
                singer: nextSog.singer,
                thumbnail: nextSog.thumbnail,
                songIndex: state.songIndex
            }
            return { ...state }
        }
        case PRE_MUSIC: {

            (state.songIndex <= 0)
                ? state.songIndex = data.length - 1
                : --state.songIndex;

            const preSong = data[state.songIndex];

            console.log(preSong);
            return {
                path: preSong.path,
                title: preSong.name,
                singer: preSong.singer,
                thumbnail: preSong.thumbnail,
                songIndex: state.songIndex
            }
        }

        default: {
            return { ...state };
        }
    }
}
export const seekBar = (state, action) => {

}
export { demo, Control }