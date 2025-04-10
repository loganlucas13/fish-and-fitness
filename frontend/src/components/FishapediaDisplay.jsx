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
    return (
        <>
            <div className="flex bg-[var(--menu-light)] text-[var(--water-dark)] border-2 border-[var(--water-dark)] p-4 rounded-xl w-1/4 aspect-square text-center items-center justify-center shadow-lg">
                <div className="flex flex-col">
                    <span className="text-lg font-bold">{fishData.name}</span>
                    <span># caught: {fishData.timesCaught}</span>
                </div>
            </div>
        </>
    );
};

export { FishapediaDisplay };
