
import TagsHeader from '@/Components/section-nav-tags/RenderTags'
import SearchBar from '@/Components/section-header/SearchBar'
import RecommendationCards from '@/Components/section-recomendações/RecommendationCards'
import Meals from '@/Components/Section-refeições-prontas/render-meals';

import './style-page.css'

/**
 * Salvar os dados no SessionStorage para evitar fetch denecessário.
 * Criar um card reutilizável 
 */

export default async function Home() {

  return (
    <main className='main'>
      <header>
        <SearchBar />
      </header>
      <TagsHeader />
      <section id='recommendation'>
        <h2>Recomendações do chefe</h2>
        <RecommendationCards />
      </section>
      <section id='meals'>
        <h2>Refeições prontas</h2>
        <Meals />
      </section>
      <section></section>
      <section></section>
      <section></section>
    </main>
  )
}
