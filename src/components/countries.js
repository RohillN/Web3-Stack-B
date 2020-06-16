import React from 'react';
import ReactDOM from 'react-dom';
import { Form, FormGroup, Label, Button, Input } from 'reactstrap';
import SingleCountry from '../components/singlecountry';

class Countries extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            countries: []
        };

        this.specificCountry = {
            errorSingle: null,
            isLoadedSingle: false,
            countryObject: null
        }

        this.userInput = {
            value: "all",
            canShow: false
        }

        this.addCountry = {
            value: "",
            canPost: false
        }

        this.handleSelection = this.handleSelection.bind(this);
        this.handleChangeInput = this.handleChangeInput.bind(this);
        this.handleDelete = this.fetchDeleteCountry.bind(this);
        this.handlePost = this.fetchPostCountry.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);

        this.buttonclicked = false;
    }

    componentDidMount() {
        this.fetchAllData();
    }

    fetchAllData() {
        fetch("http://127.0.0.1:5000/getcountries")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        countries: result
                    });
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    handleSelection() {
        console.log("button click");
        console.log(this.userInput.value);
        console.log(this.userInput.canShow);
        if (this.specificCountry.isLoadedSingle) {
            this.displayCountry();
            this.newDeleteOption();
        }
    }

    handleChangeInput(e) {
        this.userInput.value = e.target.value;
        this.userInput.canShow = true;
        if (this.userInput.canShow) {
            this.fetchCountrySpecific();
        }
    }

    displayCountry() {
        if (this.specificCountry.isLoadedSingle) {
            if (this.specificCountry.countryObject == null) {
                ReactDOM.render(
                    <div><p>Loading..</p></div>,
                    document.getElementById('showSingle')
                );
            }
            else {
                ReactDOM.render(
                    <div><p key={this.specificCountry.countryObject.name}>{JSON.stringify(this.specificCountry.countryObject)}</p><hr></hr>
                    </div>,
                    document.getElementById('showSingle')
                );
            }
        }
    }

    newDeleteOption() {
        ReactDOM.render(
            <div>
                <Form>
                    <FormGroup>
                        <Input type="select" name="countryDelete" id="countryDelete">
                            <option key={this.specificCountry.countryObject.name} value={this.specificCountry.countryObject.name} placeholder={this.specificCountry.countryObject.name}>{this.specificCountry.countryObject.name}</option>
                        </Input>
                    </FormGroup>
                    <Button color="danger" onClick={this.handleDelete}>Delete</Button>
                </Form>
            </div>,
            document.getElementById('deleteSection')
        );
    }

    createPostInputs() {
        ReactDOM.render(
            <div>
                <hr></hr>
                <Form>
                    <FormGroup>
                        <Input type="text" onChange={this.handleTextChange} name="name" id="name"></Input>
                    </FormGroup>
                    <Button color="warning" id="submit" name="submit" onClick={this.handlePost}>Add Country</Button>
                </Form>
            </div>,
            document.getElementById('postCountry')
        );
    }

    handleTextChange(e) {
        // e.preventDefault();
        this.addCountry.value = e.target.value;
        if (this.addCountry.value != null) {
            this.addCountry.canPost = true;
        }
        console.log(this.addCountry.value);
    }

    fetchPostCountry() {
        const formData = new FormData();
        formData.append('name', this.addCountry.value.toString());

        console.log(this.addCountry.value.toString());

        if (this.addCountry.canPost) {
            console.log("posting this country");
            console.log(this.addCountry.value);
            fetch('http://127.0.0.1:5000/getcountries', {
                method: 'POST',
                body: formData
            })
        }
    }

    fetchDeleteCountry() {
        console.log("delete this country");
        console.log(this.specificCountry.countryObject.name);
        fetch('http://127.0.0.1:5000/getcountries/' + this.specificCountry.countryObject.name, {
            method: 'DELETE',
        })
            .then(res => res.text()) // or res.json() or res.text()
            .then(res => ReactDOM.render(
                <div><p>Delete Status: {this.specificCountry.countryObject.name} <br></br>{res}</p></div>,
                document.getElementById('deleteMessage')
            ));
    }

    fetchCountrySpecific() {

        this.name = this.userInput.value;
        console.log("fetching: " + this.name);
        if (this.userInput.canShow == true) {

            fetch("http://127.0.0.1:5000/getcountries/" + this.name)
                .then(res => res.json())
                .then(
                    (result) => {
                        this.specificCountry.isLoadedSingle = true,
                            this.specificCountry.countryObject = result
                    },
                    (error) => {
                        this.specificCountry.isLoadedSingle = true,
                            this.specificCountry.errorSingle = error;
                    }
                )

        }
    }

    render() {
        const { error, isLoaded, countries } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        }
        else {
            return (
                <div>
                    {this.createPostInputs()}
                    <Form>
                        <FormGroup>
                            <Label for="select-name">Select Country</Label>
                            <Input type="select" onChange={this.handleChangeInput} ref="countryName" name="countryName" id="countryName">
                                <option value="all"></option>
                                {countries.map(country => {
                                    return (
                                        <option key={country.name} value={country.name}>
                                            {country.name}
                                        </option>
                                    )
                                })}
                            </Input>
                        </FormGroup>
                        <Button onClick={this.handleSelection}>Find Country</Button>
                    </Form>
                    <hr></hr>
                </div>
            );
        }
    }
}

export default Countries;