import React, { useEffect, useState } from 'react';
import jwt from 'jsonwebtoken';
import { Switch, Route, Redirect } from 'react-router-dom';
import useLocalStorage from './hooks/useLocalStorage';
import UserContext from './auth/UserContext';
import PrivateRoute from './PrivateRoute';
import LoadingSpinner from './common/LoadingSpinner';
import Header from './common/Header';
import Home from './home/Home';
import LoginForm from './auth/LoginForm';
import SignupForm from './auth/SignupForm';
import RecipeList from './recipes/RecipeList';
import FavoriteList from './recipes/FavoriteList';
import ProfileForm from './profile/ProfileForm';
import FeederAPI from './api/feeder_api';
import Footer from './common/Footer';
import './App.css';

// Key name for storing token in localStorage for "remember me" re-login
export const TOKEN_STORAGE_ID = "feeder-token";

/** Feeder application.
 *
 * - infoLoaded: has user data been pulled from API?
 *   (this manages spinner for "loading...")
 *
 * - currentUser: user obj from API. This becomes the canonical way to tell
 *   if someone is logged in. This is passed around via context throughout app.
 *
 * - token: for logged in users, this is their authentication JWT.
 *   Is required to be set for most API calls. This is initially read from
 *   localStorage and synced to there via the useLocalStorage hook.
 *
 * App -> Routes
 */


function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useLocalStorage(TOKEN_STORAGE_ID);
  const [infoLoaded, setInfoLoaded] = useState(false);
  const [favoriteIds, setFavoriteIds] = useState(new Set([]));

  // Load user info from API. Until a user is logged in and they have a token,
  // this should not run. It only needs to re-run when a user logs out, so
  // the value of the token is a dependency for this effect.
  useEffect(function loadUserInfo() {
    async function getCurrentUser() {
      if(token) {
        try {
          let { username } = jwt.decode(token);
          // put the token on the Api class so it can use it to call the API.
          FeederAPI.token = token;
          let currentUser = await FeederAPI.getCurrentUser(username);
          setCurrentUser(currentUser);
          setFavoriteIds(new Set(currentUser.favorites));
        } catch (err) {
          setCurrentUser(null);
        }
      }
      setInfoLoaded(true);
    }
    // set infoLoaded to false while async getCurrentUser runs; once the
    // data is fetched (or even if an error happens!), this will be set back
    // to false to control the spinner.
    setInfoLoaded(false);
    getCurrentUser();
  }, [token]);

  /** Handles Site-Wide Logout */
  function logout() {
    setCurrentUser(null);
    setToken(null);
  }

  /** Handles Site-Wide Signup 
   * 
   * Automatically logs user in (set token) upon signup; 
   * function awaits and check its return value
  */
  async function signup(signupData) {
    try {
      let token = await FeederAPI.signup(signupData);
      setToken(token);
      return { success: true };
    } catch (errors) {
      return { success: false, errors }
    }
  }

  /** Handles Site-Wide Login 
   * 
   * Function awaits and check its return value
  */
  async function login(loginData) {
    try {
      let token = await FeederAPI.login(loginData);
      setToken(token);
      return { success: true };
    } catch (errors) {
      return { success: false, errors };
    }
  }

  /** Checks if a recipe has been favorited. */
  function hasFavoritedRecipe(id) {
    return favoriteIds.has(id);
  }

  /** Favorite Recipe : make API call and update set of favorite IDs. */
  function makeFavorite(id) {
    if(hasFavoritedRecipe(id)) return;
    FeederAPI.makeFavorite(currentUser.username, id);
    setFavoriteIds(new Set([...favoriteIds, id]));
  }

  function deleteFavorite(id) {
    if(!hasFavoritedRecipe(id)) return;
    FeederAPI.deleteFavorite(currentUser.username, id);
    let updated = new Set([...favoriteIds]);
    updated.delete(id);
    setFavoriteIds(updated);
  }

  if(!infoLoaded) return <LoadingSpinner />

  return (
    <div className="App">
      <UserContext.Provider value={{ currentUser, setCurrentUser, hasFavoritedRecipe, makeFavorite, deleteFavorite }}>

        <Header logout={logout} />
        
          <Switch>
            <Route exact path='/'>
              <Home />
            </Route>

            <Route exact path='/login'>
              <LoginForm login={login} />
            </Route>

            <Route exact path='/signup'>
              <SignupForm signup={signup} />
            </Route>

            <PrivateRoute exact path='/recipes'>
              <RecipeList />
            </PrivateRoute>

            <PrivateRoute exact path='/favorites'>
              <FavoriteList />
            </PrivateRoute>

            <PrivateRoute path='/profile'>
              <ProfileForm />
            </PrivateRoute>

            <Redirect to="/" />

          </Switch>

        <Footer />

      </UserContext.Provider>  
    </div> 
  );
}

export default App;