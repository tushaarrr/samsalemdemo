'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, ReactNode } from 'react';

type Direction = 'up' | 'down' | 'left' | 'right' | 'none';

interface ScrollRevealProps {
    children: ReactNode;
    direction?: Direction;
    delay?: number;
    duration?: number;
    blur?: boolean;
    scale?: boolean;
    className?: string;
    once?: boolean;
    amount?: number;
}

const getVariants = (direction: Direction, blur: boolean, scale: boolean) => {
    const offset = 60;
    let x = 0, y = 0;

    switch (direction) {
        case 'up': y = offset; break;
        case 'down': y = -offset; break;
        case 'left': x = offset; break;
        case 'right': x = -offset; break;
    }

    return {
        hidden: {
            opacity: 0,
            x,
            y,
            filter: blur ? 'blur(10px)' : 'blur(0px)',
            scale: scale ? 0.9 : 1,
        },
        visible: {
            opacity: 1,
            x: 0,
            y: 0,
            filter: 'blur(0px)',
            scale: 1,
        },
    };
};

export default function ScrollReveal({
    children,
    direction = 'up',
    delay = 0,
    duration = 0.7,
    blur = false,
    scale = false,
    className = '',
    once = true,
    amount = 0.2,
}: ScrollRevealProps) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once, amount });
    const variants = getVariants(direction, blur, scale);

    return (
        <motion.div
            ref={ref}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={variants}
            transition={{
                duration,
                delay,
                ease: [0.25, 0.1, 0.25, 1],
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

// Stagger container for child animations
interface StaggerContainerProps {
    children: ReactNode;
    stagger?: number;
    delay?: number;
    className?: string;
    once?: boolean;
}

export function StaggerContainer({
    children,
    stagger = 0.1,
    delay = 0,
    className = '',
    once = true,
}: StaggerContainerProps) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once, amount: 0.15 });

    return (
        <motion.div
            ref={ref}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={{
                hidden: {},
                visible: {
                    transition: {
                        staggerChildren: stagger,
                        delayChildren: delay,
                    },
                },
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

// Individual stagger items (must be children of StaggerContainer)
interface StaggerItemProps {
    children: ReactNode;
    direction?: Direction;
    className?: string;
}

export function StaggerItem({ children, direction = 'up', className = '' }: StaggerItemProps) {
    const variants = getVariants(direction, false, false);
    return (
        <motion.div
            variants={variants}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            className={className}
        >
            {children}
        </motion.div>
    );
}
