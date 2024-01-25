import { render, screen, fireEvent} from "@testing-library/react"
import { BrowserRouter as Router } from "react-router-dom";
import NavBar from "../NavBar";
import { MemoryRouter } from 'react-router-dom';
import { CurrentUserProvider } from "../../contexts/CurrentUserContext";



test('renders NavBar', () => {
   render(<Router>
    <NavBar />
   </Router>
   )
  const signInLink = screen.getByRole("link", { name: "Sign in" });
  expect(signInLink).toBeInTheDocument();
  const signUpLink = screen.getByRole("link", { name: "Sign up" });
  expect(signUpLink).toBeInTheDocument();
  const HomeLink = screen.getByRole("link", { name: "Home" });
  expect(HomeLink).toBeInTheDocument();
})

test('renders NavBar component', () => {
    render(
      <Router>
        <NavBar />
      </Router>
    );
    expect(screen.getByAltText('Brand logo')).toBeInTheDocument();
});




