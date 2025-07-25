import { deleteCookie, getCookie, setCookie } from '@/modules/core/utilities/cookies';
import { mergeUserProvider, verifyAdminUser } from '@/modules/core/utilities/mergeUserProvider';
import type { User } from '@/modules/web/@types/web';

import { jwtDecode } from 'jwt-decode';
import { create } from 'zustand';

type uploadPhotoFn = {
    (payload: string): unknown;
    (file: Blob): unknown;
};

type AuthProps = {
    token: string | null;
    user: User | null;
    updateToken: (payload: string, timeExpired: string) => unknown;
    updateUser: (payload: string) => unknown;
    updatePhoto: uploadPhotoFn;
    isLogin: boolean;
    isProvider: boolean;
    isAdmin: boolean;
    logout: () => unknown;
};

let jwt: string = '';
let token: null | string = getCookie('token');

if (token) {
    token = atob(token);
};

const tokenExist = Boolean(token);


if (!localStorage.jwt) {
    localStorage.setItem('jwt', '');
} else {
    jwt = localStorage.getItem('jwt') || '';
}




export const useAuthStore = create<AuthProps>()((set) => {
    let user: User | null = null;
    try {
        user = jwt !== '' ? jwtDecode(jwt || '') : null;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {
        user = null;
    }

    if (user) {
        user = mergeUserProvider(user);
    }

    if (!tokenExist) {
        localStorage.removeItem('jwt');
    }

    return {
        token: token,
        user: tokenExist ? user : null,
        isLogin: tokenExist,
        updateToken: (payload: string, timeExpired: string) => set((state) => {
            setCookie('token', btoa(payload), timeExpired);
            return {
                ...state,
                token: payload,
                isLogin: true
            };
        }),
        updateUser: (payload: string) => set((state) => {
            localStorage.setItem('jwt', payload);
            let user: User | null = payload !== '' ? jwtDecode(payload,) : null;

            if (user && user.is_user_provider) {
                user = mergeUserProvider(user);
            };

            return {
                ...state,
                user: user,
                isProvider: true,
                isAdmin: user?.data_login_social_media ?
                    verifyAdminUser(typeof user.data_login_social_media === 'string' ?
                        user.data_login_social_media : '')
                    : false
            };
        }),
        logout: () => set(() => {
            deleteCookie('token');
            localStorage.removeItem('jwt');
            return {
                user: null,
                isLogin: false,
                token: null,
                isProvider: false
            };
        }),
        updatePhoto: (payloadOrFile) => set((state) => {

            if (payloadOrFile instanceof Blob) {
                const file = new FileReader();
                file.readAsDataURL(payloadOrFile);

                file.onload = () => {
                    const path = file.result;
                    if (typeof path === 'string' && user) {
                        user.photo = path;
                    }
                };
                return {
                    ...state,
                    user: user
                };
            }

            if (user) {
                user.photo = payloadOrFile;
                return {
                    ...state,
                    user: user,
                };
            }

            return {
                ...state,
                user: user,
            };
        }),
        isProvider: user?.is_user_provider ? true : false,
        isAdmin: user?.data_login_social_media ? verifyAdminUser(typeof user.data_login_social_media === 'string' ? user.data_login_social_media : '') : false
    };
});