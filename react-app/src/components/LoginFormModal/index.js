import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import OpenModalButton from "../OpenModalButton";
import SignupFormModal from "../SignupFormModal";
import "./LoginForm.css";
import { useHistory } from "react-router-dom";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  const history = useHistory()

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (!data.id) {
      setErrors(data);
    } else {
      history.push(`/dashboard/${data.id}`)
      closeModal()
    }
  };

  const loginAsDemo = async () => {
    const data = await dispatch(login("demo@aa.io", "password"))
    if (!data.id) {
      setErrors(data);
    } else {
      history.push(`/dashboard/${data.id}`)
      closeModal()
    }
  }

  return (
    <div id="login-form-modal-container">
      <i id="close-login-modal-button" className="fa-solid fa-xmark fa-2xl" onClick={closeModal} />
      <h1 id="login-modal-prompt">Log In</h1>
      <form id="login-form" onSubmit={handleSubmit}>
        <label id="login-email-input">
          <div id="login-email-prompt" className={email !== "" ? "stay" : ""}>E-mail</div>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label id="login-password-input">
          <div id="login-password-prompt" className={password !== "" ? "stay" : ""}>Password</div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button
          tabIndex="0"
          id="login-button"
          type="submit"
          disabled={password === "" || email === ""}
        >Log In</button>
        <ul id="login-errors">
          {errors.map((error, idx) => (
            <li className="login-error" key={idx}>{error}</li>
          ))}
        </ul>
        <div id="other-session-options">
          <OpenModalButton
            buttonText="Create an account?"
            modalComponent={<SignupFormModal />}
          />
          <div onClick={loginAsDemo}>Login as demo user?</div>
        </div>
      </form>
    </div>
  );
}

export default LoginFormModal;
