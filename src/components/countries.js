import React from 'react';

class Countries extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            countries: []
        };
    }

    componentDidMount() {
        fetch("http://127.0.0.1:5000/getcountries")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        countries: result.name
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

    render() {
        const { error, isLoaded, countries } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <ul>
                    {countries.map(country => (
                        <li key={country.name}>
                            {country.name}
                        </li>
                    ))}
                </ul>
            );
        }
    }
}

export default Countries;