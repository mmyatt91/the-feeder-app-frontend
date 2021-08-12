import React, { useState, useEffect } from 'react';
import FeederAPI from '../api/feeder_api';
import SearchForm from '../common/SearchForm';
import LoadingSpinner from '../common/LoadingSpinner';
import RecipeCard from './RecipeCard';
import uuid from 'react-uuid';


function RecipeList () {
  const [query, setQuery] = useState('');
  const [recipes, setRecipes] = useState([]);

 useEffect(() => {
   const getRecipes = async function () {
     const recipes = await FeederAPI.getRecipes(query);
     setRecipes(recipes);
   };
   getRecipes();
 }, [query]);

  if(!recipes) return <LoadingSpinner />

  return (
    <div className="App">
      <div className="container">
       <SearchForm 
        searchFor={setQuery} 
      />

        <div className="recipes">
          {recipes && recipes.map(recipe => (
            <RecipeCard
              key={uuid()}
              id={recipe.recipe.uri.split("#")[1]}
              title={recipe.recipe.label}
              calories={recipe.recipe.calories}
              image={recipe.recipe.image}
              ingredients={recipe.recipe.ingredients}
              source={recipe.recipe.url}
            />
          ))}
          </div>
        </div>
    </div>
  )
};

export default RecipeList;