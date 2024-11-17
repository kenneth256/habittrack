import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Habit {
    id: string,
    name: string,
    frequency: 'Daily' | 'Weekly',
    createdAt: string,
    completedDates: string[]  // Changed from [] to string[] to fix type issues
}

interface Habits {
    habits: Habit[],
    isLoading: boolean,
    error: string | null
}

// fetch from localStorage
const fetchHabitsStored = (): Habit[] => {
    try {
        const storedHabits = localStorage.getItem('habits');
        return storedHabits ? JSON.parse(storedHabits) : [];
    } catch (error) {
        console.error('Failed to load habits from localStorage:', error);
        return [];
    }
}

const initialState: Habits = {
    habits: fetchHabitsStored(),
    isLoading: false,
    error: null
}

// saving to localStorage
const saveToLocalStorage = (habits: Habit[]) => {
    try {
        localStorage.setItem('habits', JSON.stringify(habits));
    } catch (error) {
        console.error("Error saving habits:", error);
    }
}

export const fetchHabits = createAsyncThunk(
    "habits/fetchHabits",
    async () => {
        const storedHabits = fetchHabitsStored();

        if (storedHabits.length > 0) {
            return storedHabits;
        }
        
        // simulating an API call
        await new Promise((resolve) => setTimeout(resolve, 5000));
        
        const mockHabits: Habit[] = [
            {
                id: "1",
                name: 'Read',
                frequency: "Daily",
                completedDates: [],
                createdAt: new Date().toISOString(),
            },
            {
                id: '2',
                name: 'Exercise',
                frequency: "Daily",
                completedDates: [],
                createdAt: new Date().toISOString()
            }
        ];
        return mockHabits;
    }
);

const habitsSlice = createSlice({
    name: 'habits',
    initialState,
    reducers: {
        addHabit: (state, action: PayloadAction<{name: string, frequency: 'Daily' | 'Weekly'}>) => {
            const newHabit: Habit = {
                id: Date.now().toString(),
                name: action.payload.name,
                frequency: action.payload.frequency,
                createdAt: new Date().toISOString(),
                completedDates: []
            };
            state.habits.push(newHabit);
            saveToLocalStorage(state.habits);
        },
        toggleHabit: (state, action: PayloadAction<{id: string, date: string}>) => {
            const habit = state.habits.find((h) => h.id === action.payload.id);
            if (habit) {
                const habitIndex = habit.completedDates.indexOf(action.payload.date);
                if (habitIndex > -1) {
                    habit.completedDates.splice(habitIndex, 1);
                } else {
                    habit.completedDates.push(action.payload.date);
                }
                saveToLocalStorage(state.habits);
            }
        },
        removeHabit: (state, action: PayloadAction<{id: string}>) => {
            const removeIndex = state.habits.findIndex((h) => h.id === action.payload.id);
            if (removeIndex > -1) {
                state.habits.splice(removeIndex, 1);
                saveToLocalStorage(state.habits);
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchHabits.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchHabits.fulfilled, (state, action) => {
                state.isLoading = false;
                state.habits = action.payload;
                saveToLocalStorage(action.payload);
            })
            .addCase(fetchHabits.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || "Failed to fetch Habits";
            });
    }
});

export const { addHabit, toggleHabit, removeHabit } = habitsSlice.actions;
export default habitsSlice.reducer;