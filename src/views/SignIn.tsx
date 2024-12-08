import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import ContainerComponent from '../components/ContainerComponent';
import BoxComponent from '../components/BoxComponent';
import TypographyComponent from '../components/TypographyComponent';
import TextFieldComponent from '../components/TextFieldComponent';
import CustomButton from '../components/CustomButton';
import SnackBarComponent from '../components/SnackBarComponent';
import LogoComponent from '../components/LogoComponent';
import { useAppContext } from '../Context';

const SignIn: React.FC = () => {
  const navigate = useNavigate();
  const { supabase, showSnackMessage } = useAppContext();

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleSignIn = async (event: React.FormEvent) => {
    event.preventDefault();

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password: senha,
    });

    if (error) {
      showSnackMessage(error.message);
    } else {
      // Autenticação bem-sucedida
      localStorage.setItem('session', JSON.stringify(data.session));
      localStorage.setItem('user', JSON.stringify(data.user));
      navigate('/');
    }
  };

  return (
    <ContainerComponent maxWidth="xs">
      <BoxComponent
        sx={{
          paddingTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <LogoComponent />
        <TypographyComponent component="h1" variant="h5" sx={{ color: 'black' }}>
          Entrar
        </TypographyComponent>
        <form onSubmit={handleSignIn}>
          <TextFieldComponent
            margin="normal"
            required
            fullWidth
            id="email"
            label="Endereço de Email"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextFieldComponent
            margin="normal"
            required
            fullWidth
            name="senha"
            label="Senha"
            type="password"
            id="senha"
            autoComplete="current-password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
          <CustomButton
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
          >
            Entrar
          </CustomButton>
        </form>
        <BoxComponent sx={{ mt: 2 }}>
          <TypographyComponent variant="body2" sx={{ color: 'black' }}>
            Não tem uma conta? <Link to="/signup">Registre-se</Link>
          </TypographyComponent>
        </BoxComponent>
      </BoxComponent>
    </ContainerComponent>
  );
};

export default SignIn;
