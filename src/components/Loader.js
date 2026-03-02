// src/components/Loader.js
import Lottie from 'lottie-web';
import React, { useEffect, useState, useContext } from 'react'; // Re-import useState
import { ModelLoadingState } from '../utils/ModelLoadingState';
import { ThemeContext } from '../context/ThemeContext'; // Import ThemeContext

import { useTranslation } from 'react-i18next';

const Loader = ({ onLoadComplete }) => {
    const { t } = useTranslation();
    const { theme } = useContext(ThemeContext);
    const animationData = '/assets/svg/loader.json';
    const [hasCompletedOneCycle, setHasCompletedOneCycle] = useState(false); // State lock

    useEffect(() => {
        const animation = Lottie.loadAnimation({
            container: document.getElementById("logo_box"),
            renderer: 'svg',
            loop: false,
            autoplay: true,
            path: animationData,
        });

        // Polling to check conditions for ending the loader
        const intervalId = setInterval(() => {
            // Conditions to end: models loaded AND at least one animation cycle is complete
            if (ModelLoadingState.isModelsLoaded && hasCompletedOneCycle) {
                clearInterval(intervalId); // Conditions met, clear interval
                // Trigger exit animation
                animation.removeEventListener('enterFrame', handleFrame);
                animation.goToAndStop(55, true);
                animation.play();
            }
        }, 100); // Check every 100ms

        const handleFrame = () => {
            if (animation.currentFrame >= 55) {
                // Mark that the first cycle has completed
                if (!hasCompletedOneCycle) {
                    setHasCompletedOneCycle(true);
                }
                
                // If models are not loaded yet, loop the animation
                if (!ModelLoadingState.isModelsLoaded) {
                    animation.goToAndStop(0, true);
                    animation.play();
                }
            }
        };

        animation.addEventListener('enterFrame', handleFrame);

        animation.addEventListener('complete', () => {
            const loaderElement = document.querySelector('.loader');
            if (loaderElement) {
                loaderElement.classList.add('loader-exit');
            }
            setTimeout(() => {
                onLoadComplete && onLoadComplete();
            }, 500);
        });

        return () => {
            clearInterval(intervalId); // Ensure interval is cleared on component unmount
            animation.removeEventListener('enterFrame', handleFrame);
            animation.destroy();
        };
    }, [onLoadComplete, hasCompletedOneCycle]); // Add hasCompletedOneCycle to dependency array


    return (
        <div className="loader flex flex-col items-center justify-center h-screen bg-white dark:bg-black text-black dark:text-white">
            <div
                id="logo_box"
                className="w-[150px] h-[150px] lottie-color-swap" // Use existing class for consistency
            ></div>
            <p className="text-2xl font-bold mt-5">
                {t('loader.loading')}
            </p>
        </div>
    );
};

export default Loader;
