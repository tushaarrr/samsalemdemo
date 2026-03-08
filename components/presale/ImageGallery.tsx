'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ListingImage } from '@/lib/types';

interface ImageGalleryProps {
    images: ListingImage[];
    title: string;
}

export default function ImageGallery({ images, title }: ImageGalleryProps) {
    const [selectedIndex, setSelectedIndex] = useState(0);

    if (!images || images.length === 0) {
        return (
            <div className="w-full h-[400px] bg-gray-100 rounded-3xl flex items-center justify-center">
                <span className="text-muted text-sm">No images available</span>
            </div>
        );
    }

    const selectedImage = images[selectedIndex];

    return (
        <div className="space-y-4">
            {/* Main Image */}
            <div className="relative w-full h-[350px] md:h-[500px] rounded-3xl overflow-hidden bg-gray-50">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={selectedImage.url}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="absolute inset-0"
                    >
                        <Image
                            src={selectedImage.url}
                            alt={selectedImage.alt_text || `${title} - Image ${selectedIndex + 1}`}
                            fill
                            unoptimized
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 70vw"
                            priority={selectedIndex === 0}
                        />
                    </motion.div>
                </AnimatePresence>

                {/* Image counter */}
                <div className="absolute bottom-4 right-4 px-3 py-1.5 bg-black/60 backdrop-blur-sm rounded-full">
                    <span className="text-white text-xs font-medium">
                        {selectedIndex + 1} / {images.length}
                    </span>
                </div>

                {/* Navigation arrows */}
                {images.length > 1 && (
                    <>
                        <button
                            onClick={() => setSelectedIndex(selectedIndex > 0 ? selectedIndex - 1 : images.length - 1)}
                            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors shadow-lg"
                            aria-label="Previous image"
                        >
                            <svg className="w-5 h-5 text-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                        <button
                            onClick={() => setSelectedIndex(selectedIndex < images.length - 1 ? selectedIndex + 1 : 0)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors shadow-lg"
                            aria-label="Next image"
                        >
                            <svg className="w-5 h-5 text-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </>
                )}
            </div>

            {/* Thumbnails Row */}
            {images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                    {images.map((img, idx) => (
                        <button
                            key={img.id || idx}
                            onClick={() => setSelectedIndex(idx)}
                            className={`relative shrink-0 w-20 h-16 md:w-24 md:h-18 rounded-xl overflow-hidden transition-all duration-300 ${selectedIndex === idx
                                ? 'ring-2 ring-accent ring-offset-2 opacity-100'
                                : 'opacity-60 hover:opacity-100'
                                }`}
                        >
                            <Image
                                src={img.url}
                                alt={img.alt_text || `${title} thumbnail ${idx + 1}`}
                                fill
                                unoptimized
                                className="object-cover"
                                sizes="96px"
                            />
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
