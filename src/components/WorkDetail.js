// src/components/WorkDetail.js

import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { WorkData } from '../data/WorkData';
import { ChevronLeft, ChevronRight, X, Maximize2, ArrowLeft } from 'lucide-react';
import GameViewer from '../components/GameViewer';

const WorkDetail = () => {
    const { category, id } = useParams();
    const work = WorkData[category]?.find(item => item.id === id);
    const navigate = useNavigate();
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [imageManifest, setImageManifest] = useState(null);
    const [thumbnailUrl, setThumbnailUrl] = useState('');
    const gameContainerRef = React.useRef(null);

    useEffect(() => {
        // Fetch the generated image manifest
        fetch('/assets/images/works/manifest.json')
            .then(response => response.json())
            .then(data => {
                setImageManifest(data);

                // Also set the thumbnail for gamedev projects
                if (category === 'gamedev') {
                    const manifestKey = `gamedev/${id}`;
                    const imageFileNames = data[manifestKey] || [];
                    if (imageFileNames.length > 0) {
                        setThumbnailUrl(`/assets/images/works/gamedev/${id}/${imageFileNames[0]}`);
                    }
                }
            })
            .catch(error => console.error('Error fetching image manifest:', error));
    }, [category, id]);

    const isGameDev = category === 'gamedev';

    // Dynamically generate image paths once the manifest is loaded
    const detailImages = useMemo(() => {
        if (!imageManifest || !category || !id) return [];

        const manifestKey = `${category}/${id}`;
        const imageFileNames = imageManifest[manifestKey] || [];
        
        return imageFileNames.map(fileName => 
            `/assets/images/works/${category}/${id}/${fileName}`
        );
    }, [imageManifest, category, id]);

    const allImages = useMemo(() => [work?.thumbnail, ...detailImages].filter(Boolean), [work, detailImages]);

    if (!work) {
        return <div>未找到该项目</div>;
    }

    const details = work.fullDetails;
    // const images = [work.thumbnail, ...(details.images || [])]; // This line is now replaced by allImages

    const handleNextImage = () => {
        setCurrentImageIndex((prevIndex) =>
            (prevIndex + 1) % allImages.length
        );
    };

    const handlePrevImage = () => {
        setCurrentImageIndex((prevIndex) =>
            (prevIndex - 1 + allImages.length) % allImages.length
        );
    };

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const handleFullscreen = () => {
        if (gameContainerRef.current) {
            gameContainerRef.current.requestFullscreen().catch(err => {
                alert(`无法进入全屏模式: ${err.message}`);
            });
        }
    };

    return (
        <>
            {isGameDev ? (
                // gamedev: Text on left, game on right
                <div className="container mx-auto my-8 p-4 flex flex-col md:flex-row gap-8">
                    {/* Left: Text Content + Thumbnails */}
                    <div className="w-full md:w-1/2 flex flex-col">
                        <div className="space-y-4 flex-grow">
                            <div className="flex items-center gap-4">
                                <button onClick={() => navigate(-1)} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                                    <ArrowLeft size={24} />
                                </button>
                                <h1 className="text-2xl md:text-3xl font-bold">{work.title}</h1>
                            </div>
                            <p className="text-base md:text-lg text-gray-700 dark:text-gray-300" dangerouslySetInnerHTML={{ __html: details.description }} />
                            <div className="space-y-2 text-sm md:text-base">
                                <p><strong>日期:</strong> {details.date}</p>
                                <p><strong>项目类型:</strong> {details.projectType}</p>
                                <p><strong>参与人员:</strong> {details.participants}</p>
                                {details.link && (
                                    <p>
                                        <strong>源码链接:</strong> 
                                        <a href={details.link} target="_blank" rel="noopener noreferrer" className="text-gray-800 dark:text-gray-200 hover:underline">
                                            {details.link}
                                        </a>
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Thumbnails below text */}
                        {detailImages.length > 0 && (
                            <div className="w-full pt-4 mt-4 border-t border-gray-200 dark:border-gray-700">
                                <h3 className="text-lg font-semibold mb-2">图片预览</h3>
                                <div className="flex flex-wrap justify-start gap-2">
                                    {allImages.map((img, index) => (
                                        <img
                                            key={index}
                                            src={img}
                                            alt={`缩略图 ${index + 1}`}
                                            className={`w-16 h-16 object-cover rounded-md cursor-pointer border-2 ${index === currentImageIndex
                                                ? 'border-black dark:border-white'
                                                : 'border-transparent opacity-60 hover:opacity-100'
                                                }`}
                                            onClick={() => {
                                                setCurrentImageIndex(index);
                                                openModal();
                                            }}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Right: Game Viewer */}
                    <div className="w-full md:w-4/5 relative">
                        <div
                            ref={gameContainerRef}
                            className="w-full aspect-video bg-black rounded-lg shadow-lg overflow-hidden fullscreen:bg-black fullscreen:flex fullscreen:justify-center fullscreen:items-center"
                        >
                            <div className="w-full h-full fullscreen:w-auto fullscreen:h-full fullscreen:aspect-video">
                                <GameViewer buildPath={details.buildPath} thumbnailUrl={thumbnailUrl} />
                            </div>
                        </div>
                        <button
                            onClick={handleFullscreen}
                            className="absolute top-2 right-2 bg-white/80 dark:bg-black/80 rounded-full p-2 hover:bg-white/100 dark:hover:bg-black/100 transition"
                            aria-label="全屏"
                        >
                            <Maximize2 size={20} />
                        </button>
                    </div>
                </div>
            ) : (
                // 非 gamedev：图文混排 - 固定布局
                <div className="container mx-auto h-[calc(100vh-8rem)] p-4 flex flex-col md:flex-row gap-8 items-center">
                    {/* 左侧文字内容 */}
                    <div className="w-full md:w-1/2 h-full flex flex-col space-y-4">
                        <div className="flex items-center gap-4 flex-shrink-0">
                            <button onClick={() => navigate(-1)} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                                <ArrowLeft size={24} />
                            </button>
                            <h1 className="text-2xl md:text-3xl font-bold truncate">{work.title}</h1>
                        </div>

                        <div className="space-y-2 text-sm md:text-base flex-shrink-0 overflow-y-auto flex-grow">
                            <div className="text-base md:text-lg text-gray-700 dark:text-gray-300" dangerouslySetInnerHTML={{ __html: details.description }} />
                            <p><strong>日期:</strong> {details.date}</p>
                            <p><strong>项目类型:</strong> {details.projectType}</p>
                            <p><strong>参与人员:</strong> {details.participants}</p>
                        {details.link && (
                            <p>
                                <strong>源码链接:</strong> 
                                <a href={details.link} target="_blank" rel="noopener noreferrer" className="text-gray-800 dark:text-gray-200 hover:underline">
                                    {details.link}
                                </a>
                            </p>
                        )}
                        </div>
                    </div>

                    {/* 右侧图片展示区 */}
                    <div className="w-full md:w-1/2 h-full flex flex-col items-center gap-4">
                        {/* 主图片 */}
                        <div className="relative w-full h-[600px] bg-gray-100 dark:bg-gray-900 rounded-lg shadow-lg flex items-center justify-center">
                            <img
                                src={allImages[currentImageIndex]}
                                alt={`${work.title} - 图片 ${currentImageIndex + 1}`}
                                className="max-w-full max-h-full object-contain cursor-pointer"
                                onClick={openModal}
                            />
                            <button
                                onClick={openModal}
                                className="absolute top-2 right-2 bg-white/50 dark:bg-black/50 rounded-full p-2 hover:bg-white/75 dark:hover:bg-black/75 transition"
                            >
                                <Maximize2 size={20} />
                            </button>
                            {allImages.length > 1 && (
                                <>
                                    <button
                                        onClick={handlePrevImage}
                                        className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/50 dark:bg-black/50 rounded-full p-2 hover:bg-white/75 dark:hover:bg-black/75 transition"
                                    >
                                        <ChevronLeft />
                                    </button>
                                    <button
                                        onClick={handleNextImage}
                                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/50 dark:bg-black/50 rounded-full p-2 hover:bg-white/75 dark:hover:bg-black/75 transition"
                                    >
                                        <ChevronRight />
                                    </button>
                                </>
                            )}
                        </div>

                        {/* 缩略图传送带 */}
                        {allImages.length > 1 && (
                            <div className="w-full flex-shrink-0">
                                <div className="flex items-center gap-2 overflow-x-auto w-full">
                                    {allImages.map((img, index) => (
                                        <img
                                            key={index}
                                            src={img}
                                            alt={`缩略图 ${index + 1}`}
                                            className={`w-16 h-16 object-cover rounded-md cursor-pointer flex-shrink-0 ${index === currentImageIndex
                                                ? 'border-2 border-black dark:border-white'
                                                : 'opacity-50 hover:opacity-100'
                                                }`}
                                            onClick={() => setCurrentImageIndex(index)}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* 图片模态框 */}
            {isModalOpen && (
                <div
                    className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
                    onClick={closeModal}
                >
                    <div
                        className="max-w-full max-h-full relative"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={closeModal}
                            className="absolute -top-10 right-0 text-white hover:text-gray-300 transition"
                        >
                            <X size={30} />
                        </button>
                        <img
                            src={allImages[currentImageIndex]}
                            alt={`${work.title} - 大图 ${currentImageIndex + 1}`}
                            className="max-w-full max-h-[80vh] object-contain"
                        />
                    </div>

                    {allImages.length > 1 && (
                        <>
                            <button
                                onClick={(e) => { e.stopPropagation(); handlePrevImage(); }}
                                className="absolute left-4 top-1/2 -translate-y-1/2 text-white bg-black/30 rounded-full p-2 hover:bg-black/50 transition"
                            >
                                <ChevronLeft size={32} />
                            </button>
                            <button
                                onClick={(e) => { e.stopPropagation(); handleNextImage(); }}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-white bg-black/30 rounded-full p-2 hover:bg-black/50 transition"
                            >
                                <ChevronRight size={32} />
                            </button>
                        </>
                    )}
                </div>
            )}
        </>
    );
};

export default WorkDetail;
