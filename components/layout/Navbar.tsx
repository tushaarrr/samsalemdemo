'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import MobileMenu from './MobileMenu';

const navLinks = [
    { label: 'About', href: '/about' },
    {
        label: 'Explore',
        href: '/buy/samslisting',
        children: [
            { label: "Sam's Listings", href: '/buy/samslisting' },
            { label: 'Presale Properties', href: '/presale' },
            { label: 'Sold Properties', href: '/buy/sold' },
            { label: 'Areas We Serve', href: '/areas' },
        ],
    },
    { label: 'Sell', href: '/sell' },
    {
        label: 'News',
        href: '/news/articles',
        children: [
            { label: 'Market Trends', href: '/news/market-trends' },
            { label: 'Articles', href: '/news/articles' },
        ],
    },
    { label: 'Tools', href: '/tools/mortgage-calculator' },
    { label: 'Contact', href: '/contact' },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const handleClick = () => setActiveDropdown(null);
        if (activeDropdown) {
            document.addEventListener('click', handleClick);
            return () => document.removeEventListener('click', handleClick);
        }
    }, [activeDropdown]);

    return (
        <>
            <motion.nav
                className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 lg:px-8 py-3"
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1], delay: 0.2 }}
            >
                <div
                    className={`max-w-7xl mx-auto flex items-center justify-between h-14 px-6 rounded-full border transition-all duration-500 ${scrolled
                        ? 'bg-cream/90 backdrop-blur-xl border-border shadow-lg'
                        : 'bg-cream/70 backdrop-blur-md border-border/50'
                        }`}
                >
                    {/* Logo */}
                    <Link href="/" className="flex items-center group shrink-0">
                        <motion.div
                            className="flex items-baseline"
                            whileHover={{ scale: 1.02 }}
                            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                        >
                            <span className="text-[26px] font-black tracking-[-0.03em] text-[#1D1D1F] uppercase group-hover:text-accent transition-colors duration-300">
                                SAM SALEM
                            </span>
                            <span className="text-[14px] font-bold tracking-[0.18em] text-[#86868B] uppercase group-hover:text-muted transition-colors duration-300 ml-2.5">
                                SINCERE
                            </span>
                        </motion.div>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center gap-3">
                        {navLinks.map((link) => (
                            <div
                                key={link.label}
                                className="relative"
                                onMouseEnter={() =>
                                    link.children && setActiveDropdown(link.label)
                                }
                                onMouseLeave={() => setActiveDropdown(null)}
                            >
                                <Link
                                    href={link.href}
                                    className="px-4 py-2 text-[13px] font-medium text-primary/80 hover:text-primary tracking-wide uppercase transition-colors duration-200"
                                >
                                    <span className="flex items-center gap-1">
                                        {link.label}
                                        {link.children && (
                                            <motion.svg
                                                className="w-3 h-3"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                                strokeWidth={2}
                                                animate={{ rotate: activeDropdown === link.label ? 180 : 0 }}
                                                transition={{ duration: 0.2 }}
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M19 9l-7 7-7-7"
                                                />
                                            </motion.svg>
                                        )}
                                    </span>
                                </Link>

                                {/* Animated dropdown */}
                                <AnimatePresence>
                                    {link.children && activeDropdown === link.label && (
                                        <motion.div
                                            className="absolute top-full left-0 pt-3"
                                            initial={{ opacity: 0, y: -10, scale: 0.95 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: -10, scale: 0.95 }}
                                            transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
                                        >
                                            <div className="bg-cream/95 backdrop-blur-xl rounded-2xl border border-border shadow-xl py-2 min-w-[220px]">
                                                {link.children.map((child, i) => (
                                                    <motion.div
                                                        key={child.href}
                                                        initial={{ opacity: 0, x: -10 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        transition={{ delay: i * 0.05, duration: 0.2 }}
                                                    >
                                                        <Link
                                                            href={child.href}
                                                            className="block px-5 py-3 text-sm text-primary/70 hover:text-primary hover:bg-primary/5 transition-all duration-200"
                                                        >
                                                            {child.label}
                                                        </Link>
                                                    </motion.div>
                                                ))}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>

                    {/* CTA + Mobile Toggle */}
                    <div className="flex items-center gap-3">
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="hidden lg:block"
                        >
                            <Link
                                href="/contact"
                                className="inline-flex btn-pill btn-pill-dark text-xs"
                            >
                                Contact Sam
                                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                </svg>
                            </Link>
                        </motion.div>

                        <button
                            onClick={() => setMobileOpen(!mobileOpen)}
                            className="lg:hidden p-2 rounded-lg hover:bg-primary/5 transition-colors"
                            aria-label="Toggle menu"
                        >
                            <div className="w-5 h-4 flex flex-col justify-between">
                                <motion.span
                                    className="block h-0.5 w-5 bg-primary rounded-full"
                                    animate={{
                                        rotate: mobileOpen ? 45 : 0,
                                        y: mobileOpen ? 7 : 0,
                                    }}
                                    transition={{ duration: 0.3 }}
                                />
                                <motion.span
                                    className="block h-0.5 w-5 bg-primary rounded-full"
                                    animate={{ opacity: mobileOpen ? 0 : 1 }}
                                    transition={{ duration: 0.2 }}
                                />
                                <motion.span
                                    className="block h-0.5 w-5 bg-primary rounded-full"
                                    animate={{
                                        rotate: mobileOpen ? -45 : 0,
                                        y: mobileOpen ? -7 : 0,
                                    }}
                                    transition={{ duration: 0.3 }}
                                />
                            </div>
                        </button>
                    </div>
                </div>
            </motion.nav>

            <MobileMenu
                isOpen={mobileOpen}
                onClose={() => setMobileOpen(false)}
                navLinks={navLinks}
            />

            {/* Spacer */}
            <div className="h-20" />
        </>
    );
}
