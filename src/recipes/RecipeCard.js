import React, { useEffect, useContext, useState } from 'react';
import uuid from 'react-uuid';
import UserContext from '../auth/UserContext';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import './RecipeCard.css' 

/** RecipeCard: Displays Recipe Information, and is rendered by RecipeSearch component.
 */ 

function RecipeCard ({ id, title, image, calories, ingredients, source }) {
  console.debug("RecipeCard", id, source);

  const { hasFavoritedRecipe, makeFavorite, deleteFavorite } = useContext(UserContext);
  const [favorited, setFavorited] = useState(hasFavoritedRecipe(id));
  console.log(favorited);

  useEffect(function updateFavoritedStatus() {
    console.log("RecipeCard useEffect updateFavoritedStatus", "id=", id);
    setFavorited(hasFavoritedRecipe(id));
  }, [id, hasFavoritedRecipe]);

  // Favorite A Recipe
  async function handleFavorite(e) {
    if (favorited) {
      deleteFavorite(id);
      setFavorited(false);
    } else {
      makeFavorite(id);
      setFavorited(true);
    }
  };

  return(
    <div className="RecipeCard"> {favorited}
      <div className="card">
        <img className="card-img-top" src={image} alt={title}/>
          <h5 className="card-title">{title}</h5>
          <p>{parseInt(calories/6)} Calories Per Serving</p>
    
            <ul className="ingredients">
              {ingredients.map((ingredient) => (
                <li key={uuid()}><small>{ingredient.text}</small></li>
              ))}
            </ul>
          
          <p className="favorite-button" >
            {favorited ? (
              <FaHeart 
                onClick={handleFavorite}
                style={{ color: 'red' }}
              />
            ) : (
              <FaRegHeart
                onClick={handleFavorite}
                style={{  color: 'red' }}
              />
            )}
          </p>
    
          <p>
            <a className="btn btn-dark" href={source}>
              Full Recipe
            </a>
          </p>
         
      </div>
    </div>
  )
}

export default RecipeCard;
