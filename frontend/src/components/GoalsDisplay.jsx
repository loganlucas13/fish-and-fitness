import { ProgressBar } from './ProgressBar';

const GoalsDisplay = ({ goalList }) => {
    return (
        <>
            <div className="absolute w-2/5 h-3/4 translate-y-20 bg-[var(--foreground)] border-2 border-[var(--water-dark)] rounded-xl shadow-xl">
                <div className="flex items-center justify-center bg-[var(--menu-light)] rounded-t-xl">
                    <h1 className="w-full text-center text-2xl text-[var(--water-dark)] px-4 py-2 ">
                        goals
                    </h1>
                </div>
                <div className="flex flex-col overflow-y-scroll p-4 h-11/12 border-t-2 border-[var(--water-dark)] gap-4">
                    {goalList.map((goal, index) => (
                        <Goal key={index} goalData={goal} />
                    ))}
                </div>
            </div>
        </>
    );
};

const Goal = ({ goalData }) => {
    return (
        <>
            <div className="flex flex-row items-center bg-[var(--menu-light)] text-[var(--water-dark)] border-2 border-[var(--water-dark)] px-4 py-2 rounded-xl place-content-between gap-8 shadow-lg">
                <span className="text-lg font-bold">{goalData.name}</span>
                <ProgressBar progress={goalData.progress} />
                <span>reward: {goalData.reward} crate(s) </span>
            </div>
        </>
    );
};

export { GoalsDisplay };
