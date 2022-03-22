import React from 'react';
import { Formik } from 'formik';
import './Auth.css';
import { connect } from 'react-redux';
import { auth } from '../../redux/authActionCreators';
import Loader from '../Loader';

const mapDispatchToProps = dispatch => {
    return {
        auth: (email, password, mode) => dispatch(auth(email, password, mode)),
    };
}

const mapStateToProps = state => {
    return {
        authLoading: state.authState.authLoading,
        authErrorMsg: state.authState.authErrorMsg,
    };
}

class Auth extends React.Component {
    state = {
        mode: "Login",
    }

    render() {
        let error = null;
        if (this.props.authErrorMsg) {
            error = <div style={{
                width: '300px',
                padding: '1rem',
                fontSize: '17px',
                color: 'red',
                background: 'yellow',
                borderRadius: '7px',
            }}>{this.props.authErrorMsg}</div>
        }
        let element = null;
        if (this.props.authLoading) {
            element = <Loader />;
        } else {
            element = (
                <Formik
                    initialValues={{
                        email: "",
                        password: "",
                        confirmPassword: "",
                    }}

                    onSubmit={
                        (values) => {
                            this.props.auth(values.email, values.password, this.state.mode);
                        }
                    }

                    validate={
                        (values) => {
                            const errors = {};

                            if (!values.email) {
                                errors.email = "Email is required";
                            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
                                errors.email = "Invalid email";
                            }

                            if (!values.password) {
                                errors.password = "Password is required";
                            } else if (values.password.length < 6) {
                                errors.password = "Password must be at least 6 characters long";
                            }

                            if (this.state.mode === 'Sign Up') {
                                if (!values.confirmPassword) {
                                    errors.confirmPassword = "Confirm Password is required";
                                } else if (values.password !== values.confirmPassword) {
                                    errors.confirmPassword = "Confirm password doesn't match";
                                }
                            }

                            return errors;
                        }
                    }
                >
                    {
                        ({ values, handleChange, handleBlur, handleSubmit, errors }) => (
                            <div className='form-container'>
                                <button type='button' className='modeBtn' onClick={
                                    () => {
                                        this.setState({
                                            mode: (this.state.mode == 'Login') ? 'Sign Up' : 'Login',
                                        })
                                    }
                                }>Switch to {(this.state.mode == 'Login') ? 'Sign Up' : 'Login'}
                                </button>
                                <form onSubmit={handleSubmit}>
                                    <input
                                        type="email"
                                        name='email'
                                        placeholder='Email'
                                        className='form-field'
                                        value={values.email}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    <span style={{ color: 'red' }}>{errors.email}</span>
                                    <br />
                                    <input
                                        type="password"
                                        name='password'
                                        placeholder='Password'
                                        className='form-field'
                                        value={values.password}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    <span style={{ color: 'red' }}>{errors.password}</span>
                                    <br />
                                    {
                                        (this.state.mode === 'Sign Up') && <>
                                            <input
                                                type="password"
                                                name='confirmPassword'
                                                placeholder='Confirm Password'
                                                className='form-field'
                                                value={values.confirmPassword}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                            <span style={{ color: 'red' }}>{errors.confirmPassword}</span>
                                            <br />
                                        </>
                                    }
                                    <input type='submit' className='btn btn-submit' value={this.state.mode} />
                                </form>
                            </div>
                        )
                    }
                </Formik>
            );
        }
        return (
            <div className='container'>
                {error}
                {element}
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);