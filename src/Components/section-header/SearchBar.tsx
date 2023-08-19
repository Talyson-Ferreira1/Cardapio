
import './style-searchBar.css'

export default function SearchBar(){
    return(
       <div className='container-main-input'> 
          <div className='container-logo'>
            <img src='images/Delicias_da_cenir.png' alt='Logotipo' />
          </div>

          <label htmlFor="search">

            <img
              src="icons/lupa.svg" 
              alt='icon search' 
              className='img-lupa'       
              />

            <input 
              type='text' 
              name='search'
              title='Pesquisar prato' 
              alt='input search product' 
              placeholder='Pesquise aqui'
              /> 
          </label>
        </div>
    )
}