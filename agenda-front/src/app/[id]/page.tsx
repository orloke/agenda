import { EditPersonForm } from '@/components/EditPersonForm';
import { getPerson } from '@/services/api';

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const persons = await getPerson(+id);
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8">Agenda de Pessoas</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <EditPersonForm person={persons} />
      </div>
    </div>
  );
}
