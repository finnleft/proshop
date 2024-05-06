import { createSlice } from "@reduxjs/toolkit";
import { updateSave } from "../utils/saveUtils";

const initialState = localStorage.getItem("save") ? JSON.parse(localStorage.getItem("save")) : { saveItems: []};

const saveSlice = createSlice({
    name: "save",
    initialState,
    reducers: {
        addToSave: (state, action) => {
            const item = action.payload;

            const existItem = state.saveItems.find((x) => x._id === item._id);

            if (existItem) {
                state.saveItems = state.saveItems.map((x) => x._id === existItem._id ? item : x);
            } else {
                state.saveItems = [...state.saveItems, item];
            }

            return updateSave(state);
        },
        removeFromSave: (state, action) => {
            state.saveItems = state.saveItems.filter((x) => x._id !== action.payload);

            return updateSave(state);
        },
        clearSaveItems: (state, action) => {
            state.saveItems = [];
            return updateSave(state);
        },
        resetSave: () => initialState
    },
});

export const { addToSave, removeFromSave, clearSaveItems, resetSave } = saveSlice.actions;

export default saveSlice.reducer;