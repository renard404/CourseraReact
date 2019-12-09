import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from "react-router-dom";

class DishDetail extends Component {
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