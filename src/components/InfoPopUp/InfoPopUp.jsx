import { Browser, GithubLogo, Info, LinkedinLogo, XCircle } from "@phosphor-icons/react";
import s from "./InfoPopUp.module.scss";
import { useState } from "react";

const InfoPopUp = () => {

    const [open, setOpen] = useState(false);

    return (
        <>
            <button className={`${s["InfoPopUp--Btn"]} ${open ? s.active : ""}`} onClick={() => setOpen(!open)}>
                {open ? <XCircle size={32} color="currentColor" />
                    : <Info size={32} color="currentColor" />}
            </button>

            {open && (
                <>
                    <div className={s["InfoPopUp--Overlay"]} onClick={() => setOpen(false)}></div>
                    <div className={s["InfoPopUp"]}>
                        <div className={s["InfoPopUp__content"]}>
                            <h1>💽 Music Visualizer</h1>
                            <p>Visualiseur audio réalisé en ThreeJs et React dans un cadre étudiant. Découverte et usage de la web Audio API et développement de scènes 3D réactives au son.</p>
                            <p>Possibilité de Drag n drop un fichier mp3 pour pouvoir le visualiser ou de rechercher un morceau dans le catalogue Deezer.</p>
                            <ul>
                                <li>📅 Mai 2025</li>
                                <li>🧑‍🚀 <a href="https://robinvigier.fr" target="__blank">Robin Vigier</a></li>
                                <li>🎓 Projet étudiant</li>
                                <li>✨ Three.js, ⚛️ React, 🦸 GSAP, 🖌️ Sass</li>
                            </ul>
                        </div>
                        <div className={s["InfoPopUp__social"]}>
                            <img className={s["InfoPopUp__social__picture"]} src="https://avatars.githubusercontent.com/u/144124953?v=4" alt="" />
                            <div className={s["InfoPopUp__social__name"]}>
                                <h2>Robin Vigier</h2>
                                <a href="https://github.com/BinroLeCrab" className="italic" target="__blank">@BinroLeCrab</a>
                                <p>🧑‍🚀 Développeur Front-End</p>
                            </div>
                            <div className={s["InfoPopUp__social__links"]}>
                                <a className={`${s["InfoPopUp__social__links__Item"]} ${s["prtf"]}`} href="https://robinvigier.fr" target="__blank" title="Mon Portfolio">
                                    <Browser weight="bold" size={28} />
                                </a>
                                <a className={`${s["InfoPopUp__social__links__Item"]} ${s["lkdin"]}`} href="https://www.linkedin.com/in/robin-vigier-02353b267/" target="__blank" title="Mon Linkedin">
                                    <LinkedinLogo weight="bold" size={28} />
                                </a>
                                <a className={`${s["InfoPopUp__social__links__Item"]} ${s["git"]}`} href="https://github.com/BinroLeCrab" target="__blank" title="Mon Github">
                                    <GithubLogo weight="bold" size={28} />
                                </a>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

export default InfoPopUp;

/* 
     _____     _____
    |  _  |   |  _  |
   -| | | |---| | | |-
    |_____| 7 |_____|  ~B!nro~
    
*/