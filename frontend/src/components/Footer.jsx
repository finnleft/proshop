import { Container, Row, Col } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer>
        <Container>
            <Row>
                <Col className="text-center py-3">
                    <p>ProShop &copy; {currentYear}</p>
                </Col>
            </Row>
            <Row>
                <Col className="text-center py-3">
                  <Link to={"/contact"}>Contact Us</Link>
                </Col>
            </Row>
        </Container>
    </footer>
  )
}

export default Footer