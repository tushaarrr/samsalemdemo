'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';
import { CharReveal } from '@/components/animations/TextReveal';
import ScrollReveal from '@/components/animations/ScrollReveal';
import { MagneticButton } from '@/components/animations/HoverCard';

export default function HeroSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start start', 'end start'],
    });
    const imgY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
    const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

    return (
        <section
            ref={sectionRef}
            className="relative w-full h-[100vh] -mt-20 flex flex-col overflow-hidden"
        >
            {/* Parallax Background with Vancouver Downtown */}
            <motion.div
                className="absolute inset-0 z-0"
                style={{ y: imgY, scale: imgScale }}
            >
                <motion.img
                    src="/vancouverhero.jpg"
                    alt="Vancouver Downtown skyline"
                    className="w-full h-[120%] object-cover"
                    initial={{ filter: 'blur(20px)', scale: 1.15 }}
                    animate={{ filter: 'blur(0px)', scale: 1 }}
                    transition={{ duration: 1.5, ease: [0.25, 0.1, 0.25, 1] }}
                />
            </motion.div>

            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/35 z-[1]" />

            {/* Massive Hero Text */}
            <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-4">
                <CharReveal
                    text="From coffee to keys."
                    className="hero-text text-white text-center select-none"
                    delay={0.5}
                    stagger={0.04}
                />
            </div>

            {/* Bottom CTA Area */}
            <div className="relative z-10 flex flex-col items-center pb-20 px-4">
                <ScrollReveal direction="up" delay={1.2} blur>
                    <p className="text-white/80 text-lg md:text-xl text-center max-w-lg mb-8 leading-relaxed">
                        Strong focus on Presales, Condos, and Luxury Homes — Top 1% of all REALTORS in Greater Vancouver
                    </p>
                </ScrollReveal>
                <ScrollReveal direction="up" delay={1.5}>
                    <MagneticButton>
                        <Link href="/buy/samslisting" className="btn-pill btn-pill-light">
                            View Properties
                            <motion.svg
                                className="w-4 h-4"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                                animate={{ x: [0, 4, 0] }}
                                transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </motion.svg>
                        </Link>
                    </MagneticButton>
                </ScrollReveal>
            </div>
        </section>
    );
}
