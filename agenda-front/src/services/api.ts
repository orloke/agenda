'use server';

import { Person } from '@/types/Person';

export const getPersons = async (): Promise<Person[]> => {
  const response = await fetch(`${process.env.API_URL}/persons`);
  if (!response.ok) {
    throw new Error('Erro ao buscar pessoas');
  }
  return response.json();
};

export const getPerson = async (id: number): Promise<Person> => {
  const response = await fetch(`${process.env.API_URL}/persons/${id}`);
  if (!response.ok) {
    throw new Error('Erro ao buscar pessoas');
  }
  return response.json();
};

export const createPerson = async (person: Person): Promise<Person> => {
  const response = await fetch(`${process.env.API_URL}/persons`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(person),
  });
  if (!response.ok) {
    throw new Error('Erro ao criar pessoa');
  }
  return response.json();
};

export const updatePerson = async (
  id: number,
  person: Person,
): Promise<Person> => {
  const response = await fetch(`${process.env.API_URL}/persons/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(person),
  });
  if (!response.ok) {
    throw new Error('Erro ao atualizar pessoa');
  }
  return response.json();
};

export const deletePerson = async (id: number): Promise<void> => {
  await fetch(`${process.env.API_URL}/persons/${id}`, {
    method: 'DELETE',
  });
};
