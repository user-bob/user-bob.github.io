import React, {FC, useCallback, useState} from "react";
import {twMerge} from "tailwind-merge";
import {Modal, useTheme} from "../../../../../src";
import {HiOutlineChevronLeft, HiOutlineChevronRight} from "react-icons/hi2";

export interface ImagesProps {
    name: string;
    src: string;
    alt: string;
}

interface ImageGalleryProps {
    images: ImagesProps[];
}

export const ImageGallery = ({images}: ImageGalleryProps) => {
    const [selectedImage, setSelectedImage] = useState(images[0]);
    const [openModal, setOpenModal] = useState<string | undefined>();

    const handleImageClick = (image: ImagesProps) => {
        setSelectedImage(image);
        setOpenModal('dismissible');
    }

    return (
        <>
            <div className="grid gap-4">
                <div className={'w-full aspect-w-1 aspect-h-1'}>
                    <img className="w-full h-full object-center object-cover sm:rounded-lg"
                         src={selectedImage.src} alt={selectedImage.alt}
                         onClick={() => setOpenModal('dismissible')}
                    />
                </div>
                <div className="grid grid-cols-5 gap-4 px-2 sm:px-0">
                    {images.filter((_, i) => i < 5).map((image, index) => (
                        <div
                            key={index}
                            className="relative h-24 bg-white rounded-md flex items-center justify-center text-sm font-medium uppercase text-gray-900 cursor-pointer hover:bg-gray-50 focus:outline-none focus:ring focus:ring-offset-4 focus:ring-opacity-50">
                            <>
                                <span className="sr-only">{image.name}</span>
                                <span className="absolute inset-0 rounded-md overflow-hidden">
                                    {index == 4 && images.length > 5 ? (
                                            <span className="absolute inset-0 rounded-md overflow-hidden">
                                            <span
                                                className="absolute inset-0 rounded-md overflow-hidden"
                                                aria-hidden="true"
                                            >
                                                <img
                                                    src={images[5].src}
                                                    alt={images[5].alt}
                                                    className="w-full h-full object-center object-cover"
                                                />
                                            </span>
                                            <span
                                                className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50"
                                                aria-hidden="true"
                                                onClick={() => handleImageClick(images[5])}

                                            >
                                                <span className="text-white text-xl">+{images.length - 5}</span>
                                            </span>
                                        </span>
                                        ) :
                                        <img src={image.src} alt={image.alt}
                                             className="w-full h-full object-center object-cover"
                                             onClick={() => handleImageClick(image)}
                                             onMouseEnter={() => setSelectedImage(image)}
                                             onMouseDown={() => setSelectedImage(image)}
                                        />
                                    }
                                </span>
                                <span
                                    className={twMerge(
                                        image == selectedImage ? 'ring-indigo-500' : 'ring-transparent',
                                        'absolute inset-0 rounded-md ring-2 ring-offset-2 pointer-events-none'
                                    )}
                                    aria-hidden="true"
                                />
                            </>
                        </div>
                    ))}
                </div>
            </div>
            <ImageGalleryModal openModal={openModal} setOpenModal={setOpenModal} images={images}
                               selectedImage={selectedImage} setSelectedImage={setSelectedImage}/>
        </>
    )
}

interface ImageGalleryModalProps {
    openModal: string | undefined;
    setOpenModal: (value: string | undefined) => void;
    images: ImagesProps[]
    selectedImage: ImagesProps,
    setSelectedImage: (value: ImagesProps) => void;
}

const ImageGalleryModal: FC<ImageGalleryModalProps> = ({
                                                           openModal,
                                                           setOpenModal,
                                                           images,
                                                           selectedImage,
                                                           setSelectedImage
                                                       }) => {
    const theme = useTheme().theme.carousel
    const props = {openModal, setOpenModal};

    const navigateTo = useCallback(
        (item: number) => () => {
            item = (item + images.length) % images.length;
            setSelectedImage(images[item]);
        },
        [images, setSelectedImage],
    );

    return (
        <Modal
            theme={{
                root: {base: 'fixed z-50 h-full overflow-y-auto overflow-x-hidden inset-0'},
                content: {
                    base: 'relative h-full w-full p-4 h-auto'
                },
            }}
            dismissible
            show={props.openModal === 'dismissible'}
            size={'7xl'}
            onClose={() => props.setOpenModal(undefined)}
        >
            <Modal.Header>Terms of Service</Modal.Header>
            <Modal.Body
                theme={{
                    base: 'relative h-full w-full'
                }}
            >
                {/*<div className="absolute top-1/2 left-1/2 block w-full -translate-x-1/2 -translate-y-1/2">*/}
                <div className="w-full h-full aspect-h-1 aspect-w-1 md:aspect-w-3 md:aspect-h-2">
                    <img
                        src={selectedImage.src}
                        alt={selectedImage.alt}
                        className="w-full h-full object-center object-cover md:object-contain"
                    />
                </div>
                <>
                    <div className={theme.root.leftControl}>
                        <button
                            className="group"
                            data-testid="images-left-control"
                            onClick={navigateTo(images.indexOf(selectedImage) - 1)}
                            type="button"
                            aria-label="Previous image"
                        >
                                <span className={theme.control.base}>
                                    <HiOutlineChevronLeft className={theme.control.icon}/>
                                </span>
                        </button>
                    </div>
                    <div className={theme.root.rightControl}>
                        <button
                            className="group"
                            data-testid="images-right-control"
                            onClick={navigateTo(images.indexOf(selectedImage) + 1)}
                            type="button"
                            aria-label="Next image"
                        >
                                <span className={theme.control.base}>
                                    <HiOutlineChevronRight className={theme.control.icon}/>
                                </span>
                        </button>
                    </div>
                </>
            </Modal.Body>
            <Modal.Footer>
                <div
                    className="mx-auto grid grid-cols-6 sm:grid-cols-8 md:grid-flow-col gap-4 place-content-center">
                    {
                        images.map((image, index) => (
                            <div
                                key={index}
                                className="relative h-16 w-16 bg-white rounded-md flex items-center justify-center text-sm font-medium uppercase text-gray-900 cursor-pointer hover:bg-gray-50 focus:outline-none focus:ring focus:ring-offset-4 focus:ring-opacity-50">
                                <>
                                    <span className="sr-only">{image.name}</span>
                                    <img src={image.src} alt={image.alt}
                                         className="w-full h-full object-center object-cover"
                                         onMouseEnter={() => setSelectedImage(image)}
                                         onMouseDown={() => setSelectedImage(image)}
                                    />
                                    <span
                                        className={twMerge(
                                            image == selectedImage ? 'ring-indigo-500' : 'ring-transparent',
                                            'absolute inset-0 rounded-md ring-2 ring-offset-2 pointer-events-none'
                                        )}
                                        aria-hidden="true"
                                    />
                                </>
                            </div>
                        ))
                    }
                </div>
            </Modal.Footer>
        </Modal>
    )
}
