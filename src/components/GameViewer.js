// src/components/GameViewer.js
//用于展示游戏界面
import React, { useEffect } from 'react';
import { Unity, useUnityContext } from 'react-unity-webgl';

const GameViewer = ({ buildPath }) => {
    const { unityProvider, isLoaded, loadingProgression, unload } = useUnityContext({
        loaderUrl: `${buildPath}/build.loader.js`,
        dataUrl: `${buildPath}/build.data`,
        frameworkUrl: `${buildPath}/build.framework.js`,
        codeUrl: `${buildPath}/build.wasm`,
        compression: "gzip", // 告诉它用的是 Gzip
    });

    useEffect(() => {
        // The unload function can return a promise that might reject.
        // We catch it to prevent unhandled promise rejection errors in the console.
        return () => {
            unload().catch((error) => {
                console.log(`An error occurred while unloading the Unity instance: ${error}`);
            });
        };
    }, [unload]);

    return (
        <div className="w-full h-full flex justify-center items-center">
            {!isLoaded && <p>加载中... {Math.round(loadingProgression * 100)}%</p>}
            <Unity
                unityProvider={unityProvider}
                style={{ width: "100%", height: "100%" }}
            />
        </div>
    );
};

export default GameViewer;
