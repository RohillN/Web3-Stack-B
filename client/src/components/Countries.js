import React from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';

const Countries = ({ countries }) => {
    return (
        <ListGroup>
            {countries.map(country => {
                return (
                    <ListGroupItem>
                        {country.name}
                    </ListGroupItem>
                )
            })}
        </ListGroup>
    )
}

export default Countries;