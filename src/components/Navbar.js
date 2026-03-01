import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Languages, Moon, Menu, X } from 'lucide-react';
import throttle from 'lodash.throttle';

import { useTranslation } from 'react-i18next';
import { ThemeContext } from '../context/ThemeContext';

// --- Constants for Tailwind CSS classes ---
const navLinkClasses = "inline-block text-lg font-medium text-black dark:text-white transition-all duration-200 hover:font-bold hover:scale-110";
const iconButtonClasses = "p-2 rounded-full text-black dark:text-white transition-transform duration-200 hover:scale-125";
const mobileNavLinkClasses = "text-white text-3xl";

const Navbar = () => {
    const { t, i18n } = useTranslation();
    const { theme, toggleTheme } = React.useContext(ThemeContext);
    const location = useLocation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    const iconSrc = theme === 'dark' ? '/assets/images/navbar/iconw.png' : '/assets/images/navbar/iconb.png';

    // --- Optimized Scroll Handler ---
    useEffect(() => {
        const handleScroll = throttle(() => {
            setIsScrolled(window.scrollY > 20);
        }, 100); // Throttle to run at most every 100ms

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => {
            window.removeEventListener('scroll', handleScroll);
            handleScroll.cancel(); // Clean up the throttle instance
        };
    }, []);

    const handleLanguageChange = useCallback(() => {
        const newLang = i18n.language.startsWith('zh') ? 'en' : 'zh';
        i18n.changeLanguage(newLang);
    }, [i18n]);

    // --- Unified Navigation Items ---
    const navItems = useMemo(() => [
        { type: 'link', to: "/", text: t('nav.home') },
        { type: 'link', to: "/works", text: t('nav.works') },
        { type: 'link', to: "/portfolio", text: t('nav.portfolio') },
        { type: 'link', to: "/blog", text: t('nav.blog') },
        { type: 'link', to: "/contact", text: t('nav.contact') },
        { type: 'separator' },
        { type: 'button', icon: Languages, onClick: handleLanguageChange },
        { type: 'button', icon: Moon, onClick: toggleTheme },
    ], [t, handleLanguageChange, toggleTheme]);

    // --- Renderer for a single navigation item ---
    const renderNavItem = (item, isMobile = false) => {
        if (item.type === 'link') {
            const isActive = location.pathname === item.to;
            const finalClasses = `${navLinkClasses} ${isActive ? 'font-bold underline underline-offset-4' : ''}`;

            return (
                <li key={item.to}>
                    <Link to={item.to} className={isMobile ? mobileNavLinkClasses : finalClasses} onClick={() => isMobile && setIsMenuOpen(false)}>
                        {item.text}
                    </Link>
                </li>
            );
        }
        if (item.type === 'separator') {
            return <li key="separator" className="flex items-center border-l border-gray-300 ml-4 pl-4 h-5"></li>;
        }
        if (item.type === 'button') {
            const Icon = item.icon;
            return (
                <li key={item.icon.displayName}>
                    <button onClick={item.onClick} className={iconButtonClasses}>
                        <Icon size={20} />
                    </button>
                </li>
            );
        }
        return null;
    };

    return (
        <nav className="navbar">
            {/* Background Layer: Fixed height, animates color */}
            <div className={`fixed top-0 left-0 w-full z-10 transition-colors duration-300 h-24
                ${isScrolled 
                    ? 'bg-white/80 backdrop-blur-sm md:bg-transparent md:backdrop-blur-none' 
                    : ''}`}>
            </div>

            {/* Content Layer: Stable height, holds the moving parts */}
            <div className="fixed top-0 left-0 w-full z-20 h-24 flex justify-center">
                <div className="relative w-full h-full px-4">
                    {/* Desktop: Animated Logo and Nav */}
                    <div className='hidden md:block'>
                        {/* LOGO */}
                        <div className={`absolute top-1/2 -translate-y-1/2 left-10 transition-transform duration-500 ease-in-out z-10
                            ${isScrolled ? 'translate-x-[calc(50vw-100%-14rem)]' : 'translate-x-0'}`}>
                            <Link to="/">
                                <img src={iconSrc} alt="网站图标" className={`transition-all duration-300 ${!isScrolled ? 'w-16' : 'w-9'}`} />
                            </Link>
                        </div>

                        {/* Desktop Nav */}
                        <nav className={`flex items-center absolute top-1/2 -translate-y-1/2 right-14 transition-transform duration-500 ease-in-out z-0
                            ${isScrolled ? 'translate-x-[calc(-50vw+100%-11.5rem)]' : 'translate-x-0'}`}>
                            <ul className={`flex items-center space-x-3 transition-all duration-300 ${isScrolled ? 'bg-white/90 dark:bg-black/80 backdrop-blur-sm shadow-lg dark:shadow-white/25 rounded-full pl-20 pr-6 py-2' : ''}`}>
                                {navItems.map(item => renderNavItem(item))}
                            </ul>
                        </nav>
                    </div>

                    {/* Mobile: Static Logo and Hamburger */}
                    <div className="md:hidden flex justify-between items-center w-full h-full">
                        <Link to="/">
                            <img src={iconSrc} alt="网站图标" className="w-16" />
                        </Link>
                        <button onClick={() => setIsMenuOpen(true)} className="p-2 text-black dark:text-white">
                            <Menu size={32} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            {isMenuOpen && (
                <div className="md:hidden fixed inset-0 bg-black/50 z-40 backdrop-blur-sm">
                    <div className="absolute top-0 right-0 p-4">
                        <button onClick={() => setIsMenuOpen(false)} className="text-white">
                            <X size={32} />
                        </button>
                    </div>
                    <div className="flex flex-col items-center justify-center h-full">
                        <ul className='flex flex-col items-center space-y-8'>
                            {navItems.filter(item => item.type === 'link').map(item => renderNavItem(item, true))}
                        </ul>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
