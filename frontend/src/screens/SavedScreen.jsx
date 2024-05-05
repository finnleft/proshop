import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, ListGroup, Image, Form, Button, Card } from "react-bootstrap";
import { FaTrash } from "react-icons/fa";
import Message from "../components/Message";
import { addToCart } from "../slices/cartSlice";
import { removeFromSave } from "../slices/saveSlice";

const SavedScreen = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const save = useSelector((state) => state.save);
    const { saveItems } = save;

    const moveToCartHandler = async (id, item, qty) => {
        dispatch(addToCart({...item, qty }))
        dispatch(removeFromSave(id));
        navigate("/cart");
    }

    const removeFromSaveHandler = async (id) => {
        dispatch(removeFromSave(id));
    }

    return <Row>
        <Col md={8}>
            <h1 style={{marginBottom: "20px"}}>Saved Items</h1>
            { saveItems.length === 0 ? (
                <Message>
                    You have not saved any items <Link to="/">Go Back</Link>
                </Message>
            ) : (
                <ListGroup variant="flush">
                    { saveItems.map((item) => (
                        <ListGroup.Item key={ item._id }>
                            <Row>
                                <Col md={2}>
                                    <Image src={ item.image } alt={ item.name} fluid rounded />
                                </Col>
                                <Col md={3}>
                                    <Link to={ `/product/${item._id}` }>{ item.name }</Link>
                                </Col>
                                <Col md={2}>
                                    ${ item.price }
                                </Col>
                                <Col md={2}>
                                    <Button type="button" variant="light" onClick={ () => moveToCartHandler(item._id, item, item.qty)}>
                                        Move Item to Cart
                                    </Button>
                                </Col>
                                <Col md={2}>
                                    <Button type="button" variant="light" onClick={ () => removeFromSaveHandler(item._id)}>
                                        <FaTrash />
                                    </Button>
                                </Col>
                            </Row>
                        </ListGroup.Item>
                    )) }
                </ListGroup>
            )}
        </Col>
    </Row>
}

export default SavedScreen