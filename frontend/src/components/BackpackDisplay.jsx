import { Button } from './Button';
const BackpackDisplay = ({ inventoryList, handleOpening }) => {
    return (
        <>
            <div className="absolute w-2/5 h-3/4 translate-y-20 bg-[var(--foreground)] border-2 border-[var(--water-dark)] rounded-xl shadow-xl">
                <div className="flex items-center justify-center bg-[var(--menu-light)] rounded-t-xl">
                    <h1 className="w-full text-center text-2xl text-[var(--water-dark)] px-4 py-2 ">
                        backpack
                    </h1>
                </div>
                <div className="flex flex-col overflow-y-scroll p-4 h-11/12 border-t-2 border-[var(--water-dark)] items-center justify-start">
                    <div className="flex flex-row flex-wrap items-center justify-center gap-10">
                        {inventoryList.flatMap((item, itemIndex) =>
                            Array.from({ length: item.quantity }, (_, i) => (
                                <InventoryItem
                                    key={`${itemIndex}-${i}`} // setting weird keys to ensure no duplicates
                                    item={item}
                                    handleClick={() => handleOpening(item)}
                                />
                            ))
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

const InventoryItem = ({ item, handleClick }) => {
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

    const { border, text, bg } = rarityClassMap[item.rarity];

    return (
        <div className="flex flex-col items-center">
            <div
                className={`flex ${bg} ${text} ${border} border-2 p-4 rounded-xl w-36 aspect-square text-center items-center justify-center shadow-lg gap-2`}
            >
                <div className="flex flex-col justify-between h-5/6 items-center">
                    <span className="text-xl font-bold w-3/4">Fish Crate</span>

                    <div>
                        <Button
                            variant={item.rarity}
                            onClick={handleClick}
                            buttonText="open"
                        />
                    </div>
                </div>
            </div>
            <span className={`${text} text-lg`}>{item.rarity}</span>
        </div>
    );
};

export { BackpackDisplay };
