import { SpeakerHigh, SpeakerLow, SpeakerNone, SpeakerSlash, SpeakerX } from "@phosphor-icons/react";
import s from "./UiLeft.module.scss";
import audioController from "../../utils/AudioController";
import { useEffect, useRef, useState } from "react";


const UiLeft = () => {

    const [volume, setVolume] = useState(0);
    const [isMuted, setIsMuted] = useState(false);
    const rangeRef = useRef(null);

    const mute = () => {
        if (audioController == undefined) return;
        if (audioController.audio == undefined) return;

        if (audioController.audio.muted) {
            audioController.audio.muted = false;
            setIsMuted(false);
            setVolume(audioController.audio.volume * 100);
        } else {
            audioController.audio.muted = true;
            setIsMuted(true);
            setVolume(0);
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

    useEffect(() => {
        rangeRef.current?.style.setProperty('--value', `${volume}%`);
    }, [volume]);

    return (
        <div className={s.uiLeft}>
            <div className={s.volume}>
                <input ref={rangeRef} type="range" min="0" max="100" className={s.volumeRange} onChange={changeVolume} value={volume} />
                <button className={`${s.volumeButton} ${isMuted ? s.active : ""}`} onClick={mute}>
                    {
                        isMuted || volume <= 0
                            ? <SpeakerX size={28} color="currentColor" weight="regular" />
                                : !isMuted && volume <= 50
                                    ? <SpeakerLow size={28} color="currentColor" weight="regular" />
                                    : <SpeakerHigh size={28} color="currentColor" weight="regular" />}
                </button>
            </div>
        </div >
    );
};

export default UiLeft;