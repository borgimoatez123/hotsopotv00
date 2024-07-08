// src/components/Panorama.js
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { ImagePanorama, Viewer } from 'panolens';
import panoramaImage1 from '../panel1.jpeg';
import panoramaImage2 from '../2pp.jpg';

const Panorama = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const panorama1 = new ImagePanorama(panoramaImage1);
    const panorama2 = new ImagePanorama(panoramaImage2);

    const viewer = new Viewer({
      container: containerRef.current,
      autoRotate: true,
      autoRotateSpeed: 0.3,
      controlBar: true,
    });

    const infospotPositions = [
      new THREE.Vector3(-2136.06, 16.30, 890.14),
      new THREE.Vector3(-3136.06, 296.30, -4290.14),
    ];

    panorama1.link(panorama2, infospotPositions[0]);
    panorama2.link(panorama1, infospotPositions[1]);

    viewer.add(panorama1, panorama2);

    // Store the viewer and panoramas for later access
    containerRef.current.viewer = viewer;
    containerRef.current.panoramas = { panorama1, panorama2 };
  }, []);

  const switchToPanorama1 = () => {
    containerRef.current.viewer.setPanorama(containerRef.current.panoramas.panorama1);
  };

  const switchToPanorama2 = () => {
    containerRef.current.viewer.setPanorama(containerRef.current.panoramas.panorama2);
  };

  return (
    <div style={{ height: '100vh', overflow: 'hidden' }}>
      <div
        ref={containerRef}
        style={{ width: '100%', height: '100%', backgroundColor: '#000' }}
      ></div>
      <div style={{ position: 'fixed', top: '10px', left: '10px', zIndex: 1 }}>
 
      </div>
    </div>
  );
};

export default Panorama;
