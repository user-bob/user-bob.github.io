import React from 'react';
import Image from 'next/image';

interface AvatarProps {
    src: string;
    alt: string;
    size: 'sm' | 'md' | 'lg' | 'xl';
}

const Avatar = ({src, alt, size}: AvatarProps) => {
    const sizeMap = {
        sm: 24,
        md: 32,
        lg: 56,
        xl: 64,
    }
    return (
        <Image
            src={src}
            alt={alt}
            width={sizeMap[size]}
            height={sizeMap[size]}
            className="rounded-full bg-no-repeat bg-cover border-2 float-left"/>
    );
}

export default Avatar;