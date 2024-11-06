import { createSlice } from '@reduxjs/toolkit';

export const StatusFilters = {
  All: 'all',
  Active: 'active',
  Completed: 'completed',
};

const initialState = {
  status: StatusFilters.All,
  colors: [],
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    statusFilterChanged(state, action) {
      const status = action.payload;
      state.status = status;
    },
    colorFilterChanged: {
      reducer(state, action) {
        const { color, changeType } = action.payload;

        switch (changeType) {
          case 'added': {
            if (!state.colors.includes(color)) {
              state.colors.push(color);
            }
            break;
          }
          case 'removed': {
            state.colors = state.colors.filter(
              (existingColor) => existingColor !== color
            );
            return;
          }
          default:
            return;
        }
      },
      prepare(color, changeType) {
        return {
          payload: { color, changeType },
        };
      },
    },
  },
});

export const { statusFilterChanged, colorFilterChanged } = filtersSlice.actions;

export default filtersSlice.reducer;
