import { useState } from "react";
import scene from "../../webgl/Scene";
import s from "./Picker.module.scss";

const VISUALIZERS = [
    {
        name: "CD",
        icon: "icon/cd-box.svg",
        index: 5,
    }, {
        name: "Cover",
        icon: "icon/waves.svg",
        index: 0,
    }, {
        name: "Line",
        icon: "icon/waveform.svg",
        index: 1,
    }, {
        name: "Board",
        icon: "icon/equalizer.svg",
        index: 2,
    }, {
        name: "Logo Iut",
        icon: "icon/univ-eiffel.svg",
        index: 3,
    }, {
        name: "Cube",
        icon: "icon/cube.svg",
        index: 4,
    }
];

const Picker = () => {

    const [current, setCurrent] = useState(5);

    const pickVisualizer = (index) => {
        setCurrent(index);
        scene.pickVisualizer(index);
    }

    return (
        <div className={s.picker}>
            {VISUALIZERS.map((visualizer) => (
                <div
                    key={visualizer.name}
                    className={`${s.item} ${current === visualizer.index ? s.current : ""}`}
                    onClick={() => pickVisualizer(visualizer.index)}
                >
                    <span
                        className={s.name}>
                        {visualizer.name}
                    </span>
                    <img
                        src={visualizer.icon}
                        alt={visualizer.name}
                        className={s.icon}
                    />
                </div>
            ))
            }
        </div >
    );
};

export default Picker;