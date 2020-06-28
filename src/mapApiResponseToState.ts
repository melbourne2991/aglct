import * as api from "./api";
import { createEmptyAppState, AppState, PetType, Gender } from "./state";
import shortid from "shortid";

const mapApiPetTypes: Record<api.PetType, PetType> = {
  Dog: "dog",
  Cat: "cat",
};

const mapApiGenders: Record<api.Gender, Gender> = {
  Male: "male",
  Female: "female",
};

export const mapApiResponseToState = (people: api.GetPeopleData): AppState => {
  return people.reduce(
    (acc, personData) => {
      const personId = shortid();

      const pets = personData.pets || [];

      const petIds = pets.map((petData) => {
        const petId = shortid();

        acc.pets.byId[petId] = {
          ...petData,
          id: petId,
          type: mapApiPetTypes[petData.type],
        };
        acc.pets.ids.push(petId);

        return petId;
      });

      const person = {
        ...personData,
        id: personId,
        gender: mapApiGenders[personData.gender],
        pets: petIds,
      };

      acc.people.byId[personId] = person;
      acc.people.ids.push(personId);

      return acc;
    },
    {
      ...createEmptyAppState(),
      loading: false,
    }
  );
};

export const mapApiFailureToState = (errorResponse: Response): AppState => {
  return {
    ...createEmptyAppState(),
    loading: false,
    error: errorResponse.statusText,
  };
};
