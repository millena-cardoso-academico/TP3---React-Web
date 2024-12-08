import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import ContainerComponent from '../components/ContainerComponent';
import BoxComponent from '../components/BoxComponent';
import TypographyComponent from '../components/TypographyComponent';
import TextFieldComponent from '../components/TextFieldComponent';
import CustomButton from '../components/CustomButton';
import LogoComponent from '../components/LogoComponent';
import { useAppContext } from '../Context';

const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const { supabase, showSnackMessage } = useAppContext();

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');

  const handleSignUp = async (event: React.FormEvent) => {
    event.preventDefault();

    if (senha !== confirmarSenha) {
      showSnackMessage('As senhas não coincidem');
      return;
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password: senha,
      options: {
        data: {
          nome,
        },
      },
    });

    if (error) {
      showSnackMessage(error.message);
    } else {
      // Registro bem-sucedido
      navigate('/signin');
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
          Registrar
        </TypographyComponent>
        <form onSubmit={handleSignUp}>
          <TextFieldComponent
            margin="normal"
            required
            fullWidth
            id="nome"
            label="Nome"
            name="nome"
            autoComplete="name"
            autoFocus
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
          <TextFieldComponent
            margin="normal"
            required
            fullWidth
            id="email"
            label="Endereço de Email"
            name="email"
            autoComplete="email"
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
            autoComplete="new-password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
          <TextFieldComponent
            margin="normal"
            required
            fullWidth
            name="confirmarSenha"
            label="Confirmar Senha"
            type="password"
            id="confirmarSenha"
            autoComplete="new-password"
            value={confirmarSenha}
            onChange={(e) => setConfirmarSenha(e.target.value)}
          />
          <CustomButton
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
          >
            Registrar
          </CustomButton>
        </form>
        <BoxComponent sx={{ mt: 2 }}>
          <TypographyComponent variant="body2" sx={{ color: 'black' }}>
            Já tem uma conta? <Link to="/signin">Entre</Link>
          </TypographyComponent>
        </BoxComponent>
      </BoxComponent>
    </ContainerComponent>
  );
};

export default SignUp;
