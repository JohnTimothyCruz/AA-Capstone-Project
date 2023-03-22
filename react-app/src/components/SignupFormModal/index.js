import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
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
	const [dataPassesValidations, setDataPassesValidations] = useState(false)
	const [passwordPassesValidations, setPasswordPassesValidations] = useState(false)
	const [errors, setErrors] = useState([]);
	const { closeModal } = useModal();

	const validateData = () => {
		let newErrors = [errors]
		switch (false) {
			case firstName !== "":
				setDataPassesValidations(false)
				newErrors.push("Please enter a first name.")
				break
			case lastName !== "":
				setDataPassesValidations(false)
				newErrors.push("Please enter a last name.")
				break
			case email !== "":
				setDataPassesValidations(false)
				newErrors.push("Please enter an email.")
				break
			case email.length > 5:
				setDataPassesValidations(false)
				newErrors.push("A valid email is required.")
				break
			case email.split("@").length === 2:
				setDataPassesValidations(false)
				newErrors.push("A valid email is required.")
				break
			case email.split(".").length === 2:
				setDataPassesValidations(false)
				newErrors.push("A valid email is required.")
				break
			default:
				setDataPassesValidations(true)
		}
		setErrors(newErrors)
	}

	const validatePassword = () => {
		const newErrors = [errors]
		switch (false) {
			case password:
				setPasswordPassesValidations(false)
				newErrors.push("Please enter a password and a matching confirmation.")
				break
			case password.length >= 8:
				setPasswordPassesValidations(false)
				newErrors.push("Password requires a minimum of 8 characters: at least one lowercase, one uppercase, and one number. The only other characters allowed are: '!#%+:=? @'")
				break
			case password.toUpperCase() !== password:
				setPasswordPassesValidations(false)
				newErrors.push("Password requires a minimum of 8 characters: at least one lowercase, one uppercase, and one number. The only other characters allowed are: '!#%+:=? @'")
				break
			case password.toLowerCase() !== password:
				setPasswordPassesValidations(false)
				newErrors.push("Password requires a minimum of 8 characters: at least one lowercase, one uppercase, and one number. The only other characters allowed are: '!#%+:=? @'")
				break
			case /\d/.test(password):
				setPasswordPassesValidations(false)
				newErrors.push("Password requires a minimum of 8 characters: at least one lowercase, one uppercase, and one number. The only other characters allowed are: '!#%+:=? @'")
				break
			case confirmPassword:
				setPasswordPassesValidations(false)
				newErrors.push("Password requires a minimum of 8 characters: at least one lowercase, one uppercase, and one number. The only other characters allowed are: '!#%+:=? @'")
				break
			case password !== confirmPassword:
				setPasswordPassesValidations(false)
				newErrors.push("Password requires a minimum of 8 characters: at least one lowercase, one uppercase, and one number. The only other characters allowed are: '!#%+:=? @'")
				break
			default:
				setPasswordPassesValidations(true)
		}
		setErrors(newErrors)
	}

	useEffect(() => {
		if (!firstName && !lastName && !email && !password && !confirmPassword) return
		validateData()
	}, [firstName, lastName, email])

	useEffect(() => {
		if (!firstName && !lastName && !email && !password && !confirmPassword) return
		validatePassword()
	}, [password, confirmPassword])

	const handleSubmit = async (e) => {
		e.preventDefault();
		validateData()
		if (dataPassesValidations) {
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
					disabled={!dataPassesValidations || !passwordPassesValidations}
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
