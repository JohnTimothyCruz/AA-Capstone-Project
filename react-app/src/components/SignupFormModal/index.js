import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { signUp } from "../../store/session";
import LoginFormModal from "../LoginFormModal";
import OpenModalButton from "../OpenModalButton";
import "./SignupForm.css";

function SignupFormModal() {
	const dispatch = useDispatch();
	const [email, setEmail] = useState("");
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [confirmPassword, setConfirmPassword] = useState("");
	const [passesValidations, setPassesValidations] = useState(false)
	const [errors, setErrors] = useState([]);
	const { closeModal } = useModal();

	const validateData = () => {
		switch (false) {
			case firstName:
				setPassesValidations(false)
				break
			case lastName:
				setPassesValidations(false)
				break
			case password && password.length >= 8:
				setPassesValidations(false)
				break
			case password.toUpperCase() !== password:
				setPassesValidations(false)
				break
			case password.toLowerCase() !== password:
				setPassesValidations(false)
				break
			case confirmPassword:
				setPassesValidations(false)
				break
			case password !== confirmPassword:
				setPassesValidations(false)
				break
			default:
				setPassesValidations(true)
		}
		for (const char in password) {
			if ('1234567890'.includes(char)) {
				setPassesValidations(false)
			}
		}
		// Change this function to make errors pop up
		// if password fails its validations.
	}

	useEffect(() => {
		validateData()
	}, [firstName, lastName, email, password, confirmPassword])

	const handleSubmit = async (e) => {
		e.preventDefault();
		validateData()
		if (passesValidations) {
			const data = await dispatch(signUp(firstName, email, password));
			if (data) {
				setErrors(data);
			} else {
				closeModal();
			}
		} else {
			setErrors([
				"Confirm Password field must be the same as the Password field",
			]);
		}
	};

	return (
		<div id="sign-up-form-modal">
			<i id="close-sign-up-modal-button" className="fa-solid fa-xmark fa-2xl" onClick={closeModal} />
			<h1 id="sign-up-modal-prompt">Get Started</h1>
			<form id="sign-up-form" onSubmit={handleSubmit} noValidate>
				<div id="first-and-last-name-input-container">
					<label id="sign-up-first-name-input">
						<div id="sign-up-first-name-prompt" className={firstName !== "" ? "stay" : ""}>First Name</div>
						<input
							type="text"
							value={firstName}
							onChange={(e) => setFirstName(e.target.value)}
							required
						/>
					</label>
					<label id="sign-up-last-name-input">
						<div id="sign-up-last-name-prompt" className={lastName !== "" ? "stay" : ""}>Last Name</div>
						<input
							type="text"
							value={lastName}
							onChange={(e) => setLastName(e.target.value)}
							required
						/>
					</label>
				</div>
				<label id="sign-up-email-input">
					<div id="sign-up-email-prompt" className={email !== "" ? "stay" : ""}>Email</div>
					<input
						type="text"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
				</label>
				<label id="sign-up-password-input">
					<div id="sign-up-password-prompt" className={password !== "" ? "stay" : ""}>Password</div>
					<input
						type={showPassword ? "text" : "password"}
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
					<i id="show-password-button" className={`fa-solid ${showPassword ? "fa-eye-slash" : "fa-eye"}`} onClick={() => setShowPassword(!showPassword)} />
					<i id="password-strength-icon" className="fa-solid fa-circle-info" />
				</label>
				<label id="sign-up-confirm-password-input">
					<div id="sign-up-confirm-password-prompt" className={confirmPassword !== "" ? "stay" : ""}>Confirm Password</div>
					<input
						type="password"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
						required
					/>
				</label>
				<button type="submit"
					id="sign-up-button"
					// Use effect for validations?
					disabled={!passesValidations}
				>Register</button>
				<ul id="sign-up-errors">
					{errors.map((error, idx) => (
						<li className="sign-up-error" key={idx}>{error}</li>
					))}
				</ul>
				<div id="other-session-options">
					<OpenModalButton
						buttonText="Already have an account?"
						modalComponent={<LoginFormModal />}
					/>
				</div>
			</form>
		</div>
	);
}

export default SignupFormModal;
