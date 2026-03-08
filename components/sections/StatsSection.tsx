'use client';

import { useEffect, useRef, useState } from 'react';
import { StaggerContainer, StaggerItem } from '@/components/animations/ScrollReveal';

const stats = [
    { value: 265, suffix: '+', label: 'Happy clients' },
    { value: 8, suffix: '+', label: 'Years of experience' },
    { value: 150, suffix: 'M+', label: 'In sales volume' },
    { value: 98, suffix: '%', label: 'Client satisfaction' },
];

function AnimatedCounter({ target, suffix }: { target: number; suffix: string }) {
    const [count, setCount] = useState(0);
    const ref = useRef<HTMLDivElement>(null);
    const hasAnimated = useRef(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasAnimated.current) {
                    hasAnimated.current = true;
                    const duration = 2000;
                    const steps = 60;
                    const increment = target / steps;
                    let current = 0;
                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= target) {
                            setCount(target);
                            clearInterval(timer);
                        } else {
                            setCount(Math.floor(current));
                        }
                    }, duration / steps);
                }
            },
            { threshold: 0.5 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [target]);

    return (
        <div ref={ref} className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight">
            {count === 0 && !hasAnimated.current ? '0' : count}
            <span className="text-accent">{suffix}</span>
        </div>
    );
}

export default function StatsSection() {
    return (
        <section className="py-16 md:py-28">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <StaggerContainer stagger={0.15} className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0">
                    {stats.map((stat, index) => (
                        <StaggerItem key={stat.label} direction="up">
                            <div className={`text-center ${index > 0 ? 'lg:border-l border-border' : ''}`}>
                                <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                                <p className="text-sm text-muted mt-2 tracking-wide">
                                    {stat.label}
                                </p>
                            </div>
                        </StaggerItem>
                    ))}
                </StaggerContainer>
            </div>
        </section>
    );
}
