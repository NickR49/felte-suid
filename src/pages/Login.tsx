import { Component } from "solid-js";
import Form from "../components/Form";

const Login: Component = () => {
  const bob = 3;

  return (
    <div>
      <h1>Login Page</h1>
      <div>
        <p>
          This uses the SUID library for Material Components and Felte for
          forms.
        </p>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Maiores
          deserunt neque ad nihil! Ut fugit mollitia voluptatum eaque. Impedit
          repudiandae aut eveniet eum. Nisi, quisquam enim ut, illo ipsum unde
          error a voluptates nobis, corporis mollitia aliquam magnam. Ipsam
          veniam molestias soluta quae fugiat ipsum maiores laboriosam impedit
          minus quisquam!
        </p>
      </div>
      <div
        style={{
          display: "flex",
          "flex-direction": "column",
          width: "400px",
          "margin-left": "auto",
          "margin-right": "auto",
        }}
      >
        <Form />
      </div>
    </div>
  );
};

export default Login;
