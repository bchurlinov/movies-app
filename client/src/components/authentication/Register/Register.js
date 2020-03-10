import React, { useState, useEffect } from "react";
import { InputText } from 'primereact/inputtext';
import { Button } from "primereact/button";
import { Password } from "primereact/password";
import { MultiSelect } from "primereact/multiselect";
import { map, some } from "lodash";
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import "./Register.scss";

const movieGenre = [
    { label: 'Comedy', value: 'comedy' },
    { label: 'Thriller', value: 'thriller' },
    { label: 'Horror', value: 'horror' },
    { label: 'Drama', value: 'drama' },
    { label: 'Sci-fi', value: "scifi" },
    { label: "Action", value: "action" },
    { label: "Animation", value: "animation" },
];

const animated = {
    animationDuration: "1s",
    animationFillMode: "both"
};

const Register = () => {

    const [totalSteps, setTotalSteps] = useState(4);
    const [emailValid, setEmailValid] = useState(false);
    const [passwordValid, setPasswordValid] = useState(false);
    const [animation, setAnimation] = useState(true)
    const [step, setStep] = useState({ currentStep: 1 });
    const [errors, setErrors] = useState({ errorMessages: [] });
    const [inputs, setInputs] = useState({
        name: "",
        lastname: "",
        password: "",
        email: "",
        genres: []
    });

    useEffect(() => {
        setTimeout(() => {
            setAnimation(false)
        }, 1350)
    });

    const inputHandler = event => {
        setInputs({
            ...inputs,
            [event.target.name]: event.target.value
        })
    }

    const multipleSelect = event => {
        setInputs({
            ...inputs,
            genres: event.target.value
        })
    }

    const renderInputErrors = name => {
        return some(errors.errorMessages, item => item.toLowerCase().includes(name)) ? "display-error" : "nothing";
    }

    const renderStepOne = () => {
        return (
            <div className="flex-wrapper">
                <div className={renderInputErrors("first")}>
                    <label>First Name:</label>
                    <InputText
                        onChange={inputHandler}
                        name="name"
                    />
                </div>
                <div className={renderInputErrors("last")}>
                    <label>Last Name:</label>
                    <InputText
                        onChange={inputHandler}
                        name="lastname"
                    />
                </div>
            </div>
        )
    }

    const renderStepTwo = () => {
        return (
            <div className="flex-wrapper">
                <div>
                    <label>E-mail address:</label>
                    <InputText
                        onChange={inputHandler}
                        placeholder="E-mail address"
                        name="email"
                        onKeyUp={checkEmail}
                        className={!emailValid ? "display-error" : "nothing"}

                    />
                </div>
                <div>
                    <label>Enter password:</label>
                    <Password
                        onChange={inputHandler}
                        name="password"
                        placeholder="Enter password"
                        onKeyUp={checkPassword}
                        className={!passwordValid ? "display-error" : "nothing"}
                    />
                </div>
            </div>
        )
    }

    const renderStepThree = () => {
        return (
            <div>
                <div className="multiselect-wrap">
                    <p>
                        Please enter movie genres you like ( you can pick more than one, it's optional):
                    </p>
                    <MultiSelect
                        options={movieGenre}
                        onChange={multipleSelect}
                        style={{ width: "100%" }}
                        value={inputs.genres}
                        name="genres"
                        placeholder="Choose:"
                    />
                </div>
            </div>
        )
    }

    const renderStepFour = () => {
        return <h1>Are you happy with this ?</h1>
    }

    const stepForward = () => {

        let error = "";
        let err = [];

        if (step.currentStep === totalSteps) {
            alert("no more steps");
            return;
        } else if (checkEmpty()) {

            error = "Please add your first name and your last name";
            setErrors({ ...errors, errorMessages: err.concat(error) });
            return false;

        } else if (checkNameLength()) {

            error = "First name and last name should contain 3 letters each";
            setErrors({ ...errors, errorMessages: err.concat(error) });
            return false;

        } else {

            setStep({
                ...step,
                currentStep: step.currentStep += 1
            });

            setErrors({
                ...errors,
                errorMessages: []
            });

            setAnimation(true);

            setTimeout(() => {
                setAnimation(false);
            }, 1350);
        }

        console.log(inputs);
    }

    const checkNameLength = () => {
        return inputs.name.length < 3 || inputs.lastname.length < 3
    }

    const checkEmpty = () => {
        return !inputs.name.length || !inputs.lastname.length
    }

    const checkEmail = event => {
        const typing = event.target.value;
        const check = typing.match(/\S+@\S+\.\S+/);
        if (check) {
            setEmailValid(true)
            setErrors({ ...errors, errorMessages: [] });
        } else {

            setEmailValid(false)
            let err = [];
            let error = "Please enter a valid e-mail address";
            setErrors({ ...errors, errorMessages: err.concat(error) });
            return false
        }
    }

    const checkPassword = () => {
        const check = inputs.password.length >= 5
        console.log(check);
        if (check) {
            setPasswordValid(true);
            setErrors({ ...errors, errorMessages: [] });
        } else {

            setPasswordValid(false);
            let err = [];
            let error = "Password should contain more than 4 characters";
            setErrors({ ...errors, errorMessages: err.concat(error) })
        }
    }

    const renderErrors = () => {
        return errors.errorMessages && map(errors.errorMessages, (message, index) => {
            return (
                <p key={index}>{message}</p>
            )
        })
    }

    const addFadeIn = () => {
        return animation ? "fadeInDown" : ""
    }

    const submitHandler = () => {
        console.log("Form Submitted");
    }

    return (
        <div className="auth-wrapper">
            <div style={animated} className={addFadeIn()}>
                <div className="auth-form-wrapper">
                    <div>
                        {step.currentStep === 1 && renderStepOne()}
                        {step.currentStep === 2 && renderStepTwo()}
                        {step.currentStep === 3 && renderStepThree()}
                        {step.currentStep === 4 && renderStepFour()}
                    </div>
                    <div className="error-messages">
                        {renderErrors()}
                    </div>
                </div>
                <div className="step-buttons" style={{ marginTop: "25px" }}>
                    {step.currentStep !== 4 ?
                        <Button
                            icon="pi pi-directions"
                            iconPos="right"
                            onClick={stepForward}
                            label="Next"
                            className="p-button-rounded p-button-warning"
                        />

                        :
                        <Button
                            icon="pi pi-directions"
                            iconPos="right"
                            onClick={submitHandler}
                            label="Submit"
                            className="p-button-rounded p-button-warning"
                        />
                    }
                </div>
            </div>
        </div>
    )
}

export default Register;