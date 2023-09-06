import type {NavType} from "./ProductDetailsContext";
import {colors, navs, useProductDetailsContext} from "./ProductDetailsContext";
import {AiFillCamera, AiOutlineArrowLeft, AiOutlineShopping} from "react-icons/ai";
import {AnimatePresence, motion} from 'framer-motion'
import {twMerge} from "tailwind-merge";
import {HiHome} from "react-icons/hi2";

export const ProductDetailsOverlay = () => {
    const {isIntro, setIsIntro, nav, setNav, color, setColor} = useProductDetailsContext();
    const transition = {type: 'spring', duration: 0.8}
    const config = {
        initial: {x: 100, opacity: 0, transition: {...transition, delay: 0.5}},
        animate: {x: 0, opacity: 1, transition: {...transition, delay: 0}},
        exit: {x: 100, opacity: 0, transition: {...transition, delay: 0}}
    }
    return (
        <div className={'absolute top-24 left-0 w-full h-full'}>
            <motion.header className={'flex w-full justify-between p-10 items-center fixed'}
                           initial={{opacity: 0, y: -100}} animate={{opacity: 1, y: 0}}
                           transition={transition}>
                {/*<HiHome size="2em" className={'absolute top-5 left-5 z-20'}/>*/}
                <HiHome size="2em"/>
                {!isIntro && (
                    <motion.div className={'nav--middle space-x-20'} {...config}>
                        {navs.map((item, index) => (
                            <h1 key={index} onClick={() => setNav(item as NavType)} className={
                                twMerge(
                                    'w-full rounded-lg py-2.5 px-3.5 leading-5',
                                    'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                                    nav === item
                                        ? 'bg-white/75 shadow'
                                        : 'hover:bg-white/30'
                                )
                            }>{item}</h1>
                        ))}
                    </motion.div>
                )}

                <motion.div animate={{x: isIntro ? 0 : 100, opacity: isIntro ? 1 : 0}} transition={transition}>
                    <AiOutlineShopping size="3em"/>
                </motion.div>
            </motion.header>
            <AnimatePresence>
                {!isIntro && (
                    <motion.section key="custom" {...config}>
                        <div className="flex flex-col justify-end items-center w-full h-full mb-6">
                            <div className="absolute bottom-10 right-1/2 z-20 flex gap-3">
                                {colors.map((color) => (
                                    <div key={color} className={`circle`} style={{background: color}}
                                         onClick={() => setColor(color)}></div>
                                ))}
                            </div>
                            <button
                                className="absolute bottom-10 right-10 z-20"
                                style={{background: color}}>
                                DOWNLOAD
                                <AiFillCamera size="1.3em"/>
                            </button>
                            <button className="exit z-10" style={{background: color}} onClick={() => setIsIntro(true)}>
                                GO BACK
                                <AiOutlineArrowLeft size="1.3em"/>
                            </button>
                        </div>
                    </motion.section>
                )}
            </AnimatePresence>
        </div>

    );
};
