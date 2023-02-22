import React from 'react';
import { Toast } from 'react-bootstrap';
import {
  ErrorBoundaryContext,
  ErrorContextType,
} from '../context/ErrorBoundaryContext';

interface Props {
  children: React.ReactNode;
}
interface State {
  hasError: boolean;
  error: TypeError;
}

export default class ErrorBoundary extends React.Component<Props, State> {
  state = {
    hasError: false,
    error: {} as TypeError,
  };
  static getDerivedStateFromError(error: any) {
    return { hasError: true, error };
  }
  override componentDidCatch(error: any, errorInfo: any) {
    console.log({ error, errorInfo });
  }
  triggerError: ErrorContextType['triggerError'] = (error) => {
    this.setState({ hasError: true, error });
  };
  resetError = () => this.setState({ hasError: false });
  render() {
    return (
      <ErrorBoundaryContext.Provider
        value={{ triggerError: this.triggerError }}
      >
        {this.state.hasError && (
          <div
            style={{ position: 'absolute', zIndex: 1, right: 0, top: '60px' }}
          >
            <Toast
              onClose={this.resetError}
              show={this.state.hasError}
              delay={3000}
              autohide
              bg="danger"
            >
              <Toast.Header>
                <img
                  src="holder.js/20x20?text=%20"
                  className="rounded me-2"
                  alt=""
                />
                <strong className="me-auto">Wordstorm</strong>
              </Toast.Header>
              <Toast.Body>{this.state.error.message}</Toast.Body>
            </Toast>
          </div>
        )}
        {this.props.children}
      </ErrorBoundaryContext.Provider>
    );
  }
}
