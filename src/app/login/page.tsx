'use client';
import { useEffect, useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { useRouter } from 'next/navigation';

import checkIsUserAuthenticated from '@/functions/check-is-user-authenticated';
import * as Yup from 'yup';
import { LogIn, onAuthStateChange } from '@/services/authServices';
import { User } from 'firebase/auth';

import './login-style.css';

export default function Login() {
  const [user, setUser] = useState<User | null>();
  const [permissionDenied, setPermissionDenied] = useState(false);
  const router = useRouter();

  const FetchLoginUser = (data: any) => {
    LogIn(data.email, data.password)
      .then(() => {
        router.push('/dashboard');
        setPermissionDenied(false);
      })
      .catch((error) => {
        console.log(error);
        setPermissionDenied(true);
      });
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Digite um email válido')
      .required('Adicione um email válido'),
    password: Yup.string().required('A senha é obrigatória'),
  });

  useEffect(() => {
    function unSubscribe() {
      return onAuthStateChange((user) => {
        if (user) {
          setUser(user);
        } else {
          setUser(user);
        }
      });
    }

    unSubscribe();
  }, []);

  useEffect(() => {
    if (user) {
      console.log(checkIsUserAuthenticated());
    }
  });

  return (
    <main>
      <section>
        <Formik
          onSubmit={FetchLoginUser}
          validationSchema={validationSchema}
          initialValues={{
            email: '',
            password: '',
          }}
        >
          <Form>
            <h1>Entrar</h1>
            {permissionDenied && (
              <span className="error">Você não tem permissão de acesso</span>
            )}
            <label htmlFor="email">Email:</label>
            <Field
              type="email"
              name="email"
              placeholder="Digite seu email"
              required
            ></Field>
            <ErrorMessage className="error" name="email" component="div" />
            <label htmlFor="password">Senha:</label>
            <Field
              type="password"
              name="password"
              placeholder="Digite sua senha"
              required
            ></Field>
            <ErrorMessage className="error" name="password" component="div" />
            <Field type="submit" value="Logar"></Field>
          </Form>
        </Formik>
      </section>
    </main>
  );
}
