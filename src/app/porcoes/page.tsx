import RenderSection from '@/Components/Render-section-componentes/RenderSections';

export default function desserts() {
  return (
    <main style={{ height: 'auto', width: '100vw' }}>
      <h1>Refeições</h1>
      <RenderSection category="portions" />
    </main>
  );
}
