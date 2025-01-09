import { useState } from "react";
import audioController from "../../utils/AudioController";
import s from "./Landing.module.scss";
import Button from "../Button/Button";

const Landing = () => {
    const [hasClicked, setHasClicked] = useState(false);

    const onClick = () => {
        audioController.setup();
        setHasClicked(true);
    }

    return (
        <section
            className={`${s.Landing} ${hasClicked && s["landingPage--Hidden"]}`}>
            <div className={s.wrapper}>
                <h1 className={s.title}>Music Visualizer</h1>
                <p>
                    Projet conçu dans le cadre du cours Dispositifs intéractifs à l'IUT de Champs-sur-Marne.
                </p>
                <p>
                    Découverte et usage de three.js, gsap, la web Audio API...
                </p>
                <p>
                    Drag n drop de fichier mp3 pour pouvoir le visualiser.
                </p>
                <Button label="Commencer" onClick={onClick} />
            </div>
        </section>
    );
};

export default Landing;