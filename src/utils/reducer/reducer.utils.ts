import { AnyAction } from "redux";

export type ActionwithPayload<T,P>={
    type:T;
    payload: P;
}

export type Action<T>={
    type:T;
}

export function createAction<T extends string, P>(type: T, payload:P): ActionwithPayload<T,P>;

export function createAction<T extends string>(type: T, payload: void): Action<T>;

export function createAction<T extends string, P>(type: T, payload: P){
    return {type, payload}
}

// export const createAction =(type, payload) => ({ type, payload });