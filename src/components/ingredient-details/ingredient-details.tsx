import { FC } from 'react';
import { Preloader, IngredientDetailsUI } from '@ui';
import { useSelector } from '../../services/store';
import { useParams } from 'react-router-dom';

export const IngredientDetails: FC = () => {
  const { id } = useParams();
  const ingredients = useSelector((state) => state.ingredients.ingredients);
  const ingredientData = ingredients.find((item) => item._id === id);

  if (!ingredientData) {
    return <Preloader />;
  }
  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
