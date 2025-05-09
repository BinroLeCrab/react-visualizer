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
}));

export default useStore;