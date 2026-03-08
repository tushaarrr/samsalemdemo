'use client';

import { useState, useMemo } from 'react';
import { formatPrice } from '@/lib/utils';

export default function MortgageCalculatorPage() {
    const [homePrice, setHomePrice] = useState(1500000);
    const [downPayment, setDownPayment] = useState(300000);
    const [interestRate, setInterestRate] = useState(5.5);
    const [amortization, setAmortization] = useState(25);

    const monthlyPayment = useMemo(() => {
        const principal = homePrice - downPayment;
        if (principal <= 0) return 0;
        const monthlyRate = interestRate / 100 / 12;
        const numPayments = amortization * 12;
        if (monthlyRate === 0) return principal / numPayments;
        const payment =
            (principal * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
            (Math.pow(1 + monthlyRate, numPayments) - 1);
        return Math.round(payment);
    }, [homePrice, downPayment, interestRate, amortization]);

    const downPaymentPercent = homePrice > 0 ? ((downPayment / homePrice) * 100).toFixed(1) : '0';
    const totalCost = monthlyPayment * amortization * 12;
    const totalInterest = totalCost - (homePrice - downPayment);

    return (
        <div className="min-h-screen bg-background">
            <div className="bg-primary pt-28 pb-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <p className="text-accent font-body font-semibold text-sm tracking-[0.15em] uppercase mb-3">
                        Tools
                    </p>
                    <h1 className="text-3xl md:text-4xl font-heading font-bold text-white">
                        Mortgage calculator
                    </h1>
                    <p className="text-white/70 font-body mt-2 text-base">
                        Estimate your monthly mortgage payments in seconds.
                    </p>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Inputs */}
                    <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm">
                        <div className="space-y-6">
                            <div>
                                <label className="flex justify-between text-sm font-body font-medium text-foreground mb-2">
                                    <span>Home Price</span>
                                    <span className="text-accent">{formatPrice(homePrice)}</span>
                                </label>
                                <input
                                    type="range"
                                    min={100000}
                                    max={5000000}
                                    step={10000}
                                    value={homePrice}
                                    onChange={(e) => setHomePrice(Number(e.target.value))}
                                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-accent"
                                />
                            </div>
                            <div>
                                <label className="flex justify-between text-sm font-body font-medium text-foreground mb-2">
                                    <span>Down Payment ({downPaymentPercent}%)</span>
                                    <span className="text-accent">{formatPrice(downPayment)}</span>
                                </label>
                                <input
                                    type="range"
                                    min={0}
                                    max={homePrice}
                                    step={5000}
                                    value={downPayment}
                                    onChange={(e) => setDownPayment(Number(e.target.value))}
                                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-accent"
                                />
                            </div>
                            <div>
                                <label className="flex justify-between text-sm font-body font-medium text-foreground mb-2">
                                    <span>Interest Rate</span>
                                    <span className="text-accent">{interestRate}%</span>
                                </label>
                                <input
                                    type="range"
                                    min={0.5}
                                    max={10}
                                    step={0.1}
                                    value={interestRate}
                                    onChange={(e) => setInterestRate(Number(e.target.value))}
                                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-accent"
                                />
                            </div>
                            <div>
                                <label className="flex justify-between text-sm font-body font-medium text-foreground mb-2">
                                    <span>Amortization</span>
                                    <span className="text-accent">{amortization} years</span>
                                </label>
                                <input
                                    type="range"
                                    min={5}
                                    max={30}
                                    step={1}
                                    value={amortization}
                                    onChange={(e) => setAmortization(Number(e.target.value))}
                                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-accent"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Results */}
                    <div className="space-y-6">
                        <div className="bg-primary rounded-2xl p-8 text-center">
                            <p className="text-white/60 font-body text-sm mb-1">Estimated Monthly Payment</p>
                            <p className="text-4xl md:text-5xl font-heading font-bold text-white mb-1">
                                {formatPrice(monthlyPayment)}
                            </p>
                            <p className="text-accent font-body text-sm">/month</p>
                        </div>

                        <div className="bg-white rounded-2xl border border-gray-100 p-6">
                            <dl className="space-y-3">
                                {[
                                    { label: 'Mortgage Amount', value: formatPrice(homePrice - downPayment) },
                                    { label: 'Total Interest', value: formatPrice(totalInterest > 0 ? totalInterest : 0) },
                                    { label: 'Total Cost', value: formatPrice(totalCost > 0 ? totalCost : 0) },
                                ].map((item) => (
                                    <div key={item.label} className="flex justify-between py-2 border-b border-gray-50 last:border-0">
                                        <dt className="text-muted font-body text-sm">{item.label}</dt>
                                        <dd className="text-foreground font-body text-sm font-medium">{item.value}</dd>
                                    </div>
                                ))}
                            </dl>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
