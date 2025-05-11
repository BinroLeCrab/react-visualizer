import Track from "../Track/Track";

import s from "./Tracks.module.scss";
import { useEffect, useState } from "react";
import fetchJsonp from "fetch-jsonp";
import useStore from "../../utils/store";
import { fetchMetadata } from "../../utils/utils";
import TRACKS from "../../utils/TRACKS";
import { GridFour, ListDashes, MagnifyingGlass, X } from "@phosphor-icons/react";

const Tracks = ({ showTracks, setShowTracks }) => {
    // permet d'alterner entre true et false pour afficher / cacher le composant
    const { tracks, setTracks, constTracks, setConstTracks } = useStore();
    const [vue, setVue] = useState("grid");

    // écouter la variable tracks qui vient du store
    useEffect(() => {
        if (tracks.length > TRACKS.length) {
            setShowTracks(true);
        }
    }, [tracks]);

    useEffect(() => {
        fetchMetadata(TRACKS, tracks, setTracks, setConstTracks);
    }, []);

    const onKeyDown = (e) => {
        if (e.keyCode === 13 && e.target.value !== "") {
            // l'utilisateur à appuyé sur la touche entrée
            const userInput = e.target.value;

            e.target.value = "";

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
                onClick={(e) => {
                    if (e.target === e.currentTarget) {
                        setShowTracks(false);
                    }
                }}
            >
                <div className={s.tracksPopup}>
                    <div className={s.popupHeader}>
                        <MagnifyingGlass size={32} className={s.searchIcon} color="currentColor" />
                        <input
                            type="text"
                            placeholder="Chercher un artiste ou un morceau"
                            className={s.searchInput}
                            onKeyDown={onKeyDown}
                        />
                        <div className={s.vue}>
                            <button
                                className={`${s.vueButton} ${vue === "grid" ? s.active : ""}`}
                                onClick={() => setVue("grid")}
                            >
                                <GridFour size={32} color="currentColor" />
                            </button>
                            <button
                                className={`${s.vueButton} ${vue === "list" ? s.active : ""}`}
                                onClick={() => setVue("list")}
                            >
                                <ListDashes size={32} color="currentColor" />
                            </button>
                        </div>
                        <div
                            className={s.closeButton}
                            onClick={() => setShowTracks(false)}
                        >
                            <X size={32} color="currentColor" />
                        </div>
                    </div>
                    {
                        vue === "list" ? (
                            <div className={s.tracksList}>
                                <div className={s.header}>
                                    <span className={s.order}>#</span>
                                    <span className={s.title}>Titre</span>
                                    <span className={s.duration}>Durée</span>
                                </div>

                                {tracks.map((track, i) => (
                                    <Track
                                        variant="list"
                                        key={track.title + i}
                                        title={track.title}
                                        duration={track.duration}
                                        cover={track.album.cover_xl}
                                        artist={track?.artist}
                                        src={track.preview}
                                        index={i}
                                    />
                                ))}
                            </div>
                        ) : vue === "grid" ? (
                            <div className={s.tracksGrid}>

                                {tracks.map((track, i) => (
                                    <Track
                                        variant="grid"
                                        key={track.title + i}
                                        title={track.title}
                                        duration={track.duration}
                                        cover={track.album.cover_xl}
                                        artist={track?.artist}
                                        src={track.preview}
                                        index={i}
                                    />
                                ))}
                            </div>
                        ) : ""
                    }



                </div>
            </section>
        </>
    );
};

export default Tracks;