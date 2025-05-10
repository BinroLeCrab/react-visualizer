import { VinylRecord } from "@phosphor-icons/react";
import s from "./UiBottom.module.scss";

const UiBottom = ({ showTracks, setShowTracks }) => {

    return (
        <div className={s.uiBottom}>
            <div
                className={`${s.toggleTracks} ${
                    showTracks ? s.active : ""
                }`}
                onClick={() => setShowTracks(!showTracks)}
            >
                <VinylRecord size={32} color="currentColor" />
                Tracklist
            </div>
        </div>
    );
};

export default UiBottom;