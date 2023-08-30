'use client';

import './style-page.css';
import RenderRecommended from '@/Components/Recommended-components/RenderRecommended';
import RenderSection from '@/Components/Render-section-componentes/RenderSections';
import TagsHeader from '@/Components/section-nav-tags/RenderTags';

import './style-page.css';
/**
 * Salvar os dados no SessionStorage para evitar fetch denecessário.
 * Criar um card reutilizável
 */

export default function Home() {
  return (
    <main>
      <section>
        <TagsHeader />
      </section>
      <section>
        <h2>Recomendações</h2>
        <RenderRecommended />
      </section>
      <section>
        <h2>Refeições prontas</h2>
        <RenderSection category="meals" />
      </section>

      <section>
        <h2>Bebidas</h2>
        <RenderSection category="drinks" />
      </section>
      <section>
        <h2>Sobremesas</h2>
        <RenderSection category="desserts" />
      </section>
      <section>
        <h2>Porções</h2>
        <RenderSection category="portions" />
      </section>
    </main>
  );
}
