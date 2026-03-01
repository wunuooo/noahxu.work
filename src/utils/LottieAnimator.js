import Lottie from 'lottie-web';
import React, { useEffect, useRef } from 'react';

const LottieAnimator = ({
    animationMode = 'scroll', // 'scroll' or 'fadeLoop'
}) => {
    const animationContainer = useRef(null);
    const animationInstance = useRef(null);
    const animationData = '/assets/svg/nuo.json';

    useEffect(() => {
        const container = animationContainer.current;
        if (!container) return;

        animationInstance.current = Lottie.loadAnimation({
            container: container,
            renderer: 'svg',
            loop: false, // We will control looping manually
            autoplay: animationMode === 'fadeLoop', // Autoplay only for fadeLoop mode
            path: animationData,
        });

        const anim = animationInstance.current;

        // --- Scroll-based animation logic ---
        const handleScroll = () => {
            if (!anim) return;
            const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollTop = window.scrollY;
            const scrollProgress = scrollTop / totalHeight;
            const clampedProgress = Math.max(0, Math.min(0.99, (scrollProgress / 0.2)));
            const maxFrame = anim.totalFrames || 50;
            anim.goToAndStop(clampedProgress * maxFrame, true);
        };
        
        let ticking = false;
        const optimizedScrollHandler = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    handleScroll();
                    ticking = false;
                });
                ticking = true;
            }
        };

        // --- FadeLoop animation logic ---
        const handleFadeLoop = () => {
            container.classList.remove('fade-out'); // Make sure it's visible initially
            
            anim.addEventListener('complete', () => {
                // When animation completes, fade out
                container.classList.add('fade-out');
                
                // After fade out (500ms), reset and play again
                setTimeout(() => {
                    anim.goToAndPlay(0, true);
                    // Fade back in
                    container.classList.remove('fade-out');
                }, 500); // This duration should match the CSS transition
            });
        };

        // --- Attach correct logic based on mode ---
        if (animationMode === 'fadeLoop') {
            container.classList.add('lottie-fade-loop');
            handleFadeLoop();
        } else { // Default to 'scroll'
            window.addEventListener('scroll', optimizedScrollHandler);
        }

        // --- Cleanup logic ---
        return () => {
            if (animationMode === 'scroll') {
                window.removeEventListener('scroll', optimizedScrollHandler);
            }
            anim?.destroy();
            animationInstance.current = null;
        };

    }, [animationData, animationMode]);

    return <div ref={animationContainer} className="lottie-color-swap" style={{ width: '100%', height: '100%' }} />;
};

export default LottieAnimator;
