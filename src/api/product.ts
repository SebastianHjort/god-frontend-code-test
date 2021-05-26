import { ProductInterface } from '../models/product';

export const getProducts = async (): Promise<ProductInterface[]> => {
  const response = await fetch('./api/cars.json', {
    method: 'GET',
  });
  return response.json();
};
