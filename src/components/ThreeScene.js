// src/components/ThreeScene.js
import React, { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createScene } from '../utils/SceneCreator';
import { createEventHandlers } from '../utils/EventHandlers';
import { animateScene } from '../utils/SceneAnimator';
import { updateCameraPosition } from '../utils/CameraControler';
import { modelStore } from '../utils/ModelStore';

const ThreeScene = () => {
    const mountRef = useRef(null);
    const navigate = useNavigate();
    const [height, setHeight] = useState('100vh');
    const [initComplete, setInitComplete] = useState(false);

    const updateHeight = () => {
        const navbarHeight = document.querySelector('.navbar')?.offsetHeight || 0;
        const footerHeight = document.querySelector('.footer')?.offsetHeight || 0;
        const newHeight = `calc(100vh - ${navbarHeight + footerHeight}px)`;
        setHeight(newHeight);
    };

    useEffect(() => {
        updateHeight();
        window.addEventListener('resize', updateHeight);
        return () => window.removeEventListener('resize', updateHeight);
    }, []);

    useEffect(() => {
        if (height !== '100vh') {
            setInitComplete(true);
        }
    }, [height]);

    useEffect(() => {
        if (!initComplete) return;

        let scene, camera, renderer, faceMeshes, updateRotationSpeed;
        let onMouseMove, onMouseDown, onMouseUp, onMouseClick;
        const mountElement = mountRef.current;

        // Create scene only on initialization
        const initScene = () => {
            ({ scene, camera, renderer, faceMeshes } = createScene(mountElement, navigate));
            updateRotationSpeed = animateScene(renderer, scene, camera, faceMeshes);
            ({ onMouseClick, onMouseMove, onMouseDown, onMouseUp } = createEventHandlers(mountElement, camera, faceMeshes, navigate, updateRotationSpeed));

            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mousedown', onMouseDown);
            window.addEventListener('mouseup', onMouseUp);
            window.addEventListener('click', onMouseClick);
            window.addEventListener('resize', handleResize);
        };

        const handleMouseMove = (event) => {
            onMouseMove(event);
            updateCameraPosition(camera, event.clientX, event.clientY, mountElement.clientWidth, mountElement.clientHeight);
        };

        const handleResize = () => {
            const width = mountElement.clientWidth;
            const height = mountElement.clientHeight;
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
            renderer.setSize(width, height);
        };

        initScene();

        return () => {
            mountElement.removeChild(renderer.domElement);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mousedown', onMouseDown);
            window.removeEventListener('mouseup', onMouseUp);
            window.removeEventListener('click', onMouseClick);
            window.removeEventListener('resize', handleResize);
        };
    }, [initComplete, navigate]);

    return (
        <div
            ref={mountRef}
            style={{ position: 'absolute', top: 0, left: 0, width: '100vw', height: height }}
        />
    );
};

export default ThreeScene;
