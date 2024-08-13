
import AsyncStorage from '@react-native-async-storage/async-storage';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import translation files
import enTranslation from './locales/en/translation.json';
import frTranslation from './locales/fr/translation.json';

const defaultLanguage = 'en';

const getStoredLanguage = async () => {
    try {
        const language = await AsyncStorage.getItem('language');
        return language || defaultLanguage;
    } catch (error) {
        console.error('Error getting language from AsyncStorage:', error);
        return defaultLanguage;
    }
};

const setStoredLanguage = async (language) => {
    try {
        await AsyncStorage.setItem('language', language);
    } catch (error) {
        console.error('Error setting language to AsyncStorage:', error);
    }
};

getStoredLanguage().then((language) => {
    i18n
        .use(initReactI18next)
        .init({
            resources: {
                en: {
                    translation: enTranslation,
                },
                fr: {
                    translation: frTranslation,
                },
            },
            lng: language, // default language
            fallbackLng: defaultLanguage,
            interpolation: {
                escapeValue: false, // React already safes from XSS
            },
        });
});

// i18n
//     .use(initReactI18next)
//     .init({
//         resources: {
//             en: {
//                 translation: enTranslation,
//             },
//             de: {
//                 translation: deTranslation,
//             },
//         },
//         lng: defaultLanguage, // default language
//         fallbackLng: defaultLanguage,
//         interpolation: {
//             escapeValue: false, // React already safes from XSS
//         },
//     });

i18n.on('languageChanged', (language) => {
    setStoredLanguage(language);
});





// for now 13.8.2024
// const initializeI18n = async () => {
//     const language = await getStoredLanguage();

//     i18n
//         .use(initReactI18next)
//         .init({
//             resources: {
//                 en: { translation: enTranslation },
//                 de: { translation: deTranslation },
//             },
//             lng: language, // default language
//             fallbackLng: defaultLanguage,
//             interpolation: {
//                 escapeValue: false, // React already safes from XSS
//             },
//         });

//     i18n.on('languageChanged', setStoredLanguage);
// };

// initializeI18n();


export default i18n;
