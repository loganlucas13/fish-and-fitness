const StatsDisplay = ({ statList }) => {
    return (
        <>
            <div className="absolute w-2/5 h-3/4 translate-y-20 bg-[var(--foreground)] border-2 border-[var(--water-dark)] rounded-xl shadow-xl">
                <div className="flex items-center justify-center bg-[var(--menu-light)] rounded-t-xl">
                    <h1 className="w-full text-center text-2xl text-[var(--water-dark)] px-4 py-2 ">
                        stats
                    </h1>
                </div>
                <div className="overflow-y-scroll p-4 h-11/12 border-t-2 border-[var(--water-dark)]">
                    <div className="flex flex-row flex-wrap justify-center items-center gap-20 translate-y-5">
                        {statList.map((stat, index) => (
                            <Stat key={index} stat={stat}></Stat>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

const Stat = ({ stat }) => {
    return (
        <>
            <div className="flex bg-[var(--menu-light)] text-[var(--water-dark)] border-2 border-[var(--water-dark)] p-4 rounded-xl w-1/3 aspect-square text-center items-center justify-center shadow-lg">
                <div className="flex flex-col">
                    <span className="text-lg font-bold">{stat.name}</span>

                    <div className="gap-4">
                        {stat.amount} {stat.label}
                    </div>
                </div>
            </div>
        </>
    );
};

export { StatsDisplay };
