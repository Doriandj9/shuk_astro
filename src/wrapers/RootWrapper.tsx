
import i18next from 'i18next';
import { I18nextProvider } from 'react-i18next';
import core_es from '@core/translations/es/core.json';
import core_en from '@core/translations/en/core.json';
import web_es from '@web/translations/es/web.json';
import web_en from '@web/translations/en/web.json';
import type { LanguageApp } from '@/config/@types/app';
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { initReactI18next } from 'react-i18next';


let lngDefault: LanguageApp = 'es';

if (localStorage.languageApp) {
    const op = localStorage.languageApp;

    switch (op) {
        case 'es':
            lngDefault = 'es';
            break;

        case 'en':
            lngDefault = 'en';
            break;

        default:
            lngDefault = 'es';
    }
}

i18next
    .use(initReactI18next)
    .init({
        lng: lngDefault,
        interpolation: { escapeValue: true },
        resources: {
            es: {
                core: core_es,
                web: web_es
            },
            en: {
                core: core_en,
                web: web_en
            }
        }
    });



type Props = {
    children?: React.ReactNode;
};
const client = new QueryClient();
export const RootWrapper: React.FC<Props> = ({ children }) => {

    return (
        <I18nextProvider i18n={i18next}>
            <QueryClientProvider client={client}>
                {children}
                <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
        </I18nextProvider>
    );
};


// export const LoginWrapper = () => {

//     return (
//         <>
//             <AppLayout>
//                 <Login />
//             </AppLayout>
//         </>
//     );
// };