import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import App from '../App';


class ErrorBoundary extends Component {
    state = { hasError: false };


    componentDidCatch(error, info) {
        // Display fallback UI
        this.setState({ hasError: true });
        // You can also log the error to an error reporting service
    }

    render() {
        if (this.state.hasError) {
            // You can render any custom fallback UI
            ReactDOM.render(<App />, document.getElementById('root'));
        }
        return this.props.children;
    }
}

export default ErrorBoundary;