import React, { useEffect, useRef, type ReactNode } from 'react';

interface GlowCardProps {
    children: ReactNode;
    className?: string;
    glowColor?: 'yellow' | 'blue' | 'purple' | 'green' | 'red' | 'orange';

    onClick?: () => void;
}

const glowColorMap = {
    yellow: { base: 45, spread: 60 },
    blue: { base: 220, spread: 200 },
    purple: { base: 280, spread: 300 },
    green: { base: 120, spread: 200 },
    red: { base: 0, spread: 200 },
    orange: { base: 30, spread: 200 }
};

const GlowCard: React.FC<GlowCardProps> = ({
    children,
    className = '',
    glowColor = 'yellow',
    onClick,
}) => {
    const cardRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const syncPointer = (e: PointerEvent) => {
            const { clientX: x, clientY: y } = e;

            if (cardRef.current) {
                cardRef.current.style.setProperty('--x', x.toFixed(2));
                cardRef.current.style.setProperty('--xp', (x / window.innerWidth).toFixed(2));
                cardRef.current.style.setProperty('--y', y.toFixed(2));
                cardRef.current.style.setProperty('--yp', (y / window.innerHeight).toFixed(2));
            }
        };

        document.addEventListener('pointermove', syncPointer);
        return () => document.removeEventListener('pointermove', syncPointer);
    }, []);

    const { base, spread } = glowColorMap[glowColor];

    const getInlineStyles = (): React.CSSProperties & Record<string, string | number> => ({
        '--base': base,
        '--spread': spread,
        '--radius': '0',
        '--border': '1',
        '--backdrop': 'hsl(0 0% 60% / 0.06)',
        '--backup-border': 'var(--backdrop)',
        '--size': '150', // Scaled down 25% from 200
        '--outer': '1',
        '--border-size': 'calc(var(--border, 2) * 1px)',
        '--spotlight-size': 'calc(var(--size, 150) * 1px)',
        '--hue': 'calc(var(--base) + (var(--xp, 0) * var(--spread, 0)))',
        backgroundImage: `radial-gradient(
      var(--spotlight-size) var(--spotlight-size) at
      calc(var(--x, 0) * 1px)
      calc(var(--y, 0) * 1px),
      hsl(var(--hue, 210) calc(var(--saturation, 100) * 1%) calc(var(--lightness, 70) * 1%) / var(--bg-spot-opacity, 0.1)), transparent
    )`,
        backgroundColor: 'var(--backdrop, transparent)',
        backgroundSize: 'calc(100% + (2 * var(--border-size))) calc(100% + (2 * var(--border-size)))',
        backgroundPosition: '50% 50%',
        backgroundAttachment: 'fixed',
        border: 'var(--border-size) solid var(--backup-border)',
        position: 'relative' as const,
        touchAction: 'none' as const,
    });

    return (
        <>
            <div
                ref={cardRef}
                data-glow
                onClick={onClick}
                style={getInlineStyles()}
                className={`
          relative 
          shadow-[0_1rem_2rem_-1rem_black] 
          backdrop-blur-[5px]
          ${className}
        `}
            >
                <div data-glow className="pointer-events-none"></div>
                {children}
            </div>
        </>
    );
};

export { GlowCard };
