'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

/**
 * AnimatedList component that animates the display of its children elements.
 *
 * @component
 * @example
 * <AnimatedList className="my-class" delay={1500}>
 *   <div>Item 1</div>
 *   <div>Item 2</div>
 *   <div>Item 3</div>
 * </AnimatedList>
 *
 * @param {Object} props - The component props.
 * @param {string} [props.className] - Additional class names to apply to the container.
 * @param {React.ReactNode} props.children - The child elements to be animated.
 * @param {number} [props.delay=1000] - The delay in milliseconds between each animation step.
 *
 * @returns {JSX.Element} The rendered component.
 */
export const AnimatedList = React.memo(({ className, children, delay = 1000 }) => {
    const [index, setIndex] = useState(0);
    const childrenArray = React.Children.toArray(children);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prevIndex) => (prevIndex + 1) % childrenArray.length);
        }, delay);

        return () => clearInterval(interval);
    }, [childrenArray.length, delay]);

    const itemsToShow = useMemo(
        () => childrenArray.slice(0, index + 1).reverse(),
        [index, childrenArray],
    );

    return (
        <div className={`flex flex-col items-center gap-4 ${className}`}>
            <AnimatePresence>
                {itemsToShow.map((item) => (
                    <AnimatedListItem key={typeof item === 'string' ? item : item.key}>
                        {item}
                    </AnimatedListItem>
                ))}
            </AnimatePresence>
        </div>
    );
});

AnimatedList.displayName = 'AnimatedList';

/**
 * AnimatedListItem component renders a motion.div with animation properties.
 *
 * @param {Object} props - The properties object.
 * @param {React.ReactNode} props.children - The child elements to be rendered inside the motion.div.
 * @returns {JSX.Element} The rendered motion.div component with animations.
 */
export function AnimatedListItem({ children }) {
    const animations = {
        initial: { scale: 0, opacity: 0 },
        animate: { scale: 1, opacity: 1, originY: 0 },
        exit: { scale: 0, opacity: 0 },
        transition: { type: 'spring', stiffness: 350, damping: 40 },
    };

    return (
        <motion.div {...animations} layout className="mx-auto w-full">
            {children}
        </motion.div>
    );
}
