// src/components/WorkDetail.js

import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { WorkData } from '../data/WorkData';
import { ChevronLeft, ChevronRight, X, Maximize2 } from 'lucide-react';
import GameViewer from '../components/GameViewer';

const WorkDetail = () => {
    const { category, id } = useParams();
    const work = WorkData[category]?.find(item => item.id === id);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const isGameDev = category === 'gamedev';

    if (!work) {
        return <div>未找到该项目</div>;
    }

    const details = work.fullDetails;
    const images = [work.thumbnail, ...(details.images || [])];

    const handleNextImage = () => {
        setCurrentImageIndex((prevIndex) =>
            (prevIndex + 1) % images.length
        );
    };

    const handlePrevImage = () => {
        setCurrentImageIndex((prevIndex) =>
            (prevIndex - 1 + images.length) % images.length
        );
    };

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return (
        <>
            {isGameDev ? (
                // gamedev：Unity游戏展示 + 文字描述
                <div className="container mx-auto my-8 p-4 flex flex-col space-y-8">
                    {/* Unity WebGL 游戏 */}
                    <GameViewer buildPath={details.buildPath} />

                    {/* 文字 + 缩略图横向排布 */}
                    <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8">
                        {/* 左：项目信息 */}
                        <div className="w-full md:w-1/2 space-y-4">
                            <h1 className="text-2xl md:text-3xl font-bold">{work.title}</h1>
                            <p className="text-base md:text-lg text-gray-700">{details.description}</p>
                            <div className="space-y-2 text-sm md:text-base">
                                <p><strong>日期:</strong> {details.date}</p>
                                <p><strong>项目类型:</strong> {details.projectType}</p>
                                <p><strong>参与人员:</strong> {details.participants.join(', ')}</p>
                            </div>
                        </div>

                        {/* 右：缩略图 */}
                        {details.images && details.images.length > 0 && (
                            <div className="w-full md:w-1/2 flex flex-wrap items-start justify-center">
                                <div className="flex flex-wrap justify-center gap-2">
                                    {images.map((img, index) => (
                                        <img
                                            key={index}
                                            src={img}
                                            alt={`缩略图 ${index + 1}`}
                                            className={`w-16 h-16 md:w-20 md:h-20 object-cover rounded-md cursor-pointer border ${index === currentImageIndex
                                                ? 'border-black'
                                                : 'opacity-50 hover:opacity-100 border-transparent'
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

                </div>
            ) : (
                // 非 gamedev：图文混排
                <div className="container mx-auto my-8 p-4 main_content flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8">
                    {/* 左侧文字内容 */}
                    <div className="w-full md:w-1/2 space-y-4">
                        <h1 className="text-2xl md:text-3xl font-bold">{work.title}</h1>
                        <p className="text-base md:text-lg text-gray-700">{details.description}</p>

                        <div className="space-y-2 text-sm md:text-base">
                            <p><strong>日期:</strong> {details.date}</p>
                            <p><strong>项目类型:</strong> {details.projectType}</p>
                            <p><strong>参与人员:</strong> {details.participants.join(', ')}</p>
                        </div>
                    </div>

                    {/* 右侧图片展示区 */}
                    <div className="w-full md:w-1/2 flex flex-col items-center">
                        <div className="relative w-full h-[50vh] md:h-[70vh] bg-gray-200 rounded-lg shadow-lg mb-4 flex items-center justify-center">
                            <img
                                src={images[currentImageIndex]}
                                alt={`${work.title} - 图片 ${currentImageIndex + 1}`}
                                className="max-w-full max-h-full object-contain cursor-pointer"
                                onClick={openModal}
                            />
                            <button
                                onClick={openModal}
                                className="absolute top-2 right-2 bg-white/50 rounded-full p-2 hover:bg-white/75 transition"
                            >
                                <Maximize2 size={20} />
                            </button>
                            {images.length > 1 && (
                                <>
                                    <button
                                        onClick={handlePrevImage}
                                        className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/50 rounded-full p-2 hover:bg-white/75 transition"
                                    >
                                        <ChevronLeft />
                                    </button>
                                    <button
                                        onClick={handleNextImage}
                                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/50 rounded-full p-2 hover:bg-white/75 transition"
                                    >
                                        <ChevronRight />
                                    </button>
                                </>
                            )}
                        </div>

                        {/* 缩略图预览 */}
                        {images.length > 1 && (
                            <div className="flex space-x-2 justify-center flex-wrap">
                                {images.map((img, index) => (
                                    <img
                                        key={index}
                                        src={img}
                                        alt={`缩略图 ${index + 1}`}
                                        className={`w-12 h-12 md:w-16 md:h-16 object-cover rounded-md cursor-pointer m-1 ${index === currentImageIndex
                                            ? 'border-2 border-black'
                                            : 'opacity-50 hover:opacity-100'
                                            }`}
                                        onClick={() => setCurrentImageIndex(index)}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* 图片模态框 */}
            {isModalOpen && (             <div
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
                            src={images[currentImageIndex]}
                            alt={`${work.title} - 大图 ${currentImageIndex + 1}`}
                            className="max-w-full max-h-[90vh] object-contain"
                        />
                    </div>
                </div>
            )}
        </>
    );
};

export default WorkDetail;
