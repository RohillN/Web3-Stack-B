class AppNavbar extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                Hello nav bar
            </div>
        );
    }
}

let domContainer = document.querySelector('#nav');
ReactDOM.render(<AppNavbar />, domContainer);