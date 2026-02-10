import React from "react";

export const BackgroundGradient = ({
    children,
    className = "",
    containerClassName = "",
    animate = true,
}) => {
    return (
        <div className={`bg-gradient-container ${containerClassName}`}>
            <div className={`content-wrapper ${className}`}>
                {children}
            </div>
            <style>{`
        .bg-gradient-container {
            position: relative;
            padding: 2px; /* Space for the border */
            border-radius: var(--radius-lg);
            background: var(--bg-secondary);
            isolation: isolate;
        }

        .content-wrapper {
            position: relative;
            background: var(--bg-secondary);
            border-radius: calc(var(--radius-lg) - 2px); /* Match radius */
            height: 100%;
            width: 100%;
            z-index: 10;
        }

        /* The animated gradient layer */
        .bg-gradient-container::before {
            content: "";
            position: absolute;
            inset: -2px; /* Extend outside */
            background: conic-gradient(
                from 0deg, 
                var(--accent-red), 
                var(--accent-purple), 
                var(--accent-blue), 
                var(--accent-red)
            );
            border-radius: var(--radius-lg);
            z-index: -1;
            animation: rot 5s linear infinite;
            opacity: 0; /* Hidden by default */
            transition: opacity 0.5s;
        }
        
        /* Show on hover if animate is true */
        .bg-gradient-container:hover::before {
            opacity: ${animate ? 1 : 0};
        }

        /* Add a secondary blur layer for glow effect */
        .bg-gradient-container::after {
            content: "";
            position: absolute;
            inset: -10px;
            background: conic-gradient(
                from 0deg, 
                var(--accent-red), 
                var(--accent-purple), 
                var(--accent-blue), 
                var(--accent-red)
            );
            border-radius: var(--radius-lg);
            z-index: -2;
            animation: rot 5s linear infinite;
            filter: blur(20px);
            opacity: 0;
            transition: opacity 0.5s;
        }

        .bg-gradient-container:hover::after {
            opacity: ${animate ? 0.6 : 0};
        }
      `}</style>
        </div>
    );
};
