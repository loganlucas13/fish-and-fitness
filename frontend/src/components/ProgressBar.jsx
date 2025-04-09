const ProgressBar = ({ progress }) => {
    return (
        <>
            <div className="w-full bg-[var(--foreground)] rounded-full h-4">
                <div
                    className="bg-[var(--menu-dark)] h-4 rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                ></div>
            </div>
        </>
    );
};

export { ProgressBar };
