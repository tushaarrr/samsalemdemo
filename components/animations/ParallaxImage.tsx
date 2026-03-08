'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, ReactNode } from 'react';

interface ParallaxImageProps {
    src: string;
    alt: string;
    speed?: number; // 0.1 = slow, 0.5 = medium
    className?: string;
    children?: ReactNode;
    overlay?: boolean;
    blurIn?: boolean;
}

export default function ParallaxImage({
    src,
    alt,
    speed = 0.3,
    className = '',
    children,
    overlay = true,
    blurIn = true,
}: ParallaxImageProps) {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start start', 'end start'],
    });

    const y = useTransform(scrollYProgress, [0, 1], ['0%', `${speed * 100}%`]);
    const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

    return (
        <div ref={ref} className={`relative overflow-hidden ${className}`}>
            <motion.div
                className="absolute inset-0 -top-[10%] -bottom-[10%]"
                style={{ y, scale }}
            >
                <motion.img
                    src={src}
                    alt={alt}
                    className="w-full h-full object-cover"
                    initial={blurIn ? { filter: 'blur(20px)', scale: 1.1 } : {}}
                    animate={blurIn ? { filter: 'blur(0px)', scale: 1 } : {}}
                    transition={{ duration: 1.5, ease: [0.25, 0.1, 0.25, 1] }}
                />
                {overlay && (
                    <div className="absolute inset-0 bg-black/30" />
                )}
            </motion.div>
            {children && (
                <div className="relative z-10">
                    {children}
                </div>
            )}
        </div>
    );
}
