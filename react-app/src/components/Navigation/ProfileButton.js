import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import { useHistory } from "react-router-dom";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [showMenu, setShowMenu] = useState(false);
  const [findingFlashcards, setFindingFlasshcards] = useState(false)
  const ulRef = useRef();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current?.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
  };

  const openFind = () => {
    setFindingFlasshcards(!findingFlashcards)
  }

  const dropdownClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
  const closeMenu = () => setShowMenu(false);

  return (
    <>
      <div id="navbar-options-container">
        <div className="navbar-option">
          {user && <div onClick={() => history.push('/dashboard')}>
            My Classes
          </div>
          }
        </div>
        <div className={`navbar-option ${findingFlashcards ? "selected" : ""}`} onClick={openFind}>
          <i className="fa-solid fa-magnifying-glass fa-xs" />
          <div id="find-flashcards-option-text">
            Find Flashcards
          </div>
          <i className={`fa-solid ${findingFlashcards ? "fa-caret-up" : "fa-caret-down"}`} />
        </div>
        <div className="navbar-option">Make Flashcards</div>
        <div className="navbar-option">About</div>
      </div>
      {user ? (
        <>
          <div id="profile-button-container">
            <i onClick={openMenu} className="profile-button fa-regular fa-circle-user fa-2xl" />
          </div>
          <div id="user-menu" className={dropdownClassName}>
            <div id="user-menu-section-top" className="user-menu-section">
              <i className="user-menu-profile-icon fa-regular fa-circle-user fa-2xl" />
              <div id="user-username">
                {user.username}
              </div>
            </div>
            <div className="user-menu-section">View Profile</div>
            <div className="user-menu-section">My Account</div>
            <div className="user-menu-section" onClick={handleLogout}>Log Out</div>
          </div>
          <div id="orange-box"></div>
        </>
      ) : (
        <div id="enter-session-buttons-container">
          <OpenModalButton
            buttonText="Log In"
            onItemClick={closeMenu}
            modalComponent={<LoginFormModal />}
          />

          <OpenModalButton
            buttonText="Get Started"
            onItemClick={closeMenu}
            modalComponent={<SignupFormModal />}
          />
        </div>
      )}
    </>
  );
}

export default ProfileButton;
