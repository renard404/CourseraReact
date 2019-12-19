import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem,
    Modal, ModalHeader, ModalBody, Button, Row, Col, Label } from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Link } from "react-router-dom";

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

class DishDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false
        }
        this.toggleModal = this.toggleModal.bind(this);
        this.handleComment = this.handleComment.bind(this);
    }
    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }
    handleComment(values) {
        this.toggleModal();
        alert(JSON.stringify(values));
    }
    renderDish(dish) {
        return (
            <Card>
                <CardImg width="100%" src={dish.image} alt={dish.name} />
                <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
        );
    }
    renderComments(comments) {
        var months = ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sept",
            "Oct", "Nov", "Dec"];
        if (comments) {
            return (
                comments.map((comment) => {
                    const date = new Date(comment.date);
                    return (
                        <li>
                            {comment.comment}
                            <br></br>
                            -- {comment.author}, {months[date.getMonth()]} {date.getDay()}, {date.getFullYear()}
                        </li>
                    )
                })
            )
        }
        else {
            return (
                <div></div>
            )
        }
    }
    CommentForm() {
        return (
            <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                <ModalBody>
                    <LocalForm onSubmit={(values) => this.handleComment(values)}>
                        <Row className="form-group">
                            <Label md={{ offset: 1 }} htmlFor="rating">Rating</Label>
                        </Row>
                        <Row className="form-group">
                            <Col>
                                <Control.text model=".rating" id="rating" name="rating"
                                    placeholder="Rating"
                                    className="form-control"
                                    validators={{ required }}
                                />
                                <Errors className="text-danger" model=".rating" show="touched"
                                    messages={{
                                        required: "Required"
                                    }}
                                />
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Label md={{ offset: 1 }} htmlFor="message">Your Name</Label>
                        </Row>
                        <Row className="form-group">
                            <Col>
                                <Control.text model=".name" id="name" name="name"
                                    placeholder="Your Name"
                                    className="form-control"
                                    validators={{ required, minLength: minLength(3), maxLength: maxLength(15) }}
                                />
                                <Errors className="text-danger" model=".name" show="touched"
                                    messages={{
                                        required: 'Required', minLength: 'Must be greater than 2 characters',
                                        maxLength: 'Must be 15 characters or less'
                                    }}
                                />
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Label md={{ offset: 1 }} htmlFor="message">Comment</Label>
                        </Row>
                        <Row className="form-group">
                            <Col>
                                <Control.textarea model=".message" id="message" name="message"
                                    rows="4"
                                    className="form-control" />
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Col md={{ size: 10, offset: 2 }}>
                                <Button type="submit" color="primary">Submit</Button>
                            </Col>
                        </Row>
                    </LocalForm>
                </ModalBody>
            </Modal>
        )
    }
    render() {
        const dish = this.props.dish;
        const comments = this.props.comments;
        if (dish != null) {
            return (
                <div className="container">
                    <div className="row">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                            <BreadcrumbItem active>{this.props.dish.name}</BreadcrumbItem>
                        </Breadcrumb>
                        <div className="col-12">
                            <h3>{this.props.dish.name}</h3>
                            <hr />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-12 col-md-5 m-1">
                            {this.renderDish(dish)}
                        </div>
                        <div className="col-12 col-md-5 m-1">
                            <h4>Comments</h4>
                            <ul className="list-unstyled">
                                {this.renderComments(comments)}
                            </ul>
                            <Button outline onClick={this.toggleModal}><span className="fa fa-edit fa-lg"></span> Submit Comment</Button>
                            {this.CommentForm()}
                        </div>
                    </div>
                </div>
            );
        }
        else {
            return (
                <div></div >
            );
        }
    }
}

export default DishDetail;