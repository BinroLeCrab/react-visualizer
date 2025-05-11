import { create } from "zustand";

const useStore = create((set) => ({
    tracks: [],
    setTracks: (_tracks) =>
        set(() => ({
            tracks: _tracks,
        })),
    constTracks: [],
    setConstTracks: (_tracks) =>
        set(() => ({
            constTracks: _tracks,
        })),
    currentTrack: {},
    setCurrentTrack: (_track) =>
        set(() => ({
            currentTrack: _track,
        })),
}));

export default useStore;