import Canvas from "./components/Canvas/Canvas";
import Landing from "./components/Landing/Landing";
import Tracks from "./components/Tracks/Tracks";
import Picker from "./components/Picker/Picker";
import Dropzone from "./components/Dropzone/Dropzone";
import { useState } from "react";
import UiBottom from "./components/UiBottom/UiBottom";

function App() {

	const [showTracks, setShowTracks] = useState(false);

	return (
		<>
			<Landing />
			<Picker />
			<Dropzone />
			<UiBottom showTracks={showTracks} setShowTracks={setShowTracks} />
			<Tracks showTracks={showTracks} setShowTracks={setShowTracks} />
			<Canvas />
		</>
	);
}

export default App;
