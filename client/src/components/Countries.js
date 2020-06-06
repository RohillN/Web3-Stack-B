import React from 'react';
import { Form, FormGroup, Input, Label, Button } from 'reactstrap';

const Countries = ({ countries }) => {
    return (
        <Form>
            <FormGroup>
                <Label for="exampleSelect">Select Country</Label>
                <Input type="select" name="country-name" id="country-name">
                    <option value="all"></option>
                    {countries.map(country => {
                        return (
                            <option value={country.name}>
                                {country.name}
                            </option>
                        )
                    })}
                </Input>
            </FormGroup>
            <Button>Submit</Button>
        </Form>
    )
}

export default Countries;