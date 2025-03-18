// import { useTranslation } from 'react-i18next';

// const useCustomTranslation = () => {
//     const { t, i18n } = useTranslation();

//     const changeLanguage = (lng) => {
//         i18n.changeLanguage(lng);
//     };

//     return { t, changeLanguage };
// };

// export default useCustomTranslation;

import { useTranslation } from 'react-i18next';
import i18n from './i18n'; // Adjust the import path

const useCustomTranslation = () => {
    const { t } = useTranslation();

    const changeLanguage = (lng) => {
        if (i18n) {
            i18n.changeLanguage(lng);
        } else {
            console.error('i18n is not initialized');
        }
    };

    return { t, changeLanguage };
};

export default useCustomTranslation;