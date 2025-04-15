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
                    <div className="flex flex-row flex-wrap items-center justify-center gap-6">
                        {inventoryList.map((item, index) => (
                            <InventoryItem
                                key={index}
                                item={item}
                                handleClick={() => {
                                    handleOpening(item);
                                }}
                            ></InventoryItem>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

const InventoryItem = ({ item, handleClick }) => {
    return (
        <>
            <div className="flex bg-[var(--menu-light)] text-[var(--water-dark)] border-2 border-[var(--water-dark)] p-4 rounded-xl w-1/4 aspect-square text-center items-center justify-center shadow-lg">
                <div className="flex flex-col">
                    <span className="text-lg font-bold">{item.name}</span>

                    <div className="gap-4">{item.rarity}</div>

                    <Button
                        variant="secondary"
                        onClick={handleClick}
                        buttonText="open"
                    />
                </div>
            </div>
        </>
    );
};

export { BackpackDisplay };
