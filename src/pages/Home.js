import React from 'react';
import ThreeScene from '../components/ThreeScene';
import LottieAnimator from '../utils/LottieAnimator';
import useMediaQuery from '../hooks/useMediaQuery';

import { useTranslation } from 'react-i18next';

const Home = () => {
    const { t } = useTranslation();
    const isDesktop = useMediaQuery('(min-width: 768px)');

    const DesktopLayout = () => (
        <>
            <ThreeScene />
            <div className="absolute w-full h-full">
                {/* Desktop content with scrolling pages */}
                <div className="container mx-auto flex flex-col justify-center items-start text-left w-full h-full">
                    <h1 className="text-5xl md:text-8xl lg:text-[11rem] mb-9 font-bold">{t('home.greeting')}</h1>
                    <h2 className="text-3xl md:text-5xl lg:text-7xl font-bold mb-7">{t('home.welcome')}</h2>
                    <h3 className="text-xl md:text-2xl lg:text-3xl font-bold mb-2">{t('home.intro1')}</h3>
                    <p className="text-base md:text-lg mt-8">{t('home.intro2')}</p>
                    <p className="text-base md:text-lg">{t('home.intro3')}</p>
                </div>
                <div className="next-page relative flex flex-col justify-center items-end text-right w-full h-full">
                    <div className="absolute mb-20 w-full" style={{ transform: 'translateY(-45vh)' }}>
                        <LottieAnimator animationMode='scroll' />
                    </div>
                    <div className="container mx-auto">
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-9">{t('home.scroll1_title')}</h1>
                        <h2 className="text-2xl md:text-3xl font-bold mb-3">{t('home.scroll1_subtitle')}</h2>
                        <p className="text-base md:text-lg mt-8">{t('home.scroll1_desc')}</p>
                    </div>
                </div>
                <div className="next-page container mx-auto flex flex-col justify-center items-center text-center w-full h-full">
                    <div style={{ transform: 'translateY(20vh)' }}>
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-9">{t('home.scroll2_title')}</h1>
                        <h1 className="text-2xl md:text-3xl font-bold mb-4">{t('home.scroll2_subtitle')}</h1>
                    </div>
                </div>
                <div className="next-page container mx-auto flex flex-col justify-center items-center text-center w-full h-full">
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-9">{t('home.scroll3_title')}</h1>
                    <h2 className="text-xl md:text-2xl font-bold mb-3">{t('home.scroll3_subtitle')}</h2>
                    <p className="text-base md:text-lg mt-8">{t('home.scroll3_desc')}</p>
                </div>
            </div>
        </>
    );

    const MobileLayout = () => (
        <div className="container mx-auto px-4 py-8 mt-20">
            <h1 className="text-4xl font-bold mb-4">{t('home.mobile_greeting')}</h1>
            <h2 className="text-2xl font-bold mb-6">{t('home.mobile_welcome')}</h2>
            <p className="mb-8">{t('home.mobile_intro')}</p>
            
            <div className="my-12">
                <LottieAnimator animationMode='fadeLoop' />
            </div>

            <h3 className="text-3xl font-bold mb-4">{t('home.mobile_about_me')}</h3>
            <p className="mb-8">{t('home.mobile_about_me_desc')}</p>

            <h3 className="text-3xl font-bold mb-4">{t('home.mobile_about_site')}</h3>
            <p className="mb-2">{t('home.mobile_site_info_1')}</p>
            <p className="mb-8">{t('home.mobile_site_info_2')}</p>

            <h3 className="text-3xl font-bold mb-4">{t('home.mobile_finally')}</h3>
            <p>{t('home.mobile_finally_desc')}</p>
        </div>
    );

    return (
        <div className="no-select">
            {isDesktop ? <DesktopLayout /> : <MobileLayout />}
        </div>
    );
};

export default Home;
