
import notMoreImg from '@/assets/img/undraw/undraw_visionary_technology_re_jfp7.svg';
import { useTranslation } from 'react-i18next';


export const AppNotNotifies = ({text}: {text?:string}) => {
    const [t] = useTranslation('core');


    return (
        <>
            <div className="app-container-fade text-sm max-w-full min-h-24 p-2 mt-2">
                <div className="min-h-24 flex justify-center items-center flex-col gap-4">
                    <p className="text-mode-primary text-center">
                        {
                            text ? text : t('messages.labels.notifications.end-notifications')
                        }
                    </p>
                    <p>
                        <img src={notMoreImg.src}
                        className='w-16 h-16'
                        alt="" />
                    </p>
                </div>
            </div>
        </>
    );
};

