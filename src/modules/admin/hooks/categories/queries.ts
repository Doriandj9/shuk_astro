import { api } from "@/config/app";
import type { CreateCategoryFn, GetCategoriesFn, GetCategoryFn, UpdateCategoryFn } from "./categories";
import { routesApi } from "@/config/apiRoutes";


export const getCategories: GetCategoriesFn = async (params) => {
    const response = await api.get(routesApi.admin.resource_categories.path,{
        params
    });

    return response.data ;
};

export const getCategory: GetCategoryFn = async (id) => {
    const response = await api.get(`${routesApi.admin.resource_categories.path}/${String(id)}`);

    return response.data?.data || null;
};


export const createCategory: CreateCategoryFn = async (data) => {

    const response = await api.post(routesApi.admin.resource_categories.path, data, {
        headers: {
            'Content-Type': 'multipart/form-data',
            'X-lang': localStorage.getItem('languageApp') ?? 'es'
        }
    });

    return response.data?.data || null;
};


export const updateCategory: UpdateCategoryFn = async (data,id) => {

    const response = await api.post(`${routesApi.admin.resource_categories.path}/${id}`, data,{
        headers: {
            'Content-Type': 'multipart/form-data',
            'X-lang': localStorage.getItem('languageApp') ?? 'es'
        }
    });

    return response.data?.data || null;
};