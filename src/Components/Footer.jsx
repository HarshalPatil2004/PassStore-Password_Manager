import React from "react";

const Footer = () => {
    return (
        <footer className="mt-8 sm:mt-10 bottom-0 left-0 right-0">
            <div className="bg-green-600/20 backdrop-blur-xl border border-green-500/30 px-4 sm:px-6 py-4 sm:py-6 shadow-xl">
                <div className="flex flex-col items-center justify-center gap-3 sm:gap-4 text-xs sm:text-sm md:text-base text-center">

                    {/* Content */}
                    <p className="text-green-600 font-semibold">
                        © {new Date().getFullYear()} Save Password with{" "}
                        <span className="text-green-400 font-bold">Harshal</span>
                    </p>

                    {/* Tagline */}
                    <p className="text-green-600 font-semibold">
                        Secure • Simple • Smart
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
