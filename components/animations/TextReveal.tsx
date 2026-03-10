'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useMemo } from 'react';

interface WordRevealProps {
    text: string;
    className?: string;
    style?: React.CSSProperties;
    delay?: number;
    stagger?: number;
    once?: boolean;
}

export function WordReveal({
    text,
    className = '',
    style,
    delay = 0,
    stagger = 0.04,
    once = true,
}: WordRevealProps) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once, amount: 0.3 });
    const words = useMemo(() => text.split(' '), [text]);

    return (
        <motion.div
            ref={ref}
            className={className}
            style={style}
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
        >
            {words.map((word, i) => (
                <motion.span
                    key={`${word}-${i}`}
                    className="inline-block mr-[0.25em] last:mr-0"
                    variants={{
                        hidden: {
                            opacity: 0,
                            y: 20,
                            filter: 'blur(8px)',
                        },
                        visible: {
                            opacity: 1,
                            y: 0,
                            filter: 'blur(0px)',
                        },
                    }}
                    transition={{
                        duration: 0.5,
                        ease: [0.25, 0.1, 0.25, 1],
                    }}
                >
                    {word}
                </motion.span>
            ))}
        </motion.div>
    );
}

// Character-by-character reveal (for hero text)
interface CharRevealProps {
    text: string;
    className?: string;
    delay?: number;
    stagger?: number;
    once?: boolean;
}

export function CharReveal({
    text,
    className = '',
    delay = 0.3,
    stagger = 0.03,
    once = true,
}: CharRevealProps) {
    const ref = useRef<HTMLHeadingElement>(null);
    const isInView = useInView(ref, { once, amount: 0.3 });
    const chars = useMemo(() => text.split(''), [text]);

    return (
        <motion.h1
            ref={ref}
            className={className}
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
        >
            {chars.map((char, i) => (
                <motion.span
                    key={`${char}-${i}`}
                    className="inline-block"
                    style={{ whiteSpace: char === ' ' ? 'pre' : undefined }}
                    variants={{
                        hidden: {
                            opacity: 0,
                            y: 40,
                            filter: 'blur(12px)',
                            scale: 0.8,
                        },
                        visible: {
                            opacity: 1,
                            y: 0,
                            filter: 'blur(0px)',
                            scale: 1,
                        },
                    }}
                    transition={{
                        duration: 0.5,
                        ease: [0.25, 0.1, 0.25, 1],
                    }}
                >
                    {char === ' ' ? '\u00A0' : char}
                </motion.span>
            ))}
        </motion.h1>
    );
}
