'use client';

import { motion } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { CharReveal } from '@/components/animations/TextReveal';
import ScrollReveal from '@/components/animations/ScrollReveal';

const ctaButtons = [
    { label: "SAM'S LISTINGS", href: '/buy/samslisting' },
    { label: 'MLS SEARCH', href: '/listing/mls-search' },
    { label: 'PRESALE', href: '/presale' },
];

export default function HeroSection() {
    const sectionRef = useRef<HTMLElement>(null);

    return (
        <section
            ref={sectionRef}
            className="relative w-full min-h-[100vh] -mt-20 flex flex-col overflow-hidden"
        >
            {/* Video — desktop only */}
            <video
                autoPlay
                muted
                loop
                playsInline
                className="absolute inset-0 w-full h-full object-cover hidden md:block"
            >
                <source
                    src="https://res.cloudinary.com/djtzs6kuv/video/upload/v1773072171/1396928-uhd_4096_2160_24fps_wnmpey.mp4"
                    type="video/mp4"
                />
            </video>

            {/* Mobile fallback */}
            <div className="absolute inset-0 bg-gray-900 md:hidden" />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/50" />

            {/* Hero Content */}
            <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 pt-24">

                {/* Hero Text */}
                <CharReveal
                    text="From coffee to keys."
                    className="hero-text text-white text-center select-none"
                    delay={0.5}
                    stagger={0.04}
                />

                {/* Tagline */}
                <ScrollReveal direction="up" delay={1.0} blur>
                    <div className="flex flex-col items-center mt-3 mb-1">
                        <p className="text-[#C9A84C] text-base md:text-lg font-semibold tracking-[0.15em] uppercase text-center">
                            Your Trusted Partner for Buying &amp; Selling
                        </p>
                    </div>
                </ScrollReveal>

                <ScrollReveal direction="up" delay={1.2} blur>
                    <div className="flex items-center gap-5 mb-4">
                        <motion.div
                            className="shrink-0"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, delay: 1.3, ease: [0.25, 0.1, 0.25, 1] }}
                        >
                            <Image
                                src="/top1.jpeg"
                                alt="Top 1% Greater Vancouver PREC"
                                width={120}
                                height={120}
                                className="w-[90px] md:w-[110px] h-auto rounded-full shadow-[0_0_40px_rgba(201,168,76,0.5)] border-3 border-[#C9A84C]/50"
                            />
                        </motion.div>
                        <p className="text-white/90 text-base md:text-lg text-left max-w-md leading-snug font-semibold">
                            Strong focus on Presales, Condos, and Luxury Homes — Top 1% of all REALTORS in Greater Vancouver
                        </p>
                    </div>
                </ScrollReveal>
            </div>

            {/* CTA Buttons — Row on desktop, stacked on mobile */}
            <div className="relative z-10 flex flex-col items-center pb-16 md:pb-20 px-4">
                <ScrollReveal direction="up" delay={1.5}>
                    <div className="flex flex-col md:flex-row gap-3 w-full max-w-[340px] md:max-w-4xl">
                        {ctaButtons.map((btn, i) => (
                            <motion.div
                                key={btn.label}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                    duration: 0.5,
                                    delay: 1.6 + i * 0.15,
                                    ease: [0.25, 0.1, 0.25, 1],
                                }}
                            >
                                <Link href={btn.href} className="hero-cta-btn">
                                    {btn.label}
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </ScrollReveal>
            </div>
        </section>
    );
}
