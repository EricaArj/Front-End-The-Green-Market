import React, { ChangeEvent, useState, useEffect } from "react";
import "./Login.css";
import { Grid, Box, Typography, TextField } from "@mui/material";
import { Button } from "@material-ui/core";
import { Link, useNavigate } from "react-router-dom";
import useLocalStorage from "react-use-localstorage";
import { UserLogin } from "../../models/UserLogin";
import { login } from "../../services/Services";

function Login() {
  const history = useNavigate();
  const [token, setToken] = useLocalStorage("token");
  const [userLogin, setUserLogin] = useState<UserLogin>({
    idUsuario: 0,
    nomeUsuario: "",
    cpfUsuario: "",
    enderecoUsuario: "",
    telefoneUsuario: "",
    cepUsuario: "",
    usuario: "",
    fotoUsuario: "",
    senhaUsuario: "",
    token: "",
  });

  function updateModel(event: ChangeEvent<HTMLInputElement>) {
    setUserLogin({
      ...userLogin,
      [event.target.name]: event.target.value,
    });
  }

  async function onSubmit(event: ChangeEvent<HTMLFormElement>) {
    event.preventDefault();
    
    try {
      await login("/usuarios/logar", userLogin, setToken);


      alert("Login realizado com sucesso!");
    } catch (error) {
      console.log(error);
      alert("Usuário ou senha inválidos.");
    }
  }
  useEffect(() => {
    console.log(userLogin);
    if (token !== "") {
      history("/home");
    }
  }, [token]);

  return (
    <Grid container direction="row" justifyContent="center" alignItems="center">
      <Grid alignItems="center" xs={6}>
        <Box padding={20}>
          <form onSubmit={onSubmit}>
            <Typography
              variant="h3"
              gutterBottom
              color="textPrimary"
              component="h3"
              align="center"
              className="textos1"
            >
              Entrar
            </Typography>
            <TextField
              value={userLogin.usuario}
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                updateModel(event)
              }
              id="usuario"
              label="usuário"
              variant="outlined"
              name="usuario"
              margin="normal"
              fullWidth
            />
            <TextField
              value={userLogin.senhaUsuario}
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                updateModel(event)
              }
              id="senha"
              label="senha"
              variant="outlined"
              name="senhaUsuario"
              margin="normal"
              type="password"
              fullWidth
            />
            <Box marginTop={2} textAlign="center">
              <Button type="submit" variant="contained" color="primary">
                Logar
              </Button>
            </Box>
          </form>
          <Box display="flex" justifyContent="center" marginTop={2}>
            <Box marginRight={2}>
              <Typography variant="subtitle1" gutterBottom align="center">
                Não tem uma conta?
              </Typography>
            </Box>

            <Link to="/cadastro">
              <Typography
                variant="subtitle1"
                gutterBottom
                align="center"
                className="textos1"
              >
                Cadaste-se
              </Typography>
            </Link>
          </Box>
        </Box>
      </Grid>
      <Grid xs={6} className="imagem"></Grid>
    </Grid>
  );
}

export default Login;