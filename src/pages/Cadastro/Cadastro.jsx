import { Container, ContainerCadastro } from "./style";
import logo from "../../assets/logo_header.png";
import { AlertMessage } from "../../global/components/AlertMessage";
import axios from "axios";
import { useState } from "react";

export function Cadastro() {
  var signupResponse = []; // retorno do cadastro
  const [signupResponseError, setResponseError] = useState()
  const [verify, setVerify] = useState(false)

  var newUser = {
    username: "",
    email: "",
    password: "",
    role: ["user"],
  };

  var newClient = {
    nome_completo: "",
    email: "",
    cpf: "",
    telefone: "",
    data_nascimento: "",
  };

  async function signUp() {
    await axios
      .post(
        "https://trabalho-api-production.up.railway.app/auth/signup",
        newUser
      )
      .then((response) => {
        signupResponse = response;
      })
      .catch((error) => {
        setResponseError(error.response.data.message)
      });

    if (signupResponse.status == 200) {
      await axios.post(
        "https://trabalho-api-production.up.railway.app/clientes",
        newClient
      );
      setVerify(true)
    }
    // tratar mensagens de erro
  }

  return (
    <Container>
      <a href="/">
        <img src={logo} alt="logo" />
      </a>
      <ContainerCadastro>
        <h4>Cadastro</h4>

        <form onSubmit={(e) => {
          e.preventDefault()
        }}>
          <input type="text" id="name" name="name" placeholder="Nome" required></input>
          <input type="text" id="user" name="user" placeholder="Usuário" required></input>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Senha (mínimo 8 dígitos)"
            required
          ></input>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            required
          ></input>
          <input
            type="text"
            id="cpf"
            name="cpf"
            placeholder="CPF"
            required
          ></input>
          <input
            type="tel"
            id="tel"
            name="tel"
            placeholder="Telefone"
            required
          ></input>
          <input
            type="date"
            id="date"
            name="date"
            placeholder="Data de Nascimento"
            required
          ></input>

          <button type="submit"
            onClick={() => {
              if (
                document.querySelector("#user").value != "" &&
                document.querySelector("#password").value != "" &&
                document.querySelector("#email").value != "" &&
                document.querySelector("#name").value != "" &&
                document.querySelector("#cpf").value != "" &&
                document.querySelector("#tel").value != "" &&
                document.querySelector("#date").value != ""
              ) {
                newUser.password = document.querySelector("#password").value;
                newUser.username = document.querySelector("#user").value;
                newUser.email = document.querySelector("#email").value;

                newClient.nome_completo = document.querySelector("#name").value;
                newClient.cpf = document.querySelector("#cpf").value;
                newClient.data_nascimento = document.querySelector("#date").value;
                newClient.email = document.querySelector("#email").value;
                newClient.telefone = document.querySelector("#tel").value;

                signUp();
              }
            }}
          >
            Cadastrar
          </button>
          <br />
          {
          signupResponseError != null ? (
            <AlertMessage type="error" message={signupResponseError}/>
          ) : (
            null
          )
        }
        {
          verify ? (
            <AlertMessage type="success" message="Conta cadastrada com sucesso!"/>
          ) : (
            null
          )
        }
        </form>
        <a href="/login">Fazer login</a>
      </ContainerCadastro>
    </Container>
  );
}