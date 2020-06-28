export type Id = string;

export type Gender = "male" | "female";
export type PetType = "dog" | "cat";

export interface Person {
  id: Id;
  name: string;
  gender: Gender;
  age: number;
  pets: Id[];
}

export interface Pet {
  id: Id;
  name: string;
  type: PetType;
}

export interface AppState {
  loading: boolean;

  // If we wanted to multiple error handling behaviors I would
  // have used a union type instead of a string here.
  error?: string;

  people: {
    byId: Record<Id, Person>;
    ids: Id[];
  };
  pets: {
    byId: Record<Id, Pet>;
    ids: Id[];
  };
}

export const createEmptyAppState: () => AppState = () => ({
  loading: true,
  people: {
    byId: {},
    ids: [],
  },
  pets: {
    byId: {},
    ids: [],
  },
});

export type PetsByOwnerGender = Record<Gender, Pet[]>;

export const selectPersonById = (state: AppState, id: Id) => {
  return state.people.byId[id];
};

export const filterIdsByGender = (state: AppState, gender: Gender) => {
  return state.people.ids.filter(
    (id) => selectPersonById(state, id).gender === gender
  );
};

export const selectPetsByOwnerId = (state: AppState, ownerId: Id) => {
  const petIds = state.people.byId[ownerId].pets;
  return petIds.map((id) => state.pets.byId[id]);
};

export const groupPetsByOwnerGenderSelector = (
  state: AppState
): PetsByOwnerGender => {
  return {
    male: filterIdsByGender(state, "male").flatMap((id) =>
      selectPetsByOwnerId(state, id)
    ),
    female: filterIdsByGender(state, "female").flatMap((id) =>
      selectPetsByOwnerId(state, id)
    ),
  };
};
