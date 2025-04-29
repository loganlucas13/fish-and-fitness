const FishapediaDisplay = ({ fishList }) => {
    return (
        <>
            <div className="absolute w-2/5 h-3/4 translate-y-20 bg-[var(--foreground)] border-2 border-[var(--water-dark)] rounded-xl shadow-xl">
                <div className="flex items-center justify-center bg-[var(--menu-light)] rounded-t-xl">
                    <h1 className="w-full text-center text-2xl text-[var(--water-dark)] px-4 py-2 ">
                        fishapedia
                    </h1>
                </div>
                <div className="overflow-y-scroll p-4 h-11/12 border-t-2 border-[var(--water-dark)]">
                    <div className="flex flex-row flex-wrap justify-center items-center gap-10">
                        {fishList.map((fish, index) => (
                            <Fish key={index} fishData={fish} />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

// used to display a single fish inside of the fishapedia
const Fish = ({ fishData }) => {
    const rarityClassMap = {
        Common: {
            border: 'border-neutral-400',
            text: 'text-neutral-500',
            bg: 'bg-[var(--menu-light)]',
        },
        Rare: {
            border: 'border-blue-400',
            text: 'text-blue-500',
            bg: 'bg-[#f2f5f9]',
        },
        Epic: {
            border: 'border-purple-400',
            text: 'text-purple-500',
            bg: 'bg-[#f7f5fa]',
        },
        Legendary: {
            border: 'border-amber-300',
            text: 'text-amber-500',
            bg: 'bg-[#fdf9f0]',
        },
        Mythical: {
            border: 'border-rose-300',
            text: 'text-rose-400',
            bg: 'bg-[#f9f4f4]',
        },
    };

    const { border, text, bg } = rarityClassMap[fishData.rarities] || {};

    return (
        <div className="flex flex-col items-center">
            <div
                className={`flex ${bg} ${text} border-2 ${border} p-4 rounded-xl w-36 aspect-square shadow-lg`}
            >
                <div className="flex flex-col w-full items-center justify-center text-center gap-2">
                    <span className="text-xl font-bold">
                        {fishData.fishname}
                    </span>
                    <span className="text-sm">
                        # caught: {fishData.quantity}
                    </span>
                </div>
            </div>
            <span className={`${text} text-lg`}>{fishData.rarities}</span>
        </div>
    );
};

export { FishapediaDisplay };
