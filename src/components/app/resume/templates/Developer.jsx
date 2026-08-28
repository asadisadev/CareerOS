import React from "react";

const DeveloperCard = () => {
    return (
        <div className="min-h-screen bg-[#0d1117] flex items-center justify-center p-6 font-mono">
            <div className="w-full max-w-3xl bg-[#161b22] rounded-2xl p-8 md:p-10 border border-[#30363d] shadow-2xl">
                {/* Header: curriculum vitae */}
                <div className="text-[#8b949e] text-xs md:text-sm tracking-widest uppercase mb-6">
                    curriculum vitae – james porter, 2026
                </div>

                {/* Name */}
                <h1 className="text-white text-4xl md:text-5xl font-bold tracking-tight mb-2">
                    James Porter
                </h1>

                {/* Subtitle */}
                <p className="text-[#c9d1d9] text-lg md:text-xl font-light mb-8">
                    Senior Backend Designer – Distributed Systems
                </p>

                {/* Profile Section */}
                <div className="mb-8">
                    <h2 className="text-[#58a6ff] uppercase text-sm font-semibold tracking-wide mb-2">
                        profile
                    </h2>
                    <p className="text-[#c9d1d9] text-base leading-relaxed">
                        Backend engineer with 8 years building distributed systems at scale. Strong
                        opinions on observability, weakly held opinions on tooling. Currently
                        shipping at Vertex.
                    </p>
                </div>

                {/* Experience Section */}
                <div className="mb-8">
                    <h2 className="text-[#58a6ff] uppercase text-sm font-semibold tracking-wide mb-4">
                        Experience
                    </h2>

                    {/* Job 1 */}
                    <div className="mb-5">
                        <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                            <span className="text-white font-semibold text-base">
                                Senior Backend Engineer
                            </span>
                            <span className="text-[#8b949e] text-sm">
                                Byte 2022 – now
                            </span>
                        </div>
                        <p className="text-[#c9d1d9] text-sm leading-relaxed mt-1">
                            Led payments platform migration to event-driven microservices. p99
                            latency 840ms → 120ms across 14 services. Mentor of 6.
                        </p>
                    </div>

                    {/* Job 2 */}
                    <div className="mb-5">
                        <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                            <span className="text-white font-semibold text-base">
                                Backend Engineer
                            </span>
                            <span className="text-[#8b949e] text-sm">
                                Circuit 2020 – 2022
                            </span>
                        </div>
                        <p className="text-[#c9d1d9] text-sm leading-relaxed mt-1">
                            Built order pipeline handling 2M+ daily transactions. Designed
                            rate-limiting infra now used platform-wide.
                        </p>
                    </div>

                    {/* Job 3 */}
                    <div>
                        <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                            <span className="text-white font-semibold text-base">
                                Software Engineer
                            </span>
                            <span className="text-[#8b949e] text-sm">
                                Gravity Soft 2018 – 2020
                            </span>
                        </div>
                        <p className="text-[#c9d1d9] text-sm leading-relaxed mt-1">
                            Owned data ingestion pipeline processing 800GB of daily logs.
                        </p>
                    </div>
                </div>

                {/* Stack Section */}
                <div>
                    <h2 className="text-[#58a6ff] uppercase text-sm font-semibold tracking-wide mb-3">
                        Stack
                    </h2>
                    <div className="space-y-1 text-[#c9d1d9] text-sm">
                        <div>
                            <span className="text-[#8b949e]">primary</span>
                            <span className="text-[#8b949e] mx-2">:</span>
                            <span className="text-[#f0f6fc]">"Go – Python – TS"</span>
                        </div>
                        <div>
                            <span className="text-[#8b949e]">infra</span>
                            <span className="text-[#8b949e] mx-2">:</span>
                            <span className="text-[#f0f6fc]">"K8s – Terraform – AWS"</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DeveloperCard;