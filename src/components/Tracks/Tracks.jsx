import { useEffect } from "react";
import Track from "../Track/Track";
import s from "./Tracks.module.scss";
import danceTheNight from "/dance-the-night.mp3";
import Daisy from "/WetLeg-Daisy.mp3";
import useStore from "../../utils/store";

const Tracks = () => {
    const { tracks, setTracks } = useStore();

    useEffect(() => {
        const audio = new Audio(Daisy);
        audio.addEventListener('loadedmetadata', (e) => {
            console.log(e)
            console.log(audio.duration);
        });
    }, [])

    // const tracks = [
    //     {
    //         title: "The Rise and Fall of Ziggy Stardust and the Spiders from Mars",
    //         duration: "300",
    //         artist: ["David Bowie"],
    //         cover: "https://placehold.co/40x40"
    //     },
    //     {
    //         title: "Bohemian Rhapsody",
    //         duration: "354",
    //         artist: ["Queen"],
    //         cover: "https://placehold.co/40x40"
    //     },
    //     {
    //         title: "Stairway to Heaven",
    //         duration: "482",
    //         artist: ["Led Zeppelin"],
    //         cover: "https://placehold.co/40x40"
    //     },
    //     {
    //         title: "Hotel California",
    //         duration: "391",
    //         artist: ["Eagles"],
    //         cover: "https://placehold.co/40x40"
    //     },
    //     {
    //         title: "Imagine",
    //         duration: "183",
    //         artist: ["John Lennon"],
    //         cover: "https://placehold.co/40x40"
    //     },
    //     {
    //         title: "Smells Like Teen Spirit",
    //         duration: "301",
    //         artist: ["Nirvana"],
    //         cover: "https://placehold.co/40x40"
    //     },
    //     {
    //         title: "Billie Jean",
    //         duration: "294",
    //         artist: ["Michael Jackson"],
    //         cover: "https://placehold.co/40x40"
    //     },
    //     {
    //         title: "Like a Rolling Stone",
    //         duration: "369",
    //         artist: ["Bob Dylan"],
    //         cover: "https://placehold.co/40x40"
    //     },
    //     {
    //         title: "Hey Jude",
    //         duration: "431",
    //         artist: ["The Beatles"],
    //         cover: "https://placehold.co/40x40"
    //     },
    //     {
    //         title: "Purple Haze",
    //         duration: "170",
    //         artist: ["Jimi Hendrix"],
    //         cover: "https://placehold.co/40x40"
    //     },
    //     {
    //         title: "What's Going On",
    //         duration: "233",
    //         artist: ["Marvin Gaye"],
    //         cover: "https://placehold.co/40x40"
    //     }
    // ];

    return (
        <section className={s.wrapper}>
            <div className={s.tracks}>
                <div className={s.header}>
                    <span className={s.order}>#</span>
                    <span className={s.title}>Titre</span>
                    <span className={s.duration}>Durée</span>
                </div>

                {tracks.map((track, index) => (

                    <Track
                        key={index}
                        index={index}
                        title={track.title}
                        artist={track.artist}
                        cover={track.cover}
                        duration={track.duration}
                    />
                ))}
            </div>
        </section>
    );
};

export default Tracks;