import { useState } from "react";
import s from "./Tempo.module.scss";
import audioController from "../../utils/AudioController";
import { update } from "three/examples/jsm/libs/tween.module.js";
import gsap from "gsap";

const Tempo= () => {

    const [bpm, setBpm] = useState(null);

    const updateBpm = () => {
        if (audioController.bpm !== bpm) {
            setBpm(audioController.bpm);
        }
    }

    gsap.ticker.add(updateBpm);

    return (
        bpm != null && <p className={s.tempo}>{bpm} bpm</p>
    );
};

export default Tempo;