 // eslint-disable-next-line
import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { FaSearchengin } from "react-icons/fa";
import { AiOutlineArrowLeft } from "react-icons/ai";
import "../PaymentsPage.scss";
const Header = (props:any) => {
  return <div className="Header">
<Navbar bg="light" expand="lg">
      <Navbar.Brand href="https://thundafund.com">
        <img src="https://thundafund.com/static/img/thundafundlogo.png" alt="Logo"/>  </Navbar.Brand>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="mr-auto">
      <Nav.Link className="Header_spunderline sp_top" href="https://thundafund.com/discover">Discover</Nav.Link>
          <Nav.Link className="sp_top" href="https://thundafund.com/signup">Start a Project</Nav.Link>
    {/*      <Nav.Link href="#/">*/}
    {/*      */}
    {/*      <form role="search" method="get" className="search-form form" action="">*/}
    {/*    <label>*/}
    {/*        <span className="screen-reader-text">Search for...</span>*/}
    {/*        <input type="search" className="search-field" placeholder="Type something..." value="" name="s" title="" />*/}
    {/*    </label>*/}
    {/*          /!* <input  type="submit" className="search-submit button fa" value={"&#xf002"} /> *!/*/}
    {/*          <button className="search-submit button">  <FaSearchengin/>  </button>*/}
    {/*</form>*/}
    {/*      </Nav.Link>*/}
    </Nav>
        <Nav>
        <Nav.Link href="#/">Already Have a Project  &#63;</Nav.Link>
        <Nav.Link className="Header_signin" href="https://thundafund.com/signin">Sign In</Nav.Link>
       </Nav>

  </Navbar.Collapse>
    </Navbar>
    <div className="crumblinks">
        <Navbar className="shadow" expand="lg" variant="light" bg="light">
        <Container>
        <Navbar.Brand href={"https://thundafund.com/project/"+props.projectid}> <AiOutlineArrowLeft/>  Back to Project </Navbar.Brand>
        </Container>
      </Navbar>

    </div>
    

  </div>
}

export default Header;