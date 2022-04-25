import AddNote from './AddNote';
import Notes from './Notes';

const Home = () => {


  return (
    <div>
      {/* FORUM TO CREATE A NEW NOTE */}
      <AddNote/>
      
      {/* USER NOTES */}
      <Notes/>
    </div>
  )
}

export default Home
