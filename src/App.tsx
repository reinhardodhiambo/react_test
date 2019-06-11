import React, {Props} from 'react';
import './App.css';
import validator from 'validator';


export default class App extends React.Component <any, any> {
    constructor(props: any) {
        super(props);
        // Set the initial input values
        this.state = {
            accepting_shipment: true,
            currentStep: 0, // Default is Step 1
            email: '',
            name: '',
            password: '',
            dob: '',
            phone_number: '',
            gender: '',
            address_line_1: '',
            address_line_2: '',
            zip_code: '',
            city: '',
            state: '',
            subscription_plan: '',
        };
        // Bind the submission to handleChange()
        this.handleChange = this.handleChange.bind(this);
    }

    // Use the submitted data to set the state
    handleChange(event: any) {
        const {name, value} = event.target;
        this.setState({
            [name]: value
        })
    }

    setGender(event: any) {
        this.setState({
            gender: event.target.value
        })
    }

    setSubscription(event: any) {
        this.setState({
            subscription_plan: event.target.value
        })
    }

    // Trigger an alert on form submission
    handleSubmit = (event: any) => {
        event.preventDefault();
        const {email, username, password} = this.state;
        alert(`Your registration detail: \n 
      Email: ${email} \n 
      Username: ${username} \n
      Password: ${password}`)
    };

    _next = () => {
        if (this.validate()) {
            let currentStep = this.state.currentStep;
            if (currentStep !== 2)
                currentStep = currentStep === 1 ? 2 : currentStep + 1;
            else
                currentStep = this.state.accepting_shipment ? 4 : currentStep + 1;
            this.setState({
                currentStep: currentStep
            })
        }
    };
    validate = () => {
        let currentPage = this.state.currentStep;
        if (currentPage === 1) {
            if (this.state.email === '') {
                alert("email empty");
                return false;
            }
            if (this.state.name === '') {
                alert("name Empty");
                return false;
            }
            if (this.state.password === '') {
                alert("password empty");
                return false;
            }
            if (this.state.password !== this.state.password_confirm) {
                alert("passwords not matching");
                return false;
            }
        }
        if (currentPage === 2) {
            if (this.state.dob === '') {
                alert("Date of birth empty");
                return false;
            }
            if (this.state.phone_number === '') {
                alert("Phone Empty");
                return false;
            }
            if (validator.isMobilePhone(this.state.phone_number, 'en-US')) {
                alert("Telephone not US format");
                return false;
            }
            if (this.state.gender === '') {
                alert("Gender empty");
                return false;
            }
        }

        if (currentPage === 3) {
            if (this.state.address_line_1 === '') {
                alert("Address Line empty");
                return false;
            }
            if (this.state.address_line_2 === '') {
                alert("Address Line 2 empty");
                return false;
            }
            if (this.state.address_line_2 === '') {
                alert("Phone Empty");
                return false;
            }
            if (this.state.zip_code === '') {
                alert("Zip Code empty");
                return false;
            }
            if (this.state.city === '') {
                alert("City empty");
                return false;
            }
            if (this.state.city === '') {
                alert("state empty");
                return false;
            }
        }
        return true;
    };

    _prev = () => {
        let currentStep = this.state.currentStep;
        if (currentStep !== 4)
            currentStep = currentStep <= 1 ? 1 : currentStep - 1;
        else
            currentStep = this.state.accepting_shipment ? 2 : currentStep - 1;

        this.setState({
            currentStep: currentStep
        })
    };

    _setAcceptingShipment = (type: boolean) => {
        let currentStep = this.state.currentStep;
        this.setState({
            currentStep: currentStep + 1,
            accepting_shipment: type
        })
    };

    /*
    * the functions for our button
    */
    previousButton(): JSX.Element {
        let currentStep = this.state.currentStep;
        if (currentStep !== 1) {
            return (
                <button
                    className="btn btn-secondary"
                    type="button" onClick={this._prev}>
                    Previous
                </button>
            )
        }
        return (<div>

        </div>);
    };

    nextButton(): JSX.Element {
        let currentStep = this.state.currentStep;
        if (currentStep < 4) {
            return (
                <button
                    className="btn btn-primary float-right"
                    type="button" onClick={this._next}>
                    Next
                </button>
            )
        }
        return (<div>

        </div>)
    }

    public render() {
        return (
            <React.Fragment>
                <p>Step {this.state.currentStep} </p>
                <form onSubmit={this.handleSubmit}>
                    <this.menu
                        currentStep={this.state.currentStep}
                        handleChange={this.handleChange}
                        _setAcceptingShipment={this._setAcceptingShipment}
                    />
                    <this.Step1
                        currentStep={this.state.currentStep}
                        handleChange={this.handleChange}
                        email={this.state.email}
                        name={this.state.name}
                        password={this.state.password}
                        password2={this.state.password2}
                    />
                    <this.Step2
                        currentStep={this.state.currentStep}
                        handleChange={this.handleChange}
                        dob={this.state.dob}
                        phone_number={this.state.phone_number}
                        gender={this.state.gender}
                    />
                    <this.Step3
                        currentStep={this.state.currentStep}
                        handleChange={this.handleChange}
                        address_line_1={this.state.address_line_1}
                        address_line_2={this.state.address_line_2}
                        zip_code={this.state.zip_code}
                        city={this.state.city}
                        state={this.state.state}
                    />
                    <this.Step4
                        currentStep={this.state.currentStep}
                        handleChange={this.handleChange}
                        subscription_plan={this.state.subscription_plan}
                    />

                </form>
            </React.Fragment>
        );
    }

    Step1 = (props: any) => {
        if (props.currentStep !== 1) {
            return null
        }
        return (
            <div className="form-group">
                <ul>
                    <input
                        className="form-control"
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Name"
                        value={props.name}
                        onChange={props.handleChange}
                    />
                    <input
                        className="form-control"
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Email"
                        value={props.email}
                        onChange={props.handleChange}
                    />
                    <input
                        className="form-control"
                        id="password"
                        name="password"
                        type="password"
                        placeholder="Password"
                        value={props.password}
                        onChange={props.handleChange}
                    />
                    <input
                        className="form-control"
                        id="password_confirm"
                        name="password_confirm"
                        type="password"
                        placeholder="Confirm Password"
                        value={props.password_confirm}
                        onChange={props.handleChange}
                    />
                </ul>
                {this.previousButton()}
                {this.nextButton()}

            </div>
        );
    };

    Step2 = (props: any) => {
        if (props.currentStep !== 2) {
            return null
        }
        return (
            <div className="form-group">
                <input
                    className="form-control"
                    id="dob"
                    name="dob"
                    type="date"
                    placeholder="Date of Birth"
                    value={props.dob}
                    onChange={props.handleChange}
                />
                <input
                    className="form-control"
                    id="phone_number"
                    name="phone_number"
                    type="tel"
                    placeholder="Phone Number"
                    value={props.phone_number}
                    onChange={props.handleChange}
                />
                <div onChange={this.setGender.bind(this)}>
                    <input type="radio" value="MALE" name="gender"/> Male
                    <input type="radio" value="FEMALE" name="gender"/> Female
                </div>
                {this.previousButton()}
                {this.nextButton()}
            </div>
        );
    };

    Step3 = (props: any) => {
        if (props.currentStep !== 3) {
            return null
        }
        return (
            <React.Fragment>
                <div className="form-group">
                    <input
                        className="form-control"
                        id="address_line_1"
                        name="address_line_1"
                        type="text"
                        placeholder="Address Line 1"
                        value={props.address_line_1}
                        onChange={props.handleChange}
                    />
                    <input
                        className="form-control"
                        id="address_line_2"
                        name="address_line_2"
                        type="text"
                        placeholder="Enter Address Line 2"
                        value={props.address_line_2}
                        onChange={props.handleChange}
                    />
                    <input
                        className="form-control"
                        id="zip_code"
                        name="zip_code"
                        type="text"
                        placeholder="Enter Zip Code"
                        value={props.zip_code}
                        onChange={props.handleChange}
                    />
                    <input
                        className="form-control"
                        id="city"
                        name="city"
                        type="text"
                        placeholder="City"
                        value={props.city}
                        onChange={props.handleChange}
                    />
                    <input
                        className="form-control"
                        id="state"
                        name="state"
                        type="text"
                        placeholder="State"
                        value={props.state}
                        onChange={props.handleChange}
                    />
                </div>
                {this.previousButton()}
                {this.nextButton()}
            </React.Fragment>
        );
    };

    Step4 = (props: any) => {
        if (props.currentStep !== 4) {
            return null
        }
        return (
            <div className="form-group">
                <div onChange={this.setSubscription.bind(this)}>
                    <input type="radio" value="MONTHLY" name="gender"/> Male
                    <input type="radio" value="YEARLY" name="gender"/> Female
                </div>
                {this.previousButton()}
                {this.nextButton()}
                <button className="btn btn-success btn-block">Sign up</button>
            </div>
        );
    };

    menu = (props: any) => {
        if (props.currentStep !== 0) {
            return null
        }
        return (
            <div className="form-group col column">
                <button
                    className="btn btn-primary float-right"
                    type="button" onClick={() => this._setAcceptingShipment(true)}>
                    Accepting Shipment
                </button>
                <button
                    className="btn btn-primary float-right"
                    type="button" onClick={() => this._setAcceptingShipment(false)}>
                    Not Accepting Shipment
                </button>
            </div>
        );
    };
}