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
                <h1 className={s.title}>💽 Music Visualizer</h1>
                <p className={s.subtitle}>🧑‍🚀 Vigier Robin | 📅 Mai 2025</p>
                <div className={s.paragraph}>
                    <p>Visualiseur audio réalisé en ThreeJs et React dans un cadre étudiant.</p>
                    <p>Découverte et usage de la web Audio API et développement de scènes 3D réactives au son.</p>
                    <p>Possibilité de Drag n drop un fichier mp3 pour pouvoir le visualiser ou de rechercher un morceau dans le catalogue Deezer.</p>
                </div>

                <Button label="Commencer" onClick={onClick} />
            </div>
        </section>
    );
};

export default Landing;