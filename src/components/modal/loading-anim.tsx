import React from 'react';
import classNames from "@/utils/class-names";
import { Player } from "@lottiefiles/react-lottie-player";
import Loa from "@/lotties/loading-animation.json";

const LoadingAnim = () => {
    return (
        <div className={"relative z-10"} aria-modal="true">
            <div className= {classNames("dark:bg-opacity-50 bg-opacity-50 fixed inset-0 transition-opacity bg-gray-500 dark:bg-gray-900"
            )}/>
            <div className="fixed inset-0 z-10">
                <div className="flex items-center justify-center min-h-full p-4 sm:p-0">
                    <div className={classNames("w-44 relative shadow rounded-xl"
                    )}>
                        <div
                            tabIndex={-1}
                            className="relative items-center justify-center"
                        >
                            <Player
                                autoplay
                                speed={1.5}
                                loop
                                src={Loa}
                                style={{ height: "200px", width: "200px" }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoadingAnim;
