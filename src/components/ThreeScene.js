// src/components/ThreeScene.js
import React, { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createScene } from '../utils/SceneCreator';
import { createEventHandlers } from '../utils/EventHandlers';
import { animateScene } from '../utils/SceneAnimator';
import { updateCameraPosition } from '../utils/CameraControler';

const ThreeScene = () => {
    const mountRef = useRef(null);
    const navigate = useNavigate();
    const [style, setStyle] = useState({});

    const updateLayout = () => {
        const navbarHeight = document.querySelector('.navbar')?.offsetHeight || 0;
        const footerHeight = document.querySelector('.footer')?.offsetHeight || 0;
        const newHeight = `calc(100vh - ${navbarHeight + footerHeight}px)`;
        
        setStyle({
            position: 'fixed',
            top: `${navbarHeight}px`,
            left: 0,
            width: '100%',
            height: newHeight,
            zIndex: -1
        });
    };

    useEffect(() => {
        updateLayout();
        window.addEventListener('resize', updateLayout);
        return () => window.removeEventListener('resize', updateLayout);
    }, []);

    useEffect(() => {
        if (Object.keys(style).length === 0) return;

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
    }, [style, navigate]);

    return (
        <div
            ref={mountRef}
            style={style}
        />
    );
};

export default ThreeScene;
