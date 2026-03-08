'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface HoverCardProps {
    children: ReactNode;
    className?: string;
    lift?: number;
    scaleAmount?: number;
}

export default function HoverCard({
    children,
    className = '',
    lift = -8,
    scaleAmount = 1.02,
}: HoverCardProps) {
    return (
        <motion.div
            className={className}
            whileHover={{
                y: lift,
                scale: scaleAmount,
                transition: { duration: 0.35, ease: [0.25, 0.1, 0.25, 1] },
            }}
            whileTap={{ scale: 0.98 }}
        >
            {children}
        </motion.div>
    );
}

// Magnetic button effect 
interface MagneticButtonProps {
    children: ReactNode;
    className?: string;
}

export function MagneticButton({ children, className = '' }: MagneticButtonProps) {
    return (
        <motion.div
            className={className}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
        >
            {children}
        </motion.div>
    );
}
