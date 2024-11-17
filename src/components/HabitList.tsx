import { useDispatch, useSelector } from "react-redux"
import { RootState, AppDispatch } from '../store/store';
import { Box, Button, Grid, LinearProgress, Paper, Typography} from "@mui/material";
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import DeleteIcon from '@mui/icons-material/Delete'
import { Habit, removeHabit, toggleHabit } from "../store/habit-slice";


const HabitList = () => {
    const habits = useSelector((state: RootState) => state.habits.habits)
    const today = new Date().toISOString().split('T')[0]
    const dispatch = useDispatch<AppDispatch>()

    const getStreak = (habit: Habit) => {
        let streak = 0;
        const currentDate = new Date();

        while(true) {
            const dateString = currentDate.toISOString().split("T")[0];
            //  @ts-ignore
            if(habit.completedDates.includes(dateString)) {
                streak++;
                currentDate.setDate(currentDate.getDate() -1);
            }else {
                break;
            }
            
        }
        return streak;

    }

  return (
   <Box sx={{display:'flex', flexDirection: 'column', mt:4, gap: 2 }} >
    {
        habits.map((habit, habitsIndex) => {
           return <Paper key={habitsIndex} elevation={2} sx={{p:2}}>
            {/* @ts-ignore */}
                <Grid Container alignItems='center'>
                    <Grid xs={12} sm={6}>
                   <Typography variant="h6">
                   {habit.name}
                   </Typography>
                   <Typography variant="body2" color="text.secondary" sx={{textTransform: "capitalize"}}>
                   {habit.frequency}
                   </Typography>
                    </Grid>
                    <Grid xs={12} sm={6}>
                        <Box sx={{display:'flex', justifyContent:"flex-end", gap:1}}>
                         {/* @ts-ignore */}
                            <Button variant="outlined" color={habit.completedDates.includes(today) ? 'success' : 'primary' } startIcon={<CheckCircleIcon/>}  onClick={() => dispatch(toggleHabit({id: habit.id, date:today}))}>
                               {
                                // @ts-ignore
                                habit.completedDates.includes(today) ? 'Completed' : 'Mark Complete'
    }
                            </Button>
                            <Button variant='outlined' startIcon={<DeleteIcon/>} onClick={() => dispatch(removeHabit({id: habit.id}), console.log('removed'))}>
                                Remove
                            </Button>

                        </Box>

                    </Grid>

                </Grid>
                <Box sx={{mt: 2}}>
                    <Typography variant="body2">
                        Current Streak: {getStreak(habit)} Days
                    </Typography>
                    <LinearProgress sx={{mt:1}} value={(getStreak(habit)/3)*100} variant="determinate"/>
                </Box>
            </Paper>
        })
    }

   </Box>
  )
}

export default HabitList
