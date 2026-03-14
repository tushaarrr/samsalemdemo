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

                            <div className="pt-4 mt-4 border-t border-gray-100 flex items-center justify-center gap-4">
                                {[
                                    { href: 'https://www.instagram.com/samsalemrealtor/', label: 'Instagram', path: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z' },
                                    { href: 'https://www.facebook.com/SamSalemRealty/', label: 'Facebook', path: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z' },
                                    { href: 'https://www.linkedin.com/in/sam-salem-realtor-445344138/', label: 'LinkedIn', path: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' },
                                ].map((social) => (
                                    <a
                                        key={social.label}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-muted hover:text-accent transition-colors p-2"
                                        aria-label={social.label}
                                    >
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d={social.path} /></svg>
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
