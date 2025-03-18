const Button = ({ buttonText, icon, variant, onClick, disabled }) => {
    // handler for button clicks
    const handleClick = () => {
        if (disabled) {
            return;
        }
        onClick();
    };

    // applied to all button variants
    const defaultStyling =
        'flex flex-row items-center px-4 py-2 rounded-xl hover:cursor-pointer group';

    // styling for different variants
    const variantStyles = {
        primary:
            'bg-[var(--water-dark)] text-[var(--foreground)] text-lg border-[var(--foreground)] border-2 shadow-lg',
    };

    if (!variant) {
        // case where user does not explicitly choose a variant
        variant = 'primary';
    }
    const selectedVariantStyle = variantStyles[variant];

    return (
        <>
            <button onClick={handleClick} className="group">
                <div className={`${defaultStyling} ${selectedVariantStyle}`}>
                    {buttonText}
                    {icon && (
                        <span className="pl-1 translate-x-1 group-hover:translate-x-2 transition-all">
                            {icon}
                        </span>
                    )}
                </div>
            </button>
        </>
    );
};

export { Button };
