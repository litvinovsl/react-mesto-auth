import React from "react";
import { Route, Redirect, Switch, useHistory } from "react-router-dom";
import api from "../utils/Api.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import Footer from "./Footer";
import Register from "./Register";
import Login from "./Login";
import Header from "./Header";
import Main from "./Main";
import EditProfilePopup from "./EditProfilePopup.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import AddPlacePopup from "./AddPlacePopup.js";
import ImagePopup from "./ImagePopup";
import InfoTooltip from "./InfoTooltip";
import ProtectedRoute from "./ProtectedRoute.js";
import { register, login, validToken } from '../utils/auth';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [currentUser, setСurrentUser] = React.useState({
    name: "",
    about: "",
  });
  const [cards, setCards] = React.useState([]);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [infoTooltipOpen, setInfoTooltipOpen] = React.useState(false);
  const [userEmal, setUserEmal] = React.useState("");
  const [massageTooltip, setMassageTooltip] = React.useState(false);
  const history = useHistory();

  React.useEffect(() => {
    api
      .getUserInfo()
      .then((data) => {
        setСurrentUser(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard(null);
    setInfoTooltipOpen(false);
  }

  function handleUpdateUser({ name, about }) {
    api
      .updateUserInfo({ name, about })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        closeAllPopups();
      });
  }

  function handleUpdateAvatar({ avatar }) {
    api
      .updateProfileAvatar({ avatar })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        closeAllPopups();
      });
  }

  function handleAddPlaceSubmit(data) {
    api
      .addNewCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        closeAllPopups();
      });
  }

  React.useEffect(() => {
    api
      .getPageData()
      .then(([cardsData, userData]) => {
        setCards(cardsData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  React.useEffect(() => {
    checkToken();
  }, [loggedIn])

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    api.setCardLike(card._id, isLiked)
      .then((data) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? data : c))
        );
      })
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then((data) => {
        console.log("del");
        setCards((state) => state.filter((c) => c._id !== card._id && c));
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function onRegister(email, password) {
    register(password, email)
      .then((res) => {
        setInfoTooltipOpen(true);
        if(res) {
          history.push('/sign-in');
          setMassageTooltip(true);
        }
      })
      .catch(() => {
        setInfoTooltipOpen(true);
        setMassageTooltip(false);
      });
  }

  function onLogin(email, password) {
    login(password, email)
      .then((res) => {
        if(res) {
          setLoggedIn(true);
          history.push('/');
          localStorage.setItem('jwt', res.token);
          setMassageTooltip(true);
        }
      })
      .catch(() => {
        setInfoTooltipOpen(true);
        setMassageTooltip(false);

      });
  }

function checkToken() {

  const token = localStorage.getItem('jwt');
  if(token) {
    validToken(token)
    .then((res) => {
      if(res) {
        setUserEmal(res.data.email);
        setLoggedIn(true);
        history.push('/');
        // console.log('userEmail: ', userEmal);
      };
    })
    .catch((err) => {
      console.log(err);
    });
  }
}

function logoutProfile() {
  localStorage.removeItem('jwt');
  history.push('/sign-in');
  setLoggedIn(false);
}

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div>
        <Header 
          logoutProfile={logoutProfile}
          userEmail={userEmal}  />
        <Switch>
          <ProtectedRoute
            onCardClick={setSelectedCard}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardDelete={handleCardDelete}
            onCardLike={handleCardLike}
            cards={cards}
            exact
            path="/"
            component={Main}
            loggedIn={loggedIn}
          />
          <Route path="/sign-in">
            <Login onLogin={onLogin}/>
          </Route>
          <Route path="/sign-up">
            <Register  onRegister={onRegister}/>
          </Route>
          <Route>
          {loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-up" />}
        </Route> 
        </Switch>
        <Footer />
        <AddPlacePopup
          onSubmit={handleAddPlaceSubmit}
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
        />
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <EditAvatarPopup
          onUpdateAvatar={handleUpdateAvatar}
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
        />
        <InfoTooltip 
          isOpen={infoTooltipOpen}
          onClose={closeAllPopups}
          massageTooltip={massageTooltip} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
