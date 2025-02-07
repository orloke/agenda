'use client';

import { deletePerson } from '@/services/api';
import { Person } from '@/types/Person';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export const PersonList = ({ persons }: { persons: Person[] }) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const removePerson = (e: React.MouseEvent<HTMLButtonElement>, id: number) => {
    e.stopPropagation();
    try {
      setLoading(true);
      deletePerson(id);
      router.refresh();
    } catch (error) {
      console.log('🚀 ~ removePerson ~ error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Lista de Pessoas</h2>
      <ul className="space-y-2">
        {persons.map((person) => (
          <li
            key={person.id}
            className="p-4 flex flex-col border rounded-lg cursor-pointer hover:border-blue-500 transition-all"
            onClick={() => router.push(`${person.id}`)}
          >
            <p>
              <strong>Nome:</strong> {person.name}
            </p>
            <p>
              <strong>Telefone:</strong> {person.phone}
            </p>
            <p>
              <strong>Email:</strong> {person.email}
            </p>
            {person?.address && (
              <p>
                <strong>Endereço:</strong> {person.address}
              </p>
            )}
            <button
              onClick={(e) => {
                removePerson(e, person.id as number);
              }}
              disabled={loading}
              className="ml-auto disabled:opacity-30 px-4 py-2 bg-red-500 rounded-md text-white hover:opacity-60 transition-all"
            >
              Deletar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
