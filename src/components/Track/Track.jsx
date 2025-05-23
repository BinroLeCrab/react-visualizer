import audioController from "../../utils/AudioController";
import useStore from "../../utils/store";
import scene from "../../webgl/Scene";
import s from "./Track.module.scss";

const Track = ({ title, cover, src, duration, artist, index, variant, data }) => {
    const { currentTrack, setCurrentTrack } = useStore();

    const getSeconds = () => {
        const minutes = Math.floor(duration / 60);
        let seconds = Math.round(duration - minutes * 60);

        if (seconds < 10) {
            seconds = "0" + seconds;
        }

        return minutes + ":" + seconds;
    };

    const onClick = () => {
        audioController.play(src, data);
        scene.cover.setCover(cover);
        scene.cd.setCover(cover);
        setCurrentTrack(data);
    };

    return (
        variant === "list" ? (
            <div className={`${s.trackList} ${currentTrack?.id === data.id && s.active}`} onClick={onClick}>
            {/* <div className={s.trackList} onClick={onClick}> */}
                <span className={s.order}>{index + 1}</span>
                <div className={s.title}>
                    <img src={cover} alt="" className={s.cover} />
                    <div className={s.details}>
                        <span className={s.trackName}>{title}</span>
                        {artist && (
                            <span className={s.artistName}>
                                {artist.name}
                            </span>
                        )}
                    </div>
                </div>
                <span className={s.duration}>{getSeconds()}</span>
            </div>
        ) : variant === "grid" ? (
            <div className={`${s.trackGrid} ${currentTrack?.id === data.id && s.active}`} onClick={onClick}>
            {/* <div className={s.trackGrid} onClick={onClick}> */}
                <img src={cover} alt="" className={s.cover} />
                <div className={s.details}>
                    <span className={s.trackName}>{title}</span>
                    {artist && (
                        <span className={s.artistName}>
                            {artist.name}
                        </span>
                    )}
                </div>
                <img src="textures/CD.png" alt="" className={s.cd} />
                {/* <span className={s.duration}>{getSeconds()}</span> */}
            </div>
        ) : null
    );
};

export default Track;