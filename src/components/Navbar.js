import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Languages, Moon, Menu } from 'lucide-react';
import CustomModal from './CustomModal';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navLinks = [
        { to: "/", text: "主页" },
        { to: "/works", text: "项目" },
        { to: "/portfolio", text: "简历" },
        { to: "/blog", text: "博客" },
        { to: "/contact", text: "找到我！" },
    ];

    return (
        <nav className="navbar">
            <div className="fixed top-0 w-full z-10 my-8">
                <div className="container mx-auto flex items-center justify-between px-4">
                    <div className="mr-0">
                        <Link to="/"><img src="/icon.png" alt="网站图标" width="80" /></Link>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2">
                        <ul className='flex items-center space-x-4'>
                            {navLinks.map((link) => (
                                <li key={link.to}><Link to={link.to} className="text-black mx-0">{link.text}</Link></li>
                            ))}
                        </ul>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
                        <button onClick={() => setIsMenuOpen(true)} className="z-50">
                            <Menu />
                        </button>
                    </div>

                    {/* Right-side Icons (always visible on desktop) */}
                    <div className="hidden md:flex items-center space-x-4">
                        <CustomModal
                            triggerElement={(
                                <div className="cursor-pointer hover:opacity-70 transition-opacity">
                                    <Languages />
                                </div>
                            )}
                            title="语言设置"
                            content="开发中 orz"
                        />
                        <CustomModal
                            triggerElement={(
                                <div className="cursor-pointer hover:opacity-70 transition-opacity">
                                    <Moon />
                                </div>
                            )}
                            title="深色模式"
                            content="开发中 orz"
                        />
                    </div>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            {isMenuOpen && (
                <div onClick={() => setIsMenuOpen(false)} className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40 flex flex-col items-center justify-center">
                    <div onClick={(e) => e.stopPropagation()} className="bg-white rounded-lg p-8">
                        <ul className='flex flex-col items-center space-y-8'>
                            {navLinks.map((link) => (
                                <li key={link.to}>
                                    <Link to={link.to} className="text-black text-2xl" onClick={() => setIsMenuOpen(false)}>{link.text}</Link>
                                </li>
                            ))}
                        </ul>
                        <div className="flex items-center space-x-8 mt-12">
                            <CustomModal
                                triggerElement={(
                                    <div className="cursor-pointer hover:opacity-70 transition-opacity">
                                        <Languages size={32} />
                                    </div>
                                )}
                                title="语言设置"
                                content="开发中 orz"
                            />
                            <CustomModal
                                triggerElement={(
                                    <div className="cursor-pointer hover:opacity-70 transition-opacity">
                                        <Moon size={32} />
                                    </div>
                                )}
                                title="深色模式"
                                content="开发中 orz"
                            />
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
