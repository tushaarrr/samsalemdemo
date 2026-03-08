'use client';

import { motion } from 'framer-motion';
import ScrollReveal from '@/components/animations/ScrollReveal';
import { WordReveal } from '@/components/animations/TextReveal';
import Image from 'next/image';

const specialties = [
    'Presales', 'Condominiums', 'Luxury Homes', 'Residential Single Family', 'Multi-family / Investment', 'Commercial', 'Vacant Land'
];

const areas = [
    'Burnaby', 'Coquitlam', 'Maple Ridge', 'New Westminster', 'North Vancouver', 'Pitt Meadows', 'Port Coquitlam', 'Port Moody', 'Vancouver', 'West Vancouver'
];

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-background overflow-hidden">
            {/* Hero Section */}
            <div className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center max-w-4xl mx-auto">
                        <ScrollReveal direction="up" delay={0.1}>
                            <motion.div
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-8"
                                whileHover={{ scale: 1.05 }}
                            >
                                <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                                <span className="text-accent font-body font-semibold text-xs tracking-[0.15em] uppercase">
                                    Top 1% REALTOR® in Greater Vancouver
                                </span>
                            </motion.div>
                        </ScrollReveal>

                        <WordReveal
                            text="Meet Sam Salem"
                            className="text-5xl md:text-7xl lg:text-[5.5rem] font-heading font-medium tracking-tight text-foreground mb-6"
                            delay={0.2}
                        />

                        <ScrollReveal direction="up" delay={0.4} blur>
                            <p className="text-muted font-body text-xl md:text-2xl max-w-2xl mx-auto leading-relaxed">
                                Personal Real Estate Corporation (PREC) <br className="hidden md:block" />
                                Sincere Real Estate Services
                            </p>
                        </ScrollReveal>
                    </div>
                </div>

                {/* Background decorative elements */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl -z-10 opacity-50" />
            </div>

            {/* Main Content - Bento Grid Style */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-32">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6">

                    {/* Main Image Banner - Spans full width on mobile, 8 cols on desktop */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
                        className="md:col-span-8 rounded-3xl overflow-hidden relative group"
                    >
                        <div className="relative w-full">
                            <Image
                                src="/samsalempicture.jpg"
                                alt="Sam Salem - Top 1% Realtor"
                                width={1200}
                                height={800}
                                className="w-full h-auto rounded-3xl transition-transform duration-700 group-hover:scale-[1.02]"
                                sizes="(max-width: 768px) 100vw, 66vw"
                                priority
                            />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent rounded-3xl" />
                        <div className="absolute bottom-0 left-0 p-8 md:p-12">
                            <h2 className="text-3xl md:text-4xl font-heading font-medium text-white mb-3">
                                From coffee to keys.
                            </h2>
                            <p className="text-white/80 font-body text-lg max-w-md">
                                Exceptional service centered on precision, strategy, and white-glove client care.
                            </p>
                        </div>
                    </motion.div>

                    {/* Stats/Badge Block */}
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
                        className="md:col-span-4 bg-primary rounded-3xl p-8 md:p-10 flex flex-col justify-between relative overflow-hidden group"
                    >
                        <div className="absolute top-0 right-0 p-6 opacity-10 transition-opacity duration-500 group-hover:opacity-20">
                            <svg className="w-32 h-32 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" /></svg>
                        </div>
                        <div>
                            <span className="text-white/50 text-sm font-semibold tracking-widest uppercase mb-2 block">Achievement</span>
                            <h3 className="text-4xl font-heading font-medium text-white mb-4">President Club 2023</h3>
                            <p className="text-white/70 font-body text-base leading-relaxed">
                                Recognized among the elite Top 1% of all REALTORS® in Greater Vancouver for outstanding sales achievement and client dedication.
                            </p>
                        </div>
                        <div className="mt-8 pt-8 border-t border-white/10">
                            <div className="text-5xl font-heading font-bold text-accent mb-2">20+</div>
                            <div className="text-white/80 font-body text-sm font-medium tracking-wide uppercase">Years of Luxury & Commercial Experience</div>
                        </div>
                    </motion.div>

                    {/* Bio Block */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
                        className="md:col-span-12 lg:col-span-7 bg-white rounded-3xl p-8 md:p-12 border border-border shadow-sm"
                    >
                        <h3 className="text-2xl font-heading font-medium text-foreground mb-8">The Professional Journey</h3>
                        <div className="space-y-6 text-muted font-body text-[17px] leading-relaxed">
                            <p>
                                I recognize that selling or buying a home is one of the most important decisions you&apos;ll make in your life. Your home may be your largest asset and as such, this could be the biggest financial move you&apos;ve ever made. I believe you deserve the best representation when dealing with such a large-scale investment.
                            </p>
                            <p>
                                Originally born in Iran, I hold a Master&apos;s degree in Civil Engineering. This structural and analytical background perfectly complements my 20+ years of active experience as a realtor dealing in Luxury Homes and Commercial properties across Tehran and Vancouver.
                            </p>
                            <p>
                                My real estate acumen, combined with master-level negotiation skills and a thorough knowledge of the local Vancouver market, enables me to offer you the highest caliber of advocacy. I listen closely to trace my clients&apos; true desires into an effective, practical system designed to achieve their unique goals.
                            </p>
                            <p className="text-foreground font-medium italic">
                                &quot;My sharp analytical ability is balanced with a warm sense of humour and a down-to-earth approach. If you&apos;re selling, count on me to get your home sold quickly, and for top dollar.&quot;
                            </p>
                        </div>
                    </motion.div>

                    {/* Information Grids */}
                    <div className="md:col-span-12 lg:col-span-5 grid grid-cols-1 gap-6">
                        {/* Specialties */}
                        <motion.div
                            initial={{ opacity: 0, x: 40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
                            className="bg-cream/50 rounded-3xl p-8 border border-border"
                        >
                            <h3 className="text-lg font-heading font-medium text-foreground mb-6 flex items-center gap-3">
                                <span className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                                    <svg className="w-4 h-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                                </span>
                                Core Specialties
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {specialties.map((spec) => (
                                    <span key={spec} className="px-4 py-2 bg-white rounded-full text-xs font-semibold tracking-wide text-foreground border border-border shadow-sm">
                                        {spec}
                                    </span>
                                ))}
                            </div>
                        </motion.div>

                        {/* Service Areas */}
                        <motion.div
                            initial={{ opacity: 0, x: 40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
                            className="bg-primary/5 rounded-3xl p-8 border border-border"
                        >
                            <h3 className="text-lg font-heading font-medium text-foreground mb-6 flex items-center gap-3">
                                <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                                    <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                </span>
                                Areas of Expertise
                            </h3>
                            <div className="grid grid-cols-2 gap-y-3 gap-x-4">
                                {areas.map((area) => (
                                    <div key={area} className="flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-primary/30" />
                                        <span className="text-sm font-body text-muted">{area}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>

                    {/* Sold by Salem */}
                    <div className="md:col-span-12 mt-10">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.6 }}
                            className="mb-8"
                        >
                            <h3 className="text-2xl font-heading font-medium text-foreground mb-2">Sold by Salem</h3>
                            <p className="text-muted font-body text-base">A selection of properties successfully sold by Sam Salem across Greater Vancouver.</p>
                        </motion.div>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                            {[
                                { src: '/sold12.jpg', label: 'Sold' },
                                { src: '/sold8.jpg', label: 'Sold' },
                                { src: '/sold9.jpg', label: 'Sold' },
                                { src: '/sold10.jpg', label: 'Sold' },
                                { src: '/sold11.jpg', label: 'Sold' },
                            ].map((item, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-30px" }}
                                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                                    className="relative h-[220px] md:h-[260px] rounded-2xl overflow-hidden group"
                                >
                                    <Image
                                        src={item.src}
                                        alt={`Sold Property ${idx + 1}`}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                                        sizes="(max-width: 768px) 50vw, 20vw"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                                    <div className="absolute bottom-3 left-3">
                                        <span className="px-3 py-1 bg-accent/90 backdrop-blur-sm rounded-full text-xs font-bold text-white">
                                            {item.label}
                                        </span>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
