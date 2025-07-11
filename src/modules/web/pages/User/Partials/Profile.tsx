import AppAvatar from "@/modules/core/components/AppAvatar";
import AppInput from "@/modules/core/components/AppInput";
import { useAuthStore } from "@/store/auth";
import { Button } from "@mui/material";
import type { SubmitHandler} from "react-hook-form";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import { ProfileFormTYpe, useProfileSchema } from "@/modules/web/validations/profileSchema";
import { ChangeEventHandler, useMemo, useState } from "react";
import AppSelect from "@/modules/core/components/AppSelect";
import { genderValues } from "@/config/app";
import { useLanguageApp } from "@/store/language";
import { zodResolver } from "@hookform/resolvers/zod";
import { convertImg } from "@/modules/core/utilities/img/convert";
import { useUpdateConfig } from "@/modules/web/hooks/user/hook";
import { useDataCountries } from "@/store/countries";
import { useAppToast } from "@/modules/core/hooks/useAppToast";
import { AppPhoneNumberInput } from "@/modules/core/components/AppPhoneNumberInput";



const Profile = () => {
    const user = useAuthStore((state) => state.user);
    const reloadUser = useAuthStore((state) => state.updateUser);
    const [userClone, setUserClone] = useState(user);
    const language = useLanguageApp((state) => state.language);
    const { config } = useUpdateConfig();
    const { toastPromise } = useAppToast();


    const [t] = useTranslation('web');
    const [tCore] = useTranslation('core');

    const dataCountries = useDataCountries((state) => state.countries);
    const schema = useProfileSchema();
    const { control, register, handleSubmit } = useForm<ProfileFormTYpe>({
        defaultValues: {
            full_name: user?.full_name ?? 'error',
            about_me: user?.about_me,
            gender: user?.gender,
            birthday: typeof user?.birthday === 'object' ? user.birthday?.toDateString() : user?.birthday,
            nationality: user?.nationality ?? undefined,
            phone: user?.phone ?? undefined
        },
        resolver: zodResolver(schema)
    });
    const countries = useMemo(() => {
        return dataCountries.map((country => ({
            value: country.alpha2Code,
            label: country.name
        })));
    }, [dataCountries]);

    const genders = useMemo(() => {
        return genderValues[language];
    }, [dataCountries, language]);


    const saveChanges: SubmitHandler<ProfileFormTYpe> = (data) => {
        if (data.photo instanceof FileList && data.photo.length > 0) {
            data.photo = data.photo[0];
        } else {
            data.photo = null;
        }

        const prom = new Promise((resolve, reject) => {
            config.mutateAsync(data)
                .then(resolve)
                .catch(reject);
        });

        toastPromise(
            prom,
            tCore('messages.labels.app.update-success'),
            undefined,
            (response) => {
                if (response && 'jwt' in response && typeof response.jwt === 'string') {
                    reloadUser(response.jwt);
                }
            },
        );
    };

    const { onChange, ...methods } = { ...register('photo') };

    const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        if (e.currentTarget.files instanceof FileList && e.currentTarget.files.length > 0) {
            convertImg(e.currentTarget.files[0], (result: string) => {
                setUserClone((state) => {
                    if (user) {
                        return { ...state, id: state?.id ?? -1, photo: result };
                    }
                    return state;
                });
            });
        }
        onChange(e);
    };

    return (
        <>
            <div className="p-0 md:ps-4">
                <h2 className="text-2xl font-bold ">{t('descriptions.profile')}</h2>
                <form onSubmit={handleSubmit(saveChanges)}>
                    <div className="mt-6 flex  md:flex-row flex-col md:items-center">
                        <AppAvatar size="big" user={userClone} />
                        <div>
                            <div className="">
                                <Button sx={{ textTransform: 'none' }} endIcon={<AddAPhotoIcon />} className="">
                                    <label htmlFor="input-photo" className="cursor-pointer">{t('descriptions.upload-image')}</label>
                                </Button>
                                <div className="hidden">
                                    <input type="file" id="input-photo" accept="image/*" {...methods} onChange={handleChange} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <AppInput
                        className="mt-6"
                        labelStrong
                        fullWidth
                        label={t('register.inputs.full-name.label')}
                        inputProps={{
                            name: 'full_name',
                            placeholder: t('register.inputs.full-name.placeholder'),
                        }}
                        control={control}
                    />
                    <AppSelect
                        className="mt-4"
                        name="nationality"
                        fullWidth
                        label={t('register.inputs.nationality.label')}
                        options={countries ?? []}
                        control={control}
                        labelStrong
                        placeholder={t('descriptions.none')}
                    />

                    <AppInput
                        className="mt-4"
                        labelStrong
                        fullWidth
                        label={t('register.inputs.birthday.label')}
                        inputProps={{
                            name: 'birthday',
                            placeholder: t('register.inputs.birthday.placeholder'),
                            type: 'date'
                        }}
                        control={control}
                    />

                    <AppSelect
                        className="mt-4"
                        name="gender"
                        fullWidth
                        label={t('register.inputs.gender.label')}
                        options={genders}
                        control={control}
                        labelStrong
                        placeholder={t('descriptions.none')}
                    />

                    <AppPhoneNumberInput
                        name="phone"
                        control={control}
                        labelStrong
                        label={t('register.inputs.phone.label')}
                        className="mt-4 dark:text-black"
                        fullWidth
                    />

                    <AppInput
                        className="my-4"
                        labelStrong
                        fullWidth
                        label={t('register.inputs.about-me.label')}
                        inputProps={{
                            name: 'about_me',
                            placeholder: t('register.inputs.about-me.placeholder'),
                            multiline: true,
                            minRows: 2,
                            maxRows: 3
                        }}
                        control={control}
                    />

                    <Button sx={{ textTransform: 'none' }} variant="contained" color="secondary" type="submit" disabled={config.isPending}>
                        {t('descriptions.save-changes')}
                    </Button>
                </form>
            </div>
        </>
    );
};

export default Profile;