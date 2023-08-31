'use client';

import './style-page.css';
import Recommended from '@/Components/Render-recommended-components/Recommended';
import RenderSection from '@/Components/Render-section-componentes/RenderSections';
import TagsHeader from '@/Components/section-nav/RenderTags';

import './style-page.css';
/**
 * Salvar os dados no SessionStorage para evitar fetch denecessário.
 * Criar um card reutilizável
 */

export default function Home() {
  return (
    <main>
      <section id="tags">
        <TagsHeader />
      </section>
      <section id="recommendation">
        <h2>Recomendações</h2>
        <div className="container-recommendation">
          <Recommended category="recommendation" />
        </div>
      </section>
      <section id="meals">
        <h2>Refeições prontas</h2>
        <RenderSection category="meals" />
      </section>

      <section id="drinks">
        <h2>Bebidas</h2>
        <RenderSection category="drinks" />
      </section>
      <section id="desserts">
        <h2>Sobremesas</h2>
        <RenderSection category="desserts" />
      </section>
      <section id="portions">
        <h2>Porções</h2>
        <RenderSection category="portions" />
      </section>
    </main>
  );
}
