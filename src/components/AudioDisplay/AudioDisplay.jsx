import useStore from "../../utils/store";
import s from "./AudioDisplay.module.scss";
import audioController from "../../utils/AudioController";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import scene from "../../webgl/Scene";
import Tempo from "../Tempo/Tempo";
import { Pause, Play, Repeat } from "@phosphor-icons/react";

const AudioDisplay = () => {

    const { currentTrack, setCurrentTrack } = useStore();
    const resetActionFlag = useRef(false);
    const progressBar = useRef(null);
    const [isPlaying, setIsPlaying] = useState(true);
    const [isLoop, setIsLoop] = useState(false);
    const favicon = document.querySelector("link[rel*='icon']");
    const defaultFavicon = "/favicon.ico";

    const endCheckAudio = () => {
        if (audioController == undefined) return;
        if (audioController.audio == undefined) return;

        if (progressBar != null) {
            progressBar.current.style.width = `${(audioController.audio.currentTime / audioController.audio.duration) * 100}%`;
        }

        if (audioController.audio.ended && !resetActionFlag.current) {
            resetActionFlag.current = true;
            console.log("finished");

            setTimeout(() => {

                if (audioController.audio.ended) {
                    audioController.reset();
                    scene.cd.reset();
                    setCurrentTrack({});

                    progressBar.current.style.width = `0%`;
                    console.log("reset");
                }

                resetActionFlag.current = false;
            }, 5000);
        }
    }
    gsap.ticker.add(endCheckAudio);

    const playPause = () => {
        if (audioController.audio.paused) {
            audioController.audio.play();
            setIsPlaying(true);
        } else {
            audioController.audio.pause();
            setIsPlaying(false);
        }
    }

    const loop = () => {
        if (audioController.audio.loop) {
            audioController.audio.loop = false;
            setIsLoop(false);
        } else {
            audioController.audio.loop = true;
            setIsLoop(true);
        }
    }

    useEffect(() => {
        if (currentTrack?.id) {
            setIsPlaying(true);
            favicon.href = currentTrack?.album?.cover_xl;
        } else {
            setIsPlaying(false);
            favicon.href = defaultFavicon;
        }
    }, [currentTrack]);

    return (
        <div className={`${s.audioDisplay} ${currentTrack?.id ? s.active : ""}`}>
            <div className={s.details}>
                <img src={currentTrack?.album?.cover_xl} alt="" className={s.cover} />
                <span className={s.trackInfo}>{currentTrack?.title} - <span className={s.artist}>{currentTrack?.artist?.name}</span></span>
            </div>
            <div className={s.actions}>
                <button className={s.playButton} onClick={playPause}>
                    {isPlaying ? (
                        <Pause size={28} color="currentColor" weight="fill" />
                    ) : (
                        <Play size={28} color="currentColor" weight="fill" />
                    )}
                </button>
                <button className={`${s.repeatButton} ${isLoop ? s.active : ""}`} onClick={loop}>
                    <Repeat size={28} color="currentColor" weight="fill" />
                </button>
            </div>
            <div className={s.progressBar}>
                <div ref={progressBar} className={s.progress}></div>
            </div>
            <Tempo />
        </div>
    );
};

export default AudioDisplay;