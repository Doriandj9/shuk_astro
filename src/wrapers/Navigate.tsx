

export const useNavigate = () => {
    return (path: string, options?: { replace?: boolean }) => {
        if (options?.replace) {
            window.history.replaceState({}, '', path);
        } else {
            window.history.pushState({}, '', path);
        }
    };

};