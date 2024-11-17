import {Container, Typography} from '@mui/material'
import AddHabitForm from './components/Add-Habit-Form'
import HabitList from './components/HabitList'
import HabitStats from './components/habit-stat'

const App = () => {
  return (
    <div>
    <Container max-width='md'>
      <Typography component={'h1'}>
        Habit Tracker
      </Typography>
      <AddHabitForm/>
      <HabitList />
      <HabitStats />
    </Container>
    </div>
  )
}

export default App

   