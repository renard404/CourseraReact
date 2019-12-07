import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';
import { COMMENTS } from "../shared/comments";

class DishDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            comments: COMMENTS
        }
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
                    return(
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
        const dish = this.props.selectedDish;
        if (dish != null) {
            const comments = this.state.comments.filter((comment) => dish.id === comment.dishId);
            return (
                <div className="container">
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