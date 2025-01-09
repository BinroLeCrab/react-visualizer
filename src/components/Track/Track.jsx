import s from "./Track.module.scss";

const Track = ({index, title, artist, cover, duration}) => {

    const getSeconds = () => {
        const minutes = Math.floor(duration / 60);
        const seconds = duration - minutes * 60;
        return minutes + ":" + seconds;
    }

    return (
        <div className={s.track}>
            <span className={s.order}>{index + 1}</span>
            <div className={s.title}>
                <img className={s.cover} src={cover} alt="" />
                <div className={s.details}>
                    <span className={s.trackName}>{title}</span>
                    {artist.map((artist, index) => (
                        <span key={index} className={s.artistName}>{artist}</span>
                    ))}
                </div>
            </div>
            <span className={s.duration}>{getSeconds()}</span>
        </div>
    );
};

export default Track;