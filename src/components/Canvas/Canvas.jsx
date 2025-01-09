import s from "./Canvas.module.scss";
import scene from "../../webgl/Scene";
import { useEffect, useRef } from "react";
import audioController from "../../utils/AudioController";



const Canvas = () => {
  const canvasRef = useRef();

  const onClick = () => {
    audioController.play();
  };

  useEffect(() => {
    scene.setup(canvasRef.current);
  }, []);

  return <>
    <button className="play" onClick={onClick}>
      Play
    </button>
    <canvas ref={canvasRef}></canvas>;
  </>
};

export default Canvas;
