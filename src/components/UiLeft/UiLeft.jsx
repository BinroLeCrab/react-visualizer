import { SpeakerHigh } from "@phosphor-icons/react";
import s from "./UiLeft.module.scss";
import audioController from "../../utils/AudioController";
import { useEffect, useState } from "react";


const UiLeft = () => {

    const [volume, setVolume] = useState(0);

    const mute = () => {
        if (audioController == undefined) return;
        if (audioController.audio == undefined) return;

        if (audioController.audio.muted) {
            audioController.audio.muted = false;
        } else {
            audioController.audio.muted = true;
        }
    }

    const changeVolume = (e) => {
        if (audioController == undefined) return;
        if (audioController.audio == undefined) return;

        audioController.audio.volume = e.target.value / 100;
        setVolume(e.target.value);
    }

    useEffect(() => {
        if (audioController == undefined) return;
        if (audioController.audio == undefined) return;

        setVolume(audioController.audio.volume * 100);
    }, [audioController.audio]);

    return (
        <div className={s.uiLeft}>
            <div className={s.volume}>
                <input type="range" min="0" max="100" className={s.volumeRange} onChange={changeVolume} value={volume}/>
                <button className={s.volumeButton} onClick={mute}>
                    <SpeakerHigh size={28} color="currentColor" weight="fill" />
                </button>
            </div>
        </div >
    );
};

export default UiLeft;