import { useState } from "react";
import scene from "../../webgl/Scene";
import s from "./Picker.module.scss";

const VISUALIZERS = [
    {
        name: "Cover",
        index: 0,
    }, {
        name: "Line",
        index: 1,
    }, {
        name: "Board",
        index: 2,
    }, {
        name: "Logo Iut",
        index: 3,
    }, {
        name: "Cube",
        index: 4,
    }, {
        name: "CD",
        index: 5,
    }
];

const Picker = () => {

    const [current, setCurrent] = useState(0);

    const pickVisualizer = (index) => {
        setCurrent(index);
        scene.pickVisualizer(index);
    }

    return (
        <div className={s.picker}>
            {VISUALIZERS.map( (visualizer) => (
                <span
                    key={visualizer.name}
                    className={`${current === visualizer.index ? s.current : ""}`}
                    onClick={() => pickVisualizer(visualizer.index)}
                >
                    {visualizer.name}
                </span>
            ))}
        </div>
    );
};

export default Picker;