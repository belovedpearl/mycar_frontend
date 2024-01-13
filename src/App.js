import styles from './App.module.css'
import NavBar from './components/NavBar';
import Container from 'react-bootstrap/Container'
import { Route, Switch } from 'react-router-dom/cjs/react-router-dom.min';
import './api/axiosDefaults'
import SignUpForm from './pages/auth/Register';

function App() {
  return (
    <div className={styles.App}>
      <NavBar />
      <Container className={styles.AppHead}>
        <Switch>
          <Route exact path="/" render = {() => <h1>Homepage</h1>} /> 
          <Route exact path="/signin" render = {() => <h1>SignIn</h1>} />
          <Route exact path="/signup" render = {() => <SignUpForm /> } />
          <Route render = {() => <h1>Page not found</h1>} /> 
        </Switch>
        
      </Container>
    </div>
  );
}

export default App;