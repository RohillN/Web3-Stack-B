import { Button } from "reactstrap";

class About extends React.Component {
    constructor(props) {
        super(props);
        this.state = { liked: false };
    }

    callHideButton() {
        return (
            <div>
                <p>You liked this.</p>
                <Button color="danger" onClick={() => this.setState({ liked: false })}>
                    Hide
            </Button>
            </div>
        );
    }

    render() {
        if (this.state.liked) {
            return (
                <div className="container mt-5 mb-5">
                    <h1 className="text-center">Welcome to the Admin Panel</h1>
                    <h2>How to use?</h2>
                    <div>
                        <h4>Find Country</h4>
                        <ul>
                            <li>From the dropdown menu select a country name. Then click the 'Find Country' button.</li>
                            <li>After Click, you will see the displayed name and data associated with the country you have selected.</li>
                            <li>Repeat process to find another country.</li>
                        </ul>
                    </div>
                    <div>
                        <h4>Delete Country</h4>
                        <ul>
                            <li>After finding a country, you will be prompted to delete the country or not.</li>
                            <li>If 'Delete' button is clicked, then you will see the deleted country data that has been removed.</li>
                        </ul>
                    </div>
                    <div>
                        <h4>Add Country</h4>
                        <ul>
                            <li>At the bottom you will see a input field on adding a country.</li>
                            <li>Simply type in the country name you want to add.</li>
                            <li>If 'Add Country' button is clicked. You will see the new country object that had been saved.</li>
                        </ul>
                    </div>
                    <br></br>
                    <h4 className="text-center">Created by Rohill Nand</h4>
                    <br></br>
                    <Button className="text-center" color="info" onClick={() => this.setState({ liked: false })}>
                        Hide
            </Button>
                    <br></br>
                    <hr></hr>
                </div>
            );
        }

        if (this.state.liked == false) {
            return (
                <div className="container mt-5 mb-5 text-center">
                    <h1 className="text-center">Welcome to the Admin Panel</h1>
                    <Button color="info" size="lg" onClick={() => this.setState({ liked: true })}>
                        View
                </Button>
                    <br></br>
                    <hr></hr>
                </div>
            );
        }
    }
}

export default About;