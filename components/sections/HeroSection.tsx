'use client';

import { motion } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
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
            className="relative min-h-screen -mt-20 flex items-center overflow-hidden"
        >
            {/* Video background */}
            <video
                autoPlay
                muted
                loop
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
            >
                <source
                    src="https://res.cloudinary.com/djtzs6kuv/video/upload/v1773142941/11910511_2560_1440_24fps_kksovv.mp4"
                    type="video/mp4"
                />
            </video>

            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/55" />

            {/* ============ DESKTOP LAYOUT ============ */}
            <div className="hidden md:block w-full h-full">
                {/* Sam's photo — absolute left, bottom-anchored */}
                <motion.div
                    className="absolute left-0 bottom-0 z-10 flex items-end pl-8 lg:pl-16"
                    initial={{ opacity: 0, x: -40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1, delay: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                >
                    <Image
                        src="https://res.cloudinary.com/djtzs6kuv/image/upload/v1773142137/WhatsApp_Image_2026-03-10_at_16.54.14-removebg-preview_nb6yfg.png"
                        alt="Sam Salem"
                        width={480}
                        height={680}
                        className="object-contain h-[78vh] w-auto"
                        priority
                    />
                </motion.div>

                {/* Text — centered over full width */}
                <div className="relative z-10 w-full min-h-screen flex flex-col items-center justify-center text-center px-6 py-20">
                    <motion.h1
                        className="text-6xl lg:text-7xl xl:text-8xl font-cinzel font-bold text-white tracking-widest mb-4"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                    >
                        SAM SALEM
                    </motion.h1>

                    <ScrollReveal direction="up" delay={0.8} blur>
                        <p className="text-lg lg:text-xl text-white/90 font-cormorant font-medium mb-2">
                            Personal Real Estate Corporation
                        </p>
                    </ScrollReveal>

                    <ScrollReveal direction="up" delay={1.0} blur>
                        <p className="text-xl lg:text-2xl text-white font-cormorant font-semibold mb-4">
                            To buy or sell, call me. From coffee to keys.
                        </p>
                    </ScrollReveal>

                    <ScrollReveal direction="up" delay={1.1} blur>
                        <p className="font-cinzel text-2xl lg:text-3xl font-bold tracking-widest mb-2"
                            style={{ color: '#C9A84C', textShadow: '0 2px 8px rgba(0,0,0,0.8)' }}>
                            TOP 1% OF ALL REALTORS®
                        </p>
                        <p className="font-cormorant text-base lg:text-lg text-white/90 tracking-wide mb-8"
                            style={{ textShadow: '0 2px 6px rgba(0,0,0,0.9)' }}>
                            Strong focus on Presales, Condos, and Luxury Homes in Greater Vancouver
                        </p>
                    </ScrollReveal>

                    <ScrollReveal direction="up" delay={1.4}>
                        <div className="flex flex-row gap-4">
                            {ctaButtons.map((btn, i) => (
                                <motion.div
                                    key={btn.label}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{
                                        duration: 0.5,
                                        delay: 1.5 + i * 0.15,
                                        ease: [0.25, 0.1, 0.25, 1],
                                    }}
                                >
                                    <Link
                                        href={btn.href}
                                        className="border border-[#C9A84C] text-[#C9A84C] bg-transparent hover:bg-[#C9A84C] hover:text-black transition-all duration-300 font-cinzel tracking-widest text-xs h-12 px-6 whitespace-nowrap inline-flex items-center justify-center rounded-full"
                                        style={{ boxShadow: '0 0 12px rgba(201,168,76,0.3)' }}
                                    >
                                        {btn.label}
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    </ScrollReveal>
                </div>
            </div>

            {/* ============ MOBILE LAYOUT ============ */}
            <div
                className="md:hidden relative w-full overflow-hidden"
                style={{ height: 'calc(100vh - 80px)', maxHeight: 'calc(100vh - 80px)' }}
            >

                {/* Single container — text + buttons together, positioned above Sam's photo */}
                <div className="absolute top-20 left-0 right-0 z-10 flex flex-col items-center text-center px-6 gap-3">

                    <ScrollReveal direction="up" delay={0.7} blur>
                        <p className="text-base text-white/90 font-cormorant">
                            Personal Real Estate Corporation
                        </p>
                    </ScrollReveal>

                    <ScrollReveal direction="up" delay={0.9} blur>
                        <p className="text-lg text-white font-cormorant font-medium">
                            From coffee to keys.
                        </p>
                    </ScrollReveal>

                    <ScrollReveal direction="up" delay={1.0} blur>
                        <p className="font-cinzel text-lg font-bold tracking-widest"
                            style={{ color: '#C9A84C', textShadow: '0 2px 8px rgba(0,0,0,0.8)' }}>
                            TOP 1% OF ALL REALTORS®
                        </p>
                        <p className="font-cormorant text-sm text-white/70 px-4 mt-1"
                            style={{ textShadow: '0 2px 6px rgba(0,0,0,0.9)' }}>
                            Strong focus on Presales, Condos, and Luxury Homes in Greater Vancouver
                        </p>
                    </ScrollReveal>

                    {/* Buttons — 2 on top row, 1 centered below */}
                    <ScrollReveal direction="up" delay={1.1}>
                        <div className="flex flex-col items-center gap-2 w-full mt-2">
                            <div className="flex flex-row gap-2 w-full">
                                <motion.div
                                    className="flex-1"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
                                >
                                    <Link
                                        href={ctaButtons[0].href}
                                        className="border border-[#C9A84C] text-[#C9A84C] bg-transparent hover:bg-[#C9A84C] hover:text-black transition-all duration-300 font-cinzel tracking-widest text-[10px] h-12 px-4 whitespace-nowrap inline-flex items-center justify-center rounded-full w-full"
                                        style={{ boxShadow: '0 0 12px rgba(201,168,76,0.3)' }}
                                    >
                                        {ctaButtons[0].label}
                                    </Link>
                                </motion.div>
                                <motion.div
                                    className="flex-1"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 1.35, ease: [0.25, 0.1, 0.25, 1] }}
                                >
                                    <Link
                                        href={ctaButtons[1].href}
                                        className="border border-[#C9A84C] text-[#C9A84C] bg-transparent hover:bg-[#C9A84C] hover:text-black transition-all duration-300 font-cinzel tracking-widest text-[10px] h-12 px-4 whitespace-nowrap inline-flex items-center justify-center rounded-full w-full"
                                        style={{ boxShadow: '0 0 12px rgba(201,168,76,0.3)' }}
                                    >
                                        {ctaButtons[1].label}
                                    </Link>
                                </motion.div>
                            </div>
                            <motion.div
                                className="w-1/2"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 1.5, ease: [0.25, 0.1, 0.25, 1] }}
                            >
                                <Link
                                    href={ctaButtons[2].href}
                                    className="border border-[#C9A84C] text-[#C9A84C] bg-transparent hover:bg-[#C9A84C] hover:text-black transition-all duration-300 font-cinzel tracking-widest text-[10px] h-12 px-4 whitespace-nowrap inline-flex items-center justify-center rounded-full w-full"
                                    style={{ boxShadow: '0 0 12px rgba(201,168,76,0.3)' }}
                                >
                                    {ctaButtons[2].label}
                                </Link>
                            </motion.div>
                        </div>
                    </ScrollReveal>
                </div>

                {/* Sam's photo — separate, pinned to bottom-left */}
                <motion.div
                    className="absolute bottom-0 left-0 z-10 overflow-hidden"
                    style={{ height: '50%' }}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                >
                    <Image
                        src="https://res.cloudinary.com/djtzs6kuv/image/upload/v1773142137/WhatsApp_Image_2026-03-10_at_16.54.14-removebg-preview_nb6yfg.png"
                        alt="Sam Salem"
                        width={300}
                        height={420}
                        className="h-full w-auto object-contain object-bottom"
                        priority
                    />
                    {/* Fade bottom edge into video */}
                    <div
                        className="absolute bottom-0 left-0 w-full"
                        style={{
                            height: '80px',
                            background: 'linear-gradient(to top, rgba(0,0,0,0.95), transparent)',
                        }}
                    />
                </motion.div>

            </div>
        </section>
    );
}
