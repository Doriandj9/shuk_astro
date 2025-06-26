import type { Dispatch, SetStateAction } from "react";
import { createContext } from "react";
import type { ParamsPostInfinityFn } from "../hooks/post/PostI";

type KeysPostContextType = {
    keys: unknown[];
    setKeys: Dispatch<SetStateAction<ParamsPostInfinityFn[]>>;
};

export const KeysPostContext =  createContext<KeysPostContextType>({keys: [], setKeys: () => {}});