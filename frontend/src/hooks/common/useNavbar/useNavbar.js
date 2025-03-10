"use client";
import { useState, useCallback } from 'react';

const useNavbar = () => {
    const [menuState, setMenuState] = useState({
        isOpen: false,          // Controls main drawer visibility
        activeMenu: null,       // Controls which submenu is shown
        isAnimating: false      // Tracks animation state
    });

    const { isOpen, activeMenu } = menuState;

    // Toggle drawer (main menu) open/close
    const toggleDrawer = useCallback(() => {
        if (!isOpen) {
            // Opening the drawer
            setMenuState(prev => ({
                ...prev,
                isOpen: true
            }));
        } else {
            // closing the drawer
            setMenuState(prev => ({
                ...prev,
                isOpen: false,
            }));

            // Reset entire menu state after animation completes
            setTimeout(() => {
                setMenuState({
                    isOpen: false,
                    activeMenu: null,
                    isAnimating: false
                });
            }, 500); // Match the animation duration
        }
    }, [isOpen]);

    // Toggle submenu open/close
    const toggleSubmenu = useCallback((link) => {
        if (!activeMenu) {
            // Opening submenu
            setMenuState(prev => ({
                ...prev,
                activeMenu: link,
                isAnimating: false
            }));
        } else {
            // Closing with animation
            setMenuState(prev => ({
                ...prev,
                isAnimating: true
            }));

            // Reset only submenu state after animation completes
            setTimeout(() => {
                setMenuState(prev => ({
                    ...prev,
                    activeMenu: null,
                    isAnimating: false
                }));
            }, 300); // Match the transition-duration value
        }
    }, [activeMenu]);

    return {
        menuState,
        setMenuState,
        toggleDrawer,
        toggleSubmenu
    };
};

export default useNavbar;