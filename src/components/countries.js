import React from 'react';
import ReactDOM from 'react-dom';
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
            countryObject: null
        }

        // define user input from select menu
        this.userInput = {
            value: "all",
            canShow: false
        }

        // define user input for adding country from text input
        this.addCountry = {
            value: "",
            canPost: false
        }

        this.resetInput = {
            valueReset: this.handleTextChange
        }

        // assign variables to be binded to methods
        this.handleSelection = this.handleSelection.bind(this);
        this.handleChangeInput = this.handleChangeInput.bind(this);
        this.handleDelete = this.fetchDeleteCountry.bind(this);
        this.handlePost = this.fetchPostCountry.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);

        this.buttonclicked = false;
    }

    // check is the component mouted
    // calls the fetch all method
    componentDidMount() {
        this.fetchAllData();
    }

    // fetches all the data
    // changes the stated to loaded is true
    fetchAllData() {
        fetch("http://10.25.100.26/getcountries")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        countries: result
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    // checks if the sepecifc country fetch is loaded
    // if true then call the display and delete methods
    handleSelection() {
        console.log("button click");
        console.log(this.userInput.value);
        console.log(this.userInput.canShow);
        if (this.specificCountry.isLoadedSingle) {
            this.displayCountry();
            this.newDeleteOption();
        }
    }

    // on every event change, store the value and set canshow to true
    // if canshow is true then call the fetch single country method
    handleChangeInput(e) {
        this.userInput.value = e.target.value;
        this.userInput.canShow = true;
        if (this.userInput.canShow) {
            this.fetchCountrySpecific();
        }
    }

    // display the country return the a dom render
    // checks if specific country is loaded
    // if load is true then display the country data
    // else, output error message displaying that country does not exist
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
                    <div className="format-country"><p key={this.specificCountry.countryObject.name}>{JSON.stringify(this.specificCountry.countryObject)}</p><hr></hr>
                    </div>,
                    document.getElementById('showSingle')
                );
            }
        }
        else {
            ReactDOM.render(
                <div><p>Country does not exist: {this.specificCountry.countryObject.name}</p><hr></hr></div>,
                document.getElementById('showSingle')
            );
        }
    }

    // dom render an input field with the current country that has been searched for
    // on click will call the handle delete method
    newDeleteOption() {
        ReactDOM.render(
            <div>
                <Form>
                    <FormGroup>
                        <Label for="delete-name" className="h2">Delete Country</Label>
                        <Input type="select" name="countryDelete" id="countryDelete">
                            <option key={this.specificCountry.countryObject.name} value={this.specificCountry.countryObject.name} placeholder={this.specificCountry.countryObject.name}>{this.specificCountry.countryObject.name}</option>
                        </Input>
                    </FormGroup>
                    <Button color="danger" onClick={this.handleDelete}>Delete</Button>
                </Form>
                <hr></hr>
            </div>,
            document.getElementById('deleteSection')
        );
    }

    // dom render input text field, input on change will call handletextchange
    // on button click call the handlepost method that will run the fetch
    createPostInputs() {
        ReactDOM.render(
            <div>
                <Form>
                    <FormGroup>
                        <Label for="post-name" className="h2">Add Country</Label>
                        <Input type="text" onChange={this.handleTextChange} name="name" id="name"></Input>
                    </FormGroup>
                    <Button color="warning" id="submit" name="submit" onClick={this.handlePost}>Add Country</Button>
                </Form>
            </div>,
            document.getElementById('postCountry')
        );
    }

    // checks if the button is clicked
    // if clicked, will reset the value and text input
    // else not clicked
    // will save any text input from the event
    // if the input is not null then canpost will equal true
    // logs all the changes 
    handleTextChange(e) {
        // e.preventDefault();
        this.addCountry.value = e.target.value;
        if (this.buttonclicked) {
            e.preventDefault();
            e.target.value = "";
            this.addCountry.value = "";
        }
        else {
            this.addCountry.canPost = true;
        }
        this.buttonclicked = false;
        console.log(this.addCountry.value);
    }

    // fetch the post api
    // api accepts form-data, created formdata object with key value pair
    // output the response after the fetch
    fetchPostCountry() {
        this.buttonclicked = true;
        const formData = new FormData();
        formData.append('name', this.addCountry.value.toString());

        console.log(this.addCountry.value.toString());

        if (this.addCountry.canPost) {
            console.log("posting this country");
            console.log(this.addCountry.value);
            fetch('http://10.25.100.26/getcountries', {
                method: 'POST',
                body: formData
            })
                .then(response => response.text())
                .then(response => ReactDOM.render(
                    <div><p>Post Status: {this.addCountry.value} <br></br>{response}</p></div>,
                    document.getElementById('postMessage')
                ));
        }
    }

    // fetch the delete api
    // with the fetch attach the country name to the end
    // then get the response and dom render back to the screen
    // set the specifc country loaded to false
    // recall the display country method
    fetchDeleteCountry() {
        console.log("delete this country");
        console.log(this.specificCountry.countryObject.name);
        fetch('http://10.25.100.26/getcountries/' + this.specificCountry.countryObject.name, {
            method: 'DELETE',
        })
            .then(res => res.text()) // or res.json() or res.text()
            .then(res => ReactDOM.render(
                <div><p>Delete Status: {this.specificCountry.countryObject.name} <br></br>{res}</p><hr></hr></div>,
                document.getElementById('deleteMessage')
            ));
        this.specificCountry.isLoadedSingle = false;
        this.displayCountry();
    }

    // fetch specific country api
    // attach the name of country to the end of the api route
    // if success, set is loaded to true and store the result to the object
    fetchCountrySpecific() {

        this.name = this.userInput.value;
        console.log("fetching: " + this.name);
        if (this.userInput.canShow == true) {

            fetch("http://10.25.100.26/getcountries/" + this.name)
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

    // first check is there is any errors, if not checks if its loaded, else display input and button
    // render the countries into a dropdown select input 
    // on change of the select input will call handlechangeinput method
    // map through each country in the countries array, return a option element with the country name
    // create a button with on click method will call handle selection method
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
                            <Label for="select-name" className="h2">Select Country</Label>
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
                        <Button color="success" onClick={this.handleSelection}>Find Country</Button>
                    </Form>
                    <hr></hr>
                </div>
            );
        }
    }
}

export default Countries;