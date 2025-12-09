import React from "react";
import notFoundVideo from "../../assets/NotFountVideo.mp4";

const NotFound = () => {
    return (
        <div className="bg-black text-white font-display overflow-hidden min-h-screen w-full relative flex flex-col">

            {/* Background */}
            <div className="absolute inset-0 z-0">
                <video
                    className="w-full h-full object-cover opacity-50 grayscale"
                    src={notFoundVideo}
                    autoPlay
                    loop
                    muted
                    playsInline/>
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/30"></div>
            </div>

            {/* Header */}
            <header className="relative z-10 flex items-center justify-between px-10 py-6">
                <div className="flex items-center gap-4 text-white/80">
                </div>
            </header>

            {/* Main Content */}
            <main className="relative z-10 flex grow flex-col justify-center items-center text-center px-4">
                <div className="flex flex-col items-center max-w-2xl gap-8 animate-fade-in">
                    <div className="border border-white/30 bg-black/30 backdrop-blur-sm rounded-full px-4 py-1">
                        <span className="text-xs font-bold tracking-widest text-white uppercase">
                            404
                        </span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white leading-tight drop-shadow-lg">
                        Dead End!
                    </h1>

                    <p className="text-white/60 text-lg max-w-md mx-auto hidden md:block">
                        The page you are looking for might have been removed, had its name changed, or its temporarily unavailable. Looks like this road leads nowhere.
                    </p>

                    <button
                        onClick={() => (window.location.href = "/")}
                        className="mt-4 px-8 py-3 bg-white/10 hover:bg-white/20 border border-white/30 backdrop-blur-md rounded text-sm font-bold text-white tracking-widest uppercase transition-all duration-300">
                        Back to Homepage
                    </button>
                </div>
            </main>
        </div>
    );
};

export default NotFound;
