export const apiRoot = `http://agl-developer-test.azurewebsites.net`;
export const peopleEndpoint = `${apiRoot}/people.json`;

export type Gender = "Male" | "Female";
export type PetType = "Dog" | "Cat";

export interface Pet {
  name: string;
  type: PetType;
}

export interface Person<T> {
  name: string;
  gender: Gender;
  age: number;
  pets: Pet[];
}

export type GetPeopleData = Person<Pet>[];

export const getPeople = async (): Promise<Person<Pet>[]> => {
  const response = await fetch(peopleEndpoint);
  if (response.status > 299 || response.status < 200) throw response;
  return response.json();
};
