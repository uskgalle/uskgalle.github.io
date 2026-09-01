'use client';

import { useState, useRef, useEffect } from 'react';
import styles from './BlurImage.module.css';

export default function BlurImage({
    src,
    alt = '',
    className = '',
    imgClassName = '',
    loading = 'lazy',
    onClick,
    ...props
}) {
    const [isLoaded, setIsLoaded] = useState(false);
    const imgRef = useRef(null);

    useEffect(() => {
        setIsLoaded(false);
        if (imgRef.current && imgRef.current.complete && imgRef.current.naturalWidth > 0) {
            setIsLoaded(true);
        }
    }, [src]);

    const handleLoad = () => {
        setIsLoaded(true);
    };

    return (
        <div className={`${styles.wrapper} ${className}`} onClick={onClick}>
            <div className={`${styles.skeleton} ${isLoaded ? styles.skeletonHidden : ''}`} />
            <img
                ref={imgRef}
                src={src}
                alt={alt}
                loading={loading}
                onLoad={handleLoad}
                className={`${styles.image} ${isLoaded ? styles.imageLoaded : styles.imageLoading} ${imgClassName}`}
                {...props}
            />
        </div>
    );
}
