export const APP_ROUTES = {
  private: {
    cadastrar: { name: '/cadastrar' },
    editar: { name: '/editar' },
    dashboard: { name: '/dashboard' },
  },

  public: {
    home: '/',
    sacola: '/sacola',
    produto: '/produto/[id]',
    buscar: '/buscar',
    login: '/login',
    refeicao: '/refeicoes',
    sobremesas: '/sobremesas',
    porcao: '/porcao',
    bebidas: '/bebidas',
  },
};
