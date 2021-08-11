const btnSubmit = document.querySelector("#btn");
const form = document.querySelector("#form");

class ValidaFormulario {
  constructor() {
    this.form = form;
    this.eventos();
  }

  eventos() {
    this.form.addEventListener("submit", (event) => {
      this.handleSubmit(event);
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const camposValidos = this.camposSaoValidos();
    const senhasValidas = this.senhasSaoValidas();

    if (camposValidos && senhasValidas) {
      console.log("Formulario enviado");
      this.form.submit();
    }
  }

  senhasSaoValidas(event) {
    let valid = true;

    const senha = this.form.querySelector(".senha");
    const repetirSenha = this.form.querySelector(".repetir-senha");

    if (senha.value !== repetirSenha.value) {
      valid = false;
      this.criaErro(senha, "Campos senha e repetir senha precisam ser iguais");
      this.criaErro(
        repetirSenha,
        "Campos senha e repetir senha precisam ser iguais"
      );
    }

    if (senha.value.length < 6 || senha.value.length > 12) {
      valid = false;
      this.criaErro(senha, "Senha precisa estar entre 6 e 12 caracteres");
    }
  }

  camposSaoValidos() {
    let valid = true;

    for (let errorText of this.form.querySelectorAll(".error-text")) {
      errorText.remove();
    }

    for (let campo of this.form.querySelectorAll(".input")) {
      const label = campo.previousElementSibling.innerHTML;

      if (!campo.value) {
        this.criaErro(campo, `${label} não pode estar em branco`);
        valid = false;
      }

      if (campo.classList.contains("cpf")) {
        if (!this.validaCPF(campo)) valid = false;
      }
      if (campo.classList.contains("usuario")) {
        if (!this.validaUsuario(campo)) valid = false;
      }
    }

    return valid;
  }

  validaUsuario(campo) {
    const usuario = campo.value;
    let valid = true;

    if (usuario.length < 3 || usuario.length > 12) {
      this.criaErro(campo, "Usuario precisa ter entre 3 e 12 caracteres");
      valid = false;
    }

    if (!usuario.match(/^[a-zA-Z0-9]+$/g)) {
      this.criaErro(
        campo,
        "Nome de usario precisa conter apenas letras e/ou numeros"
      );
      valid = false;
    }

    return true;
  }

  validaCPF(campo) {
    const cpf = new ValidaCPF(campo.value);

    if (!cpf.valida()) {
      this.criaErro(campo, "CPF Invalido");
      return false;
    }

    return true;
  }

  criaErro(campo, msg) {
    const div = document.createElement("div");
    div.innerHTML = msg;
    div.classList.add("error-text");
    campo.insertAdjacentElement("afterend", div);
  }
}

const valida = new ValidaFormulario();

btnSubmit.addEventListener("mouseover", () => {
  btnSubmit.style.color = "white";
});

btnSubmit.addEventListener("mouseout", () => {
  btnSubmit.style.color = "black";
});

document.addEventListener("click", (event) => {
  const element = event.target;
  if (element.classList.contains("input")) {
    element.style.backgroundColor = "purple";
  }
});

document.addEventListener("mouseout", (event) => {
  const element = event.target;
  if (element.classList.contains("input")) {
    element.style.backgroundColor = "rgb(243, 114, 135)";
  }
});
