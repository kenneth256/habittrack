import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { addHabit } from "../store/habit-slice"
import { AppDispatch } from "../store/store"


const AddHabitForm = () => {
    const [name, setName] = useState<string>('')
    const [frequency, setFrequency] = useState<'Daily' | 'Weekly'>('Daily')
    const dispatch = useDispatch<AppDispatch>()
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if(name.trim()) {
            dispatch(addHabit({name,
                 frequency}))
        }
        setName('')
    }
  return (
    <form onSubmit={handleSubmit}>
        <Box sx={{
            display: 'flex', 
            flexDirection: 'column',
            gap: 2
            }}>
                <TextField placeholder="Enter name"  type="text" fullWidth label='Habit name'  value={name} onChange={(e) => setName(e.target.value)} />
                    <FormControl fullWidth>
                        <InputLabel>Frequency</InputLabel>
                        <Select value={frequency} onChange={(e) => setFrequency(e.target.value as 'Daily' | 'Weekly')}>
                            <MenuItem value='Daily' >
                            Daily
                            </MenuItem>
                            <MenuItem value='Weekly' >
                            Weekly
                            </MenuItem>
                        </Select>
                    </FormControl>
                    <Button variant='contained' type='submit' color="primary">Add Habit</Button>
        </Box>
    </form>
  )
}

export default AddHabitForm
