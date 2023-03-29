import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { signUp } from "../../store/session";
import LoginFormModal from "../LoginFormModal";
import OpenModalButton from "../OpenModalButton";
import "./SignupForm.css";

function SignupFormModal() {
	const dispatch = useDispatch();
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [confirmPassword, setConfirmPassword] = useState("");
	const [passesValidations, setPassesValidations] = useState(false)
	const [errors, setErrors] = useState([]);
	const { closeModal } = useModal();

	const history = useHistory()

	const validateData = () => {
		switch (true) {
			case firstName === "":
				setPassesValidations(false)
				setErrors(["Please enter a first name."])
				break
			case lastName === "":
				setPassesValidations(false)
				setErrors(["Please enter a last name."])
				break
			case email === "":
				setPassesValidations(false)
				setErrors(["Please enter an email."])
				break
			case email.length === "":
				setPassesValidations(false)
				setErrors(["A valid email is required."])
				break
			case email.split("@").length < 2:
				setPassesValidations(false)
				setErrors(["A valid email is required."])
				break
			case email.split(".").length < 2:
				setPassesValidations(false)
				setErrors(["A valid email is required."])
				break
			case password === "":
				setPassesValidations(false)
				setErrors(["Please enter a password and a matching confirmation."])
				break
			case password.length < 8:
				setPassesValidations(false)
				setErrors(["Password requires a minimum of 8 characters: at least one lowercase, one uppercase, and one number. The only other characters allowed are: '!#%+:=? @'"])
				break
			case password.toUpperCase() === password:
				setPassesValidations(false)
				setErrors(["Password requires a minimum of 8 characters: at least one lowercase, one uppercase, and one number. The only other characters allowed are: '!#%+:=? @'"])
				break
			case password.toLowerCase() === password:
				setPassesValidations(false)
				setErrors(["Password requires a minimum of 8 characters: at least one lowercase, one uppercase, and one number. The only other characters allowed are: '!#%+:=? @'"])
				break
			case !/\d/.test(password):
				setPassesValidations(false)
				setErrors(["Password requires a minimum of 8 characters: at least one lowercase, one uppercase, and one number. The only other characters allowed are: '!#%+:=? @'"])
				break
			case !confirmPassword:
				setPassesValidations(false)
				setErrors(["Password requires a minimum of 8 characters: at least one lowercase, one uppercase, and one number. The only other characters allowed are: '!#%+:=? @'"])
				break
			case password !== confirmPassword:
				setPassesValidations(false)
				setErrors(["Please enter a password and a matching confirmation."])
				break
			default:
				setErrors([])
				setPassesValidations(true)
		}
	}

	useEffect(() => {
		if (!firstName && !lastName && !email && !password && !confirmPassword) return
		validateData()
	}, [firstName, lastName, email, password, confirmPassword])

	const handleSubmit = async (e) => {
		e.preventDefault();
		validateData()
		if (passesValidations) {
			const username = `${firstName} ${lastName}`
			const data = await dispatch(signUp(username, firstName, lastName, email, password));
			if (!data.id) {
				setErrors(data);
			} else {
				history.push("/dashboard")
				closeModal()
			}
		} else {
			setErrors([
				"Confirm Password field must be the same as the Password field",
			]);
		}
	};

	return (
		<div id="sign-up-form-modal">
			<i id="close-sign-up-modal-button" className="fa-solid fa-xmark fa-2xl" onClick={() => closeModal()} />
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
					disabled={!firstName || !lastName || !email || !password || !confirmPassword || password !== confirmPassword}
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
