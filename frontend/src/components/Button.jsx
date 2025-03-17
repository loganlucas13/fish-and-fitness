const Button = ({ buttonText, variant, onClick, disabled }) => {
    // handler for button clicks
    const handleClick = () => {
        if (disabled) {
            return;
        }
        onClick();
    };

    // applied to all button variants
    const defaultStyling =
        'flex flex-row px-4 py-2 rounded-xl hover:cursor-pointer';

    // styling for different variants
    const variantStyles = {
        primary:
            'bg-[var(--menu-background)] text-[var(--menu-dark)] border-[var(--menu-dark)] border-2',
    };

    if (!variant) {
        // case where user does not explicitly choose a variant
        variant = 'primary';
    }
    const selectedVariantStyle = variantStyles[variant];

    return (
        <>
            <button onClick={handleClick}>
                <div className={`${defaultStyling} ${selectedVariantStyle}`}>
                    {buttonText}
                </div>
            </button>
        </>
    );
};

export { Button };
