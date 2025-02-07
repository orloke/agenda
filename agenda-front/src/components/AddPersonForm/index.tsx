'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createPerson } from '../../services/api';
import { useRouter } from 'next/navigation';
import { PersonFormData, PersonSchema } from '@/types/Person';

export const AddPersonForm = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<PersonFormData>({
    resolver: zodResolver(PersonSchema),
  });

  const onSubmit = async (data: PersonFormData) => {
    try {
      await createPerson(data);
      router.refresh();
      reset();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <h2 className="text-2xl font-bold">Adicionar Pessoa</h2>
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
      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded-lg"
      >
        Adicionar
      </button>
    </form>
  );
};


