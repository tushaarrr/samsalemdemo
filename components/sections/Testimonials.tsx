'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Testimonial } from '@/lib/types';
import testimonialsData from '@/lib/data/testimonials.json';
import ScrollReveal from '@/components/animations/ScrollReveal';
import { WordReveal } from '@/components/animations/TextReveal';

const testimonials = testimonialsData as Testimonial[];

export default function Testimonials() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(1);

    const goTo = (index: number) => {
        setDirection(index > currentIndex ? 1 : -1);
        setCurrentIndex(index);
    };

    const current = testimonials[currentIndex];

    const slideVariants = {
        enter: (dir: number) => ({
            x: dir > 0 ? 100 : -100,
            opacity: 0,
            filter: 'blur(8px)',
        }),
        center: {
            x: 0,
            opacity: 1,
            filter: 'blur(0px)',
        },
        exit: (dir: number) => ({
            x: dir > 0 ? -100 : 100,
            opacity: 0,
            filter: 'blur(8px)',
        }),
    };

    return (
        <section className="py-16 md:py-28 relative overflow-hidden">
            <div className="absolute inset-0 z-0">
                <img
                    src="https://images.unsplash.com/photo-1490750967868-88aa4f44baee?w=1920&q=60"
                    alt=""
                    className="w-full h-full object-cover opacity-10"
                />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <ScrollReveal direction="none" blur>
                    <div className="section-divider mb-16" />
                </ScrollReveal>

                <div className="mb-12">
                    <ScrollReveal direction="up" delay={0.1}>
                        <span className="section-label mb-6">Reviews</span>
                    </ScrollReveal>
                    <WordReveal
                        text="What our clients say about working with Sam Salem"
                        className="text-3xl md:text-5xl lg:text-[3.5rem] font-medium leading-tight tracking-tight max-w-2xl"
                        delay={0.2}
                    />
                </div>

                <ScrollReveal direction="up" delay={0.3}>
                    <div className="max-w-3xl">
                        <div className="bg-cream/80 backdrop-blur-sm rounded-3xl p-6 md:p-12 border border-border overflow-hidden">
                            <AnimatePresence mode="wait" custom={direction}>
                                <motion.div
                                    key={currentIndex}
                                    custom={direction}
                                    variants={slideVariants}
                                    initial="enter"
                                    animate="center"
                                    exit="exit"
                                    transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                                >
                                    {/* Stars */}
                                    <div className="flex gap-1 mb-6">
                                        {[...Array(5)].map((_, i) => (
                                            <motion.svg
                                                key={i}
                                                className="w-5 h-5 text-accent"
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                                initial={{ scale: 0, opacity: 0 }}
                                                animate={{ scale: 1, opacity: 1 }}
                                                transition={{ delay: 0.1 + i * 0.08, duration: 0.3 }}
                                            >
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </motion.svg>
                                        ))}
                                    </div>

                                    <blockquote className="text-lg md:text-xl leading-relaxed text-primary/80 mb-8">
                                        &ldquo;{current.text}&rdquo;
                                    </blockquote>

                                    <div>
                                        <p className="font-semibold text-primary">{current.name}</p>
                                        <p className="text-sm text-muted">{current.location}</p>
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        <div className="flex gap-2 mt-8">
                            {testimonials.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => goTo(index)}
                                    className="relative h-2 rounded-full overflow-hidden bg-primary/10"
                                    aria-label={`Go to testimonial ${index + 1}`}
                                >
                                    <motion.div
                                        className="h-full bg-primary rounded-full"
                                        animate={{
                                            width: index === currentIndex ? 32 : 8,
                                        }}
                                        transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                                        style={{ minWidth: 8 }}
                                    />
                                </button>
                            ))}
                        </div>
                    </div>
                </ScrollReveal>
            </div>
        </section>
    );
}
