import { Fish, CircleSmall, Bike } from 'lucide-react';

function Title() {
    return (
        <>
            <div className="text-5xl text-[var(--foreground)]">
                <div className="relative w-fit">
                    <CircleSmall
                        className="absolute left-[95%] top-[-30%]"
                        size={12}
                        strokeWidth={3}
                    />
                    <CircleSmall
                        className="absolute left-[70%] top-[-25%]"
                        size={18}
                        strokeWidth={2}
                    />
                    <CircleSmall
                        className="absolute left-[85%] top-[-10%]"
                        size={24}
                        strokeWidth={1.5}
                    />
                    <Fish className="pb-1" size={48} />
                </div>
                <div className="relative">
                    <Bike className="absolute top-[-17px] left-[55%] rotate-[-20deg]" />
                </div>
                <span className="drop-shadow-xl">Fish and Fitness</span>
            </div>
        </>
    );
}

export { Title };
