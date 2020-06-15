import React from 'react';
import { Form, FormGroup, Label, Button, Input } from 'reactstrap';

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
        if (this.userInput.canShow) {
            this.fetchCountrySpecific();
        }
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

    handleChangeInput(e) {
        this.userInput.value = e.target.value;
        this.userInput.canShow = true;
    }

    render() {
        const { error, isLoaded, countries } = this.state;
        const { errorSingle, isLoadedSingle, countryObject } = this.specificCountry;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        }
        else if (errorSingle) {
            return <div>Error: {errorSingle.message}</div>;
        }
        else if (isLoadedSingle) {
            return (
                <div>
                    <h1>Hello Single Country Object -- Need to format output</h1>
                </div>
            );
        }
        else {
            return (
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
            );
        }
    }
}

export default Countries;