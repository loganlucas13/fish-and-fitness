const Button = ({
    buttonText,
    icon,
    iconPosition,
    variant,
    onClick,
    disabled,
}) => {
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
            'bg-[var(--foreground)] text-[var(--water-dark)] text-lg shadow-lg',
    };

    if (!variant) {
        // case where user does not explicitly choose a variant
        variant = 'primary';
    }
    const selectedVariantStyle = variantStyles[variant];

    if (!iconPosition && icon) {
        iconPosition = 'left';
    }
    return (
        <>
            <button onClick={handleClick} className="group">
                <div className={`${defaultStyling} ${selectedVariantStyle}`}>
                    {icon && iconPosition === 'left' && (
                        <span className="pr-1">{icon}</span>
                    )}
                    {buttonText}
                    {icon && iconPosition === 'right' && (
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
