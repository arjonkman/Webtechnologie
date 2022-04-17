import { Navbar, Nav } from 'react-bootstrap'
import { useCookies } from "react-cookie";

function Header() {
  const [cookies, setCookie, removeCookie] = useCookies(['session_id']);


  return (
    <Navbar
      collapseOnSelect
      expand="md"
      bg="dark"
      variant="dark"
      sticky="top"
      className="px-4"
    >
      <Navbar.Brand href="/">BartStonks</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/chart">Chart</Nav.Link>
          <Nav.Link href="/portfolio">Portfolio</Nav.Link>
        </Nav>
        { cookies.session_id == undefined ?
        <Nav>
          <Nav.Link href="/login">Login</Nav.Link>
        </Nav>
        :
        <Nav>
          <Nav.Link onClick={() => {
              fetch(`http://localhost:5000/api/v1/account?function=LOGOUT&session_id=${cookies.session_id}`);
              removeCookie('session_id', {path:'/'});
            }
          }>Logout</Nav.Link>
        </Nav> 
        }
      </Navbar.Collapse>
    </Navbar>
  )
}

export default Header
