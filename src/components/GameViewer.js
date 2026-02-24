// src/components/GameViewer.js
//用于展示游戏界面
import React from 'react';
import { Unity, useUnityContext } from 'react-unity-webgl';

const GameViewer = ({ buildPath }) => {
    const { unityProvider, isLoaded, loadingProgression } = useUnityContext({
        loaderUrl: `${buildPath}/build.loader.js`,
        dataUrl: `${buildPath}/build.data`,
        frameworkUrl: `${buildPath}/build.framework.js`,
        codeUrl: `${buildPath}/build.wasm`,
        // compression: "br", // 告诉它用的是 Brotli
    });

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
