import { Button } from './Button';

const Reward = ({ rewardData, onClose }) => {
    const fishList = rewardData.contents.fish_obtained;
    const rarity = rewardData.contents.rarity;

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

    const { border, text, bg } = rarityClassMap[rarity] || {};

    return (
        <div
            className={`absolute left-1/2 top-1/2 w-2/5 h-1/2 -translate-x-1/2 -translate-y-1/2 border-2 rounded-xl shadow-xl flex flex-col justify-center items-center p-6 space-y-4 ${border} ${bg} ${text}`}
        >
            <div className="flex flex-col items-center gap-10">
                <span className="text-3xl">You opened a {rarity} crate!</span>

                <div className="text-center">
                    <span className="text-2xl">Rewards obtained</span>
                    <div className="flex flex-col text-xl p-4 border-2 rounded-xl">
                        {fishList.map((fish, index) => (
                            <span key={index}>1x {fish.fishname}</span>
                        ))}
                    </div>
                </div>
                <Button
                    variant={rarity}
                    buttonText="Continue!"
                    onClick={onClose}
                />
            </div>
        </div>
    );
};

export { Reward };
