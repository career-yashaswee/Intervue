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
          color: 0x0099ff, // Customize the color
          backgroundColor: 0x000000, // Customize the background color
          skyColor: 0xffffff, // Customize the sky color
          cloudColor: 0xadc1de, // Customize the cloud color
        })
      );
    }

    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);

  return (
    <div ref={vantaRef} style={{ width: "100%", height: "100vh" }}>
      <Home />
    </div>
  );
};

export default Base;
