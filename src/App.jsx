import ContactList from './Components/ContactList/ContactList'
import Form from './Components/Form/Form'
import Header from './Components/Header/Header'
import Searchbar from './Components/Searchbar/searchbar'

function App() {

  return (
    <>
      <div className="app">
        <Header/>
        <Searchbar/>
        <Form/>
        <ContactList/>
      </div>
    </>
  )
}

export default App
