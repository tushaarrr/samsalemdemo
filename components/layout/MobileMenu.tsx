'use client';

import { useState } from 'react';
import Link from 'next/link';

interface NavLink {
    label: string;
    href: string;
    children?: { label: string; href: string }[];
}

interface MobileMenuProps {
    isOpen: boolean;
    onClose: () => void;
    navLinks: NavLink[];
}

export default function MobileMenu({ isOpen, onClose, navLinks }: MobileMenuProps) {
    const [expandedSection, setExpandedSection] = useState<string | null>(null);

    const toggleSection = (label: string) => {
        setExpandedSection(expandedSection === label ? null : label);
    };

    return (
        <div
            className={`fixed inset-0 z-40 lg:hidden transition-all duration-300 ${isOpen ? 'visible' : 'invisible'
                }`}
        >
            {/* Backdrop */}
            <div
                className={`absolute inset-0 bg-primary/60 backdrop-blur-sm transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'
                    }`}
                onClick={onClose}
            />

            {/* Menu Panel */}
            <div
                className={`absolute top-0 right-0 h-full w-full max-w-sm bg-white shadow-2xl transition-transform duration-300 ease-out ${isOpen ? 'translate-x-0' : 'translate-x-full'
                    }`}
            >
                {/* Close button area (navbar height) */}
                <div className="h-20 flex items-center justify-end px-6">
                    <button
                        onClick={onClose}
                        className="p-2 rounded-lg hover:bg-primary/5 transition-colors"
                        aria-label="Close menu"
                    >
                        <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Nav Links */}
                <div className="px-6 py-4 overflow-y-auto h-[calc(100%-5rem)]">
                    <div className="space-y-1">
                        {navLinks.map((link) => (
                            <div key={link.label}>
                                {link.children ? (
                                    <>
                                        <button
                                            onClick={() => toggleSection(link.label)}
                                            className="w-full flex items-center justify-between py-3.5 px-4 text-lg font-body font-medium text-foreground hover:text-accent rounded-lg hover:bg-primary/5 transition-all duration-200"
                                        >
                                            {link.label}
                                            <svg
                                                className={`w-4 h-4 transition-transform duration-200 ${expandedSection === link.label ? 'rotate-180' : ''
                                                    }`}
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                                strokeWidth={2}
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </button>

                                        <div
                                            className={`overflow-hidden transition-all duration-300 ${expandedSection === link.label
                                                ? 'max-h-96 opacity-100'
                                                : 'max-h-0 opacity-0'
                                                }`}
                                        >
                                            <div className="pl-4 pb-2 space-y-1">
                                                {link.children.map((child) => (
                                                    <Link
                                                        key={child.href}
                                                        href={child.href}
                                                        onClick={onClose}
                                                        className="block py-2.5 px-4 text-base font-body text-muted hover:text-accent rounded-lg hover:bg-primary/5 transition-all duration-200"
                                                    >
                                                        {child.label}
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <Link
                                        href={link.href}
                                        onClick={onClose}
                                        className="block py-3.5 px-4 text-lg font-body font-medium text-foreground hover:text-accent rounded-lg hover:bg-primary/5 transition-all duration-200"
                                    >
                                        {link.label}
                                    </Link>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Contact CTA */}
                    <div className="mt-8 pt-6 border-t border-gray-100">
                        <Link
                            href="/contact"
                            onClick={onClose}
                            className="block w-full text-center px-6 py-3.5 bg-accent text-white text-base font-body font-semibold rounded-full hover:bg-accent-dark transition-all duration-300 shadow-md"
                        >
                            Contact Sam Salem
                        </Link>

                        <div className="mt-6 space-y-3">
                            <a
                                href="tel:+16044452030"
                                className="flex items-center gap-3 text-muted font-body text-sm hover:text-accent transition-colors"
                            >
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                                +1 (604) 445-2030
                            </a>
                            <a
                                href="mailto:info@sam-salem.com"
                                className="flex items-center gap-3 text-muted font-body text-sm hover:text-accent transition-colors"
                            >
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                info@sam-salem.com
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
