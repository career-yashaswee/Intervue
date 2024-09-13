import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import CLOUDS from "vanta/dist/vanta.clouds.min";
import Home from "./Home";

const Base = () => {
  const [vantaEffect, setVantaEffect] = useState(null);
  const vantaRef = useRef(null);

  useEffect(() => {
    if (!vantaEffect) {
      setVantaEffect(
        CLOUDS({
          el: vantaRef.current,
          THREE,
          color: 0x0099ff,
          backgroundColor: 0x000000,
          skyColor: 0xffffff,
          cloudColor: 0xadc1de,
          zoom: 3.5,
          speed: 1.5,
          minFrameTime: 5,
        })
      );
    }

    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);

  return (
    <div ref={vantaRef} style={{ width: "100vw", height: "100vh" }}>
      <Home />
    </div>
  );
};

export default Base;
