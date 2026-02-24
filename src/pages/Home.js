import React from 'react';
import ThreeScene from '../components/ThreeScene';
import LottieAnimator from '../utils/LottieAnimator';
import useMediaQuery from '../hooks/useMediaQuery';

const Home = () => {
    const isDesktop = useMediaQuery('(min-width: 768px)');

    const DesktopLayout = () => (
        <>
            <ThreeScene />
            <div className="absolute w-full h-full">
                {/* Desktop content with scrolling pages */}
                <div className="container mx-auto flex flex-col justify-center items-center text-center w-full h-full">
                    <h1 className="text-5xl md:text-8xl lg:text-[11rem] mb-9 font-bold">你好，我是 Nuo</h1>
                    <h2 className="text-3xl md:text-5xl lg:text-7xl font-bold mb-7">欢迎来到我的个人主页</h2>
                    <h3 className="text-xl md:text-2xl lg:text-3xl font-bold mb-2">我是一名建筑学学生，有时候不只做建筑设计</h3>
                    <p className="text-base md:text-lg mt-8">这里有我做过的部分项目，目前尚在补充和完善信息中</p>
                    <p className="text-base md:text-lg">欢迎来监督我的进度，或者访问我的博客 :)</p>
                </div>
                <div className="next-page container mx-auto flex flex-col justify-center items-center text-center w-full h-full">
                    <div className="absolute mb-20 w-full" style={{ transform: 'translateY(-45vh)' }}>
                        <LottieAnimator animationMode='scroll' />
                    </div>
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-9">曾学过一些建筑设计，偶尔做点简单的开发</h1>
                    <h2 className="text-2xl md:text-3xl font-bold mb-3">大约是兴趣使然</h2>
                    <p className="text-base md:text-lg mt-8">往下滑动可以浏览我之前完成的一些工作，点击进入详情页面</p>
                </div>
                <div className="next-page container mx-auto flex flex-col justify-center items-center text-center w-full h-full">
                    <div style={{ transform: 'translateY(20vh)' }}>
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-9">总共可分为六个板块</h1>
                        <h1 className="text-2xl md:text-3xl font-bold mb-4">内容有待更新和补充</h1>
                        <p className="text-base md:text-lg mt-8">如果感觉背景场景挡住图片或是影响文字阅读</p>
                        <p className="text-base md:text-lg">可以刷新页面重新加载（马铃薯的位置是随机的）</p>
                        <p className="text-base md:text-lg">之后应该会根据文字与图片位置调整模型，固定其位置</p>
                    </div>
                </div>
                <div className="next-page container mx-auto flex flex-col justify-center items-center text-center w-full h-full">
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-9">以上是一些基本信息</h1>
                    <h2 className="text-xl md:text-2xl font-bold mb-3">更多详细内容可以点击导航栏进入不同板块查看</h2>
                    <p className="text-base md:text-lg mt-8">欢迎下次光临！</p>
                </div>
            </div>
        </>
    );

    const MobileLayout = () => (
        <div className="container mx-auto px-4 py-8 mt-20">
            <h1 className="text-4xl font-bold mb-4">你好，我是 Nuo</h1>
            <h2 className="text-2xl font-bold mb-6">欢迎来到我的个人主页</h2>
            <p className="mb-8">我是一名建筑学学生，有时候不只做建筑设计。这里有我做过的部分项目，目前尚在补充和完善信息中。</p>
            
            <div className="my-12">
                <LottieAnimator animationMode='fadeLoop' />
            </div>

            <h3 className="text-3xl font-bold mb-4">关于我</h3>
            <p className="mb-8">曾学过一些建筑设计，偶尔做点简单的开发，大约是兴趣使然。往下滑动可以浏览我之前完成的一些工作，点击进入详情页面。</p>

            <h3 className="text-3xl font-bold mb-4">关于本站</h3>
            <p className="mb-2">总共可分为六个板块，内容有待更新和补充。</p>
            <p className="mb-8">如果感觉背景场景挡住图片或是影响文字阅读，可以刷新页面重新加载（马铃薯的位置是随机的），之后应该会根据文字与图片位置调整模型，固定其位置。</p>

            <h3 className="text-3xl font-bold mb-4">最后</h3>
            <p>更多详细内容可以点击导航栏进入不同板块查看。欢迎下次光临！</p>
        </div>
    );

    return (
        <div className="no-select">
            {isDesktop ? <DesktopLayout /> : <MobileLayout />}
        </div>
    );
};

export default Home;
