'use strict';

import { Button } from "reactstrap";

class LikeButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = { liked: false };
    }

    render() {
        if (this.state.liked) {
            return 'You liked this.';
        }

        return (
            <Button color="danger" onClick={() => this.setState({ liked: true })}>
                Like
            </Button>
        );
    }
}

export default LikeButton;