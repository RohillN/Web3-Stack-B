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
            countryObject: []
        }


        this.userInput = {
            value: "all",
            canShow: false
        }

        this.handleSelection = this.handleSelection.bind(this);
        this.handleChangeInput = this.handleChangeInput.bind(this);
        this.handleDelete = this.handleDeleteInput.bind(this);
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
                    <div><p key={this.specificCountry.countryObject.name}>{JSON.stringify(this.specificCountry.countryObject)}</p>
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
                </Form></div>,
            document.getElementById('deleteSection')
        );
    }

    handleDeleteInput() {
        console.log("delete this country");
        console.log(this.specificCountry.countryObject.name);
        fetch('http://127.0.0.1:5000/getcountries/' + this.specificCountry.countryObject.name, {
            method: 'DELETE',
        })
            .then(res => res.text()) // or res.json() or res.text()
            .then(res => ReactDOM.render(
                <div>Delete Status: {this.specificCountry.countryObject.name} <br></br>{res}</div>,
                document.getElementById('deleteMessage')
            ))
            .then(
                this.fetchAllData(),
                this.handleSelection()
            );
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
                        <Button onClick={this.handleSelection}>Submit</Button>
                    </Form>
                    <hr></hr>
                </div>
            );
        }
    }
}

export default Countries;