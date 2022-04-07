import { Navbar, Nav } from 'react-bootstrap'

function Header() {

  return (
    <Navbar
      collapseOnSelect
      expand="md"
      bg="dark"
      variant="dark"
      sticky="top"
      className="px-4"
    >
      <Navbar.Brand href="/">Bart Stonks</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/chart">Chart</Nav.Link>
          <Nav.Link href="/portfolio">Portfolio</Nav.Link>
        </Nav>
        <Nav>
          <Nav.Link href="/login">Login</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default Header
