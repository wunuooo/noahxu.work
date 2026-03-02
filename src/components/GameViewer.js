// src/components/GameViewer.js
// A smart component that auto-detects compression format (br, gz, or none)
// and loads the Unity game accordingly.
import React, { useState, useEffect } from 'react';
import { Play } from 'react-feather';
import { Unity, useUnityContext } from 'react-unity-webgl';

const MemoizedUnity = React.memo(Unity);

// This is the sub-component that actually uses the hook.
// It is rendered only after the user clicks "Start Game".
const UnityInstance = ({ config }) => {
    const { unityProvider, isLoaded, loadingProgression, unload } = useUnityContext(config);

    // Effect for cleaning up the Unity instance when the component unmounts.
    useEffect(() => {
        return () => {
            unload().catch((error) => {
                console.log(`An error occurred while unloading the Unity instance: ${error}`);
            });
        };
    }, [unload]);

    return (
        <div className="w-full h-full relative">
            {/* Loading Overlay */}
            {!isLoaded && (
                <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black bg-opacity-80 text-white">
                    <div className="text-center">
                        <p className="text-lg font-bold">游戏加载中...</p>
                        <div className="w-64 bg-gray-700 rounded-full h-2.5 mt-4">
                            <div className="bg-white h-2.5 rounded-full" style={{ width: `${loadingProgression * 100}%` }}></div>
                        </div>
                        <p className="mt-2 text-sm">{Math.round(loadingProgression * 100)}%</p>
                    </div>
                </div>
            )}
            {/* Unity Canvas */}
            <MemoizedUnity
                unityProvider={unityProvider}
                style={{
                    width: '100%',
                    height: '100%',
                    // The canvas is visible, but the overlay will cover it during load.
                    visibility: isLoaded ? 'visible' : 'hidden',
                }}
            />
        </div>
    );
};

const GameViewer = ({ buildPath, thumbnailUrl }) => {
    // State to hold the final config for the Unity instance. It's null until detection is complete.
    const [config, setConfig] = useState(null);
    // State to show the current status to the user.
    const [status, setStatus] = useState('检测压缩格式...');
    const [gameStarted, setGameStarted] = useState(false);

    useEffect(() => {
        const detectCompressionAndSetConfig = async () => {
            // This detection logic can run anytime as it's lightweight.
            const baseConfig = {
                loaderUrl: `${buildPath}/build.loader.js`,
                dataUrl: `${buildPath}/build.data`,
                frameworkUrl: `${buildPath}/build.framework.js`,
                codeUrl: `${buildPath}/build.wasm`,
            };

            const checkFile = async (extension) => {
                try {
                    const response = await fetch(`${buildPath}/build.data${extension}`, { method: 'HEAD' });
                    return response.ok;
                } catch { return false; }
            };

            if (await checkFile('.br')) {
                console.log("Brotli compression detected.");
                setConfig({ ...baseConfig, compression: 'br' });
            } else if (await checkFile('.gz')) {
                console.log("Gzip compression detected.");
                setConfig({ ...baseConfig, compression: 'gzip' });
            } else if (await checkFile('')) {
                console.log("No compression detected.");
                setConfig(baseConfig);
            } else {
                setStatus('错误：在指定路径找不到游戏数据文件。');
            }
        };

        detectCompressionAndSetConfig();
    }, [buildPath]);

    const handleStartGame = () => {
        if (config) {
            setGameStarted(true);
        } else {
            // If config is not ready, maybe show a message.
            // But detection is fast, so this is unlikely.
            setStatus('请稍候，正在准备游戏...');
        }
    };

    return (
        <div className="w-full h-full relative bg-black overflow-hidden">
            {/* Blurred Background Image */}
            {!gameStarted && thumbnailUrl && (
                <div
                    className="absolute inset-0 w-full h-full bg-cover bg-center filter blur-sm scale-110"
                    style={{ backgroundImage: `url(${thumbnailUrl})` }}
                />
            )}

            {/* Dark Overlay */}
            {!gameStarted && (
                <div className="absolute inset-0 w-full h-full bg-black/30" />
            )}

            {/* Foreground Content */}
            <div className="relative z-10 w-full h-full flex justify-center items-center">
                {gameStarted ? (
                    // If game has started, render the Unity instance
                    config ? <UnityInstance config={config} /> : <p className="text-white">{status}</p>
                ) : (
                    // Otherwise, show the start button
                    <button
                        onClick={handleStartGame}
                        disabled={!config}
                        className="w-28 h-28 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all transform hover:scale-105 disabled:bg-gray-500/20 disabled:cursor-not-allowed"
                        aria-label="开始游戏"
                    >
                        {config ? <Play className="w-16 h-16 ml-2" /> : <p className="text-sm">准备中...</p>}
                    </button>
                )}
            </div>
        </div>
    );
};

export default GameViewer;
