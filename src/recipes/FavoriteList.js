import React, { useState, useEffect, useContext } from 'react';
import uuid from 'react-uuid';
import FeederAPI from '../api/feeder_api';
import { Link } from 'react-router-dom';
import UserContext from '../auth/UserContext';
import LoadingSpinner from '../common/LoadingSpinner';
import RecipeCard from './RecipeCard';

function FavoriteList() {
  const { currentUser } = useContext(UserContext);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const getFavorites = async function () {
      let favorites = await FeederAPI.getFavorites(currentUser.username);
      let recipeIds = favorites.map(f => f.recipeId);
      console.log("1")
      console.log(recipeIds);
      let recipeReqs = recipeIds.map(async (recipeId) => {
        const recipe = await FeederAPI.getRecipe(recipeId);
        console.log("2")
        console.log(recipeReqs);
        return recipe;
      });
      let recipes = await Promise.all(recipeReqs)
      console.log("3")
      console.log(recipes)
      setFavorites(recipes);
    };
    getFavorites();
  });

  if(!favorites) return <LoadingSpinner />
  console.log(favorites);

  return (
    <div className="Favorites">
      <div className="container"></div>
      <h4 className="mb-3">My Favorite Recipes</h4>
      
      <Link className="font-bold" to="/recipes">Back to Home</Link>
        
      <div className="recipes">
        {favorites && favorites.map(favorite => (
          <RecipeCard
            key={uuid()}
            id={favorite.uri.split("#")[1]}
            title={favorite.label}
            calories={favorite.calories}
            image={favorite.image}
            ingredients={favorite.ingredients}
            source={favorite.url}
          />
        ))}
      </div>
    </div>
  )
};

export default FavoriteList;