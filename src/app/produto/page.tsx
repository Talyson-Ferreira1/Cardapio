'use client';
import TagsHeader from '@/Components/section-nav-tags/RenderTags';
import RenderSection from '@/Components/Render-section-componentes/RenderSections';
import RenderRecommended from '@/Components/Recommended-components/RenderRecommended';

import './style-products.css';

export default function Products() {
  return (
    <main>
      <section>
        <TagsHeader />
      </section>
      <section id="Recomended">
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
