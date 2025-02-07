'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { PersonFormData, PersonSchema } from '@/types/Person';
import { updatePerson } from '../services/api';
import { useRouter } from 'next/navigation';
import { Person } from '@/types/Person';

interface EditPersonFormProps {
  person: Person;
}

export const EditPersonForm = ({ person }: EditPersonFormProps) => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PersonFormData>({
    resolver: zodResolver(PersonSchema),
    defaultValues: person, // Preenche o formulário com os dados da pessoa
  });

  const onSubmit = async (data: PersonFormData) => {
    if (!person.id) return;
    try {
      await updatePerson(person.id, data);
      router.push('/'); // Redireciona para a página inicial após a edição
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <h2 className="text-2xl font-bold">Editar Pessoa</h2>
      <div className="space-y-2">
        <div>
          <input
            type="text"
            placeholder="Nome"
            {...register('name')}
            className="w-full p-2 border rounded-lg"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>
        <div>
          <input
            type="text"
            placeholder="Telefone"
            {...register('phone')}
            className="w-full p-2 border rounded-lg"
          />
          {errors.phone && (
            <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
          )}
        </div>
        <div>
          <input
            type="email"
            placeholder="Email"
            {...register('email')}
            className="w-full p-2 border rounded-lg"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>
        <div>
          <input
            type="text"
            placeholder="Endereço (opcional)"
            {...register('address')}
            className="w-full p-2 border rounded-lg"
          />
          {errors.address && (
            <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>
          )}
        </div>
      </div>
      <div className="flex space-x-2">
        <button
          type="submit"
          className="px-4 py-2 bg-green-500 text-white rounded-lg"
        >
          Salvar
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="px-4 py-2 bg-gray-500 text-white rounded-lg"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
};
