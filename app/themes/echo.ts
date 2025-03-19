import { definePreset } from '@primeuix/themes';
import Aura from '@primeuix/themes/aura';
import echoConfig from "@/echo.config";

const MyPreset = definePreset(Aura, {
    semantic: {
        primary: {
            50: '#f0f9ff',
            100: '#e0f2fe',
            200: '#bae6fd',
            300: '#7dd3fc',
            400: '#38bdf8',
            500: '#0ea5e9',
            600: '#0284c7',
            700: '#0369a1',
            800: '#075985',
            900: '#0c4a6e',
            950: '#082f49'
        },
        ...echoConfig.theme,
    }
});

export default {
    preset: MyPreset,
    options: {
        darkModeSelector: '.dark-mode'
    },
    ripple: true,
};

