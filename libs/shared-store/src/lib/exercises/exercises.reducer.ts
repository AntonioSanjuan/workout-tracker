import { createReducer, on } from "@ngrx/store"
import { exerciseInitialState } from "./models/exerciseState.initialState";

export const EXERCISES_FEATURE_KEY = 'exercises'; 

export const exercisesReducer = createReducer(
    exerciseInitialState,

)