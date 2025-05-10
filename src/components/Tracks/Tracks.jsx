import Track from "../Track/Track";

import s from "./Tracks.module.scss";
import { useEffect, useState } from "react";
import fetchJsonp from "fetch-jsonp";
import useStore from "../../utils/store";
import { fetchMetadata } from "../../utils/utils";
import TRACKS from "../../utils/TRACKS";

const Tracks = ({showTracks ,setShowTracks}) => {
    // permet d'alterner entre true et false pour afficher / cacher le composant
    const { tracks, setTracks, constTracks, setConstTracks } = useStore();

    // écouter la variable tracks qui vient du store
    useEffect(() => {
        if (tracks.length > TRACKS.length) {
            setShowTracks(true);
        }
    }, [tracks]);

    // TODO : Slider (infini ou non) pour sélectionner les tracks

    // TODO : Fonction de tri / filtre sur les tracks, par nom, durée...

    // TODO : Récupérer les tracks du store

    useEffect(() => {
        fetchMetadata(TRACKS, tracks, setTracks, setConstTracks);
    }, []);

    const onKeyDown = (e) => {
        if (e.keyCode === 13 && e.target.value !== "") {
            // l'utilisateur à appuyé sur la touche entrée
            const userInput = e.target.value;

            //appeler la fontcion
            getSongs(userInput);
        }
    };

    const getSongs = async (userInput) => {
        let response = await fetchJsonp(
            `https://api.deezer.com/search?q=${userInput}&output=jsonp`
        );

        if (response.ok) {
            response = await response.json();

            const _tracks = [...constTracks];

            response.data.forEach((result) => {
                _tracks.push(result);
            });

            console.log(_tracks);
            setTracks(_tracks);
        } else {
        }

        console.log(response);
    };

    return (
        <>

            <section
                className={`
                ${s.wrapper}
                ${showTracks ? s.wrapper_visible : ""}`}
            >
                <div className={s.tracks}>
                    <div className={s.header}>
                        <span className={s.order}>#</span>
                        <span className={s.title}>Titre</span>
                        <span className={s.duration}>Durée</span>
                    </div>

                    {tracks.map((track, i) => (
                        <Track
                            key={track.title + i}
                            title={track.title}
                            duration={track.duration}
                            cover={track.album.cover_xl}
                            artist={track?.artist}
                            src={track.preview}
                            index={i}
                        />
                    ))}

                    <input
                        type="text"
                        placeholder="Chercher un artiste"
                        className={s.searchInput}
                        onKeyDown={onKeyDown}
                    />
                </div>
            </section>
        </>
    );
};

export default Tracks;