
import notMoreImg from '@/assets/img/undraw/undraw_visionary_technology_re_jfp7.svg';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';


const AppNotComments = () => {
    const [t] = useTranslation('core');

    return (
        <>
            <div className="app-container-fade text-sm max-w-full min-h-40 p-2 mt-2">
                <div className="h-40 flex justify-center items-center flex-col gap-4">
                    <p className="text-mode-primary text-center">
                        {
                            t('messages.labels.comment.end-comments')
                        }
                    </p>
                    <div className="bg-mode-black rounded-xl">
                            <motion.img
                                src={notMoreImg.src}
                                className="w-24 h-24"
                                initial={{
                                    scale: 0.5,
                                    opacity: 0.5
                                }}
                                animate={{
                                    scale: 1,
                                    opacity: 1,
                                    transition: {
                                        duration: 2,
                                        ease: 'easeInOut'
                                    }
                                }}
                            >

                            </motion.img>
                            <motion.div
                                className="absolute top-0 normal-case"
                                initial={{ x: 0, y: 0 }}
                                animate={{
                                    x: '-4.5rem',
                                    transition: { duration: 1, ease: 'easeInOut' },
                                    rotate: 12
                                }}
                            >
                                <span className="text-mode-primary bg-mode-comment p-2 rounded-xl">
                                    {t('messages.labels.post.click-here')}
                                </span>
                            </motion.div>

                    </div>
                </div>
            </div>
        </>
    );
};


export default AppNotComments;