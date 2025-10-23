import axios, { AxiosRequestConfig } from "axios";
import { CarResponse, Car, CarEntity } from "../types";

const getAixosConfig = () : AxiosRequestConfig => {
  const token = sessionStorage.getItem('jwt')?.replace('Bearer ', '');

  return {
    headers: {
      'Authorization': token,
      'Content-Type': 'application/json',
    },
  };
};

export const getCars = async (): Promise<CarResponse[]> => {

  const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/cars`, getAixosConfig());

  return response.data._embedded.cars;
};

export const deleteCar = async (link: string): Promise<CarResponse> => {
  const response = await axios.delete(link, getAixosConfig());
  return response.data;
};

export const addCar = async (car: Car) : Promise<CarResponse> => {
  const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/cars`, car, getAixosConfig());
  return response.data;
}

export const updateCar = async (carEntity: CarEntity): Promise<CarResponse> => {
  const response = await axios.put(carEntity.url, carEntity.car, getAixosConfig());
  return response.data;
}