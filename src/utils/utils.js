import jsmediatags from "jsmediatags/dist/jsmediatags.min.js";

let coverPlaceholder = "https://placehold.co/400x400";

export const fetchMetadata = async (TRACKS, tracks, setTracks, setConstTracks) => {
    const promises = TRACKS.map(
        (track) =>
            new Promise((resolve, reject) => {
                // get duration
                const audio = new Audio(track.path);
                audio.addEventListener("loadedmetadata", () => {
                    // Fetch the MP3 file as a Blob
                    fetch(track.path)
                        .then((response) => {
                            if (!response.ok) {
                                throw new Error(`Failed to fetch ${track.path}`);
                            }
                            return response.blob();
                        })
                        .then((blob) => {
                            // Read metadata from the Blob
                            jsmediatags.read(blob, {
                                onSuccess: (tag) => {
                                    const { title, artist, album, picture } = tag.tags;
                                    // Extract cover image if it exists
                                    let cover = coverPlaceholder; // Default cover image
                                    if (picture) {
                                        const base64String = btoa(
                                            picture.data
                                                .map((char) => String.fromCharCode(char))
                                                .join("")
                                        );
                                        cover = `data:${picture.format};base64,${base64String}`;
                                    }

                                    resolve({
                                        id: track.id,
                                        name: track.name,
                                        title: title || track.name,
                                        duration: audio.duration,
                                        artist: {
                                            name: artist || track.artist || "Unknown Artist",
                                        },
                                        album: {
                                            cover_medium: cover,
                                            cover_xl: cover,
                                            title: album || "Unknown Album",
                                        },
                                        preview: track.path,
                                    });
                                },
                                onError: (error) => {
                                    console.error(
                                        `Error reading metadata for ${track.name}:`,
                                        error
                                    );
                                    resolve({
                                        id: track.id,
                                        name: track.name,
                                        title: track.name,
                                        duration: audio.duration,
                                        artist: {
                                            name: track.artist || "Unknown Artist",
                                        },
                                        album: {
                                            cover_medium: coverPlaceholder,
                                            cover_xl: coverPlaceholder,
                                            title: "Unknown Album",
                                        },
                                        preview: track.path,
                                    });
                                },
                            });
                        })
                        .catch((error) => {
                            console.error(`Failed to fetch ${track.name}:`, error);
                            reject(error);
                        });
                });
            })
    );
    try {
        const results = await Promise.all(promises);

        // récupérer le tableau de tracks du store existant
        const _tracks = [...tracks];

        // pour chaque track processed par la librairie pour récupérer les metadata
        results.forEach((result) => {
            _tracks.push(result);
        });

        

        // màj le store
        setTracks(_tracks);
        setConstTracks(_tracks);

        // _tracks.push(results)
    } catch (error) {
        console.error("Error fetching metadata:", error);
    }
};