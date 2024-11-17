import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../store/store"
import { useEffect } from "react";
import { fetchHabits } from "../store/habit-slice";
import { LinearProgress, Paper, Typography } from "@mui/material";

const HabitStats = () => {
  
    const {habits, isLoading, error} = useSelector((state: RootState) => state.habits );
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
         dispatch(fetchHabits())
    }, [])

    const getCompletedToday =() => {
        const today = new Date().toISOString().split("T")[0];
        // @ts-ignore
        return habits.filter((habit) => habit.completedDates.includes(today)).length
    }
    // @ts-ignore
    const getStreak = (habit: Habit) => {
        let streak = 0;
        const currentDate = new Date();

        while(true) {
            const dateString = currentDate.toISOString().split("T")[0];
            if(habit.completedDates.includes(dateString)) {
                streak++;
                currentDate.setDate(currentDate.getDate() -1);
            }else {
                break;
            }
            
        }
        return streak;

    }
    const getLongestStreak = () => {
        return Math.max(...habits.map(getStreak), 0)
    }

    if(isLoading) {
        return <LinearProgress />
    }
    if(error) {
        return <Typography color='error'>{error}</Typography>
    }
  return (
   <Paper elevation={2} sx={{p: 2, mt: 4}}>
    <Typography variant="h6" gutterBottom>
        Habit Statistics
    </Typography>
    <Typography variant="body1">
        Total habits: {habits.length}
    </Typography>
    <Typography variant="body1">
       Habits completed Today: {getCompletedToday()}
    </Typography>
    <Typography variant="body1">
       Longest Streak: {getLongestStreak()}
    </Typography>

   </Paper>
  )
}

export default HabitStats
