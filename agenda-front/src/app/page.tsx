import { AddPersonForm } from '@/components/AddPersonForm';
import { PersonList } from '@/components/PersonList';
import { getPersons } from '@/services/api';

export const dynamic = 'force-dynamic'

export default async function Home() {
  const persons = await getPersons();
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8">Agenda de Pessoas</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <AddPersonForm />
        <PersonList persons={persons} />
      </div>
    </div>
  );
}
