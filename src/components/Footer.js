import React from 'react';

const Footer = () => {
    return (
        <footer className="fixed bottom-0 w-full z-10 my-8">
            <div className="text-gray-500 dark:text-gray-400 container mx-auto flex justify-between text-xs md:text-sm">
                <a href="https://beian.miit.gov.cn/" rel="noreferrer" target="_blank">闽ICP备2024053702号-2</a>
                <div className="flex items-center space-x-2">
                    <img src='/备案图标.png' alt="备案图标" className="w-4 h-4" />
                    <a href="https://beian.mps.gov.cn/#/query/webSearch?code=35012202350314" rel="noreferrer" target="_blank">闽公网安备35012202350314</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
