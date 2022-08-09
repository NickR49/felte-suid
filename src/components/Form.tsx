import { Component, createEffect, createSignal, Show } from "solid-js";
import { createForm } from "@felte/solid";
import Button from "@suid/material/Button";
import TextField from "@suid/material/TextField";
import Box from "@suid/material/Box";
import * as yup from "yup";
import { validator } from "@felte/validator-yup";
import Typography from "@suid/material/Typography";

// Setting validation messages
yup.setLocale({
  mixed: {
    default: "Not valid",
    required: "Required field",
  },
  string: {
    email: "Must be a valid email",
    min: "Must be longer",
  },
});

// Creating yup schema
const schema = yup.object({
  email: yup.string().email().required(),
  password1: yup.string().required().min(10),
  password2: yup.string().required().min(10),
});

// interface FormData {
//   email: string;
//   password1: string;
//   password2: string;
// }

type FormData = yup.InferType<typeof schema>;

const Form: Component = () => {
  const [submitted, setSubmitted] = createSignal<FormData>();

  const { form, data, errors } = createForm<FormData>({
    initialValues: {
      email: "",
      password1: "",
      password2: "",
    },
    onSubmit: (values) => setSubmitted(values),
    extend: [validator({ schema })],
  });

  //   createEffect(() => {
  //     console.log(data());
  //   });

  const passwordMessage = () =>
    data(($data) => {
      const passwordLength = $data.password1.length;
      if (passwordLength === 0) return "";
      if (passwordLength >= 8) return "Your password is secure";
      return "Your password is not secure";
    });

  return (
    <>
      <form ref={form}>
        <Box sx={{ display: "flex", flexDirection: "column", rowGap: 1 }}>
          <TextField
            id="email"
            name="email"
            label="Email"
            variant="standard"
            error={!!errors().email}
            helperText={errors().email ? errors().email[0] : undefined}
          />
          <TextField
            id="password1"
            name="password1"
            label="Enter Password"
            variant="standard"
            type="password"
            error={!!errors().password1}
            helperText={errors().password1 ? errors().password1[0] : undefined}
          />
          <TextField
            id="password2"
            name="password2"
            label="Repeat Password"
            variant="standard"
            type="password"
            error={!!errors().password1}
            helperText={errors().password2 ? errors().password2[0] : undefined}
          />
          <Button variant="contained" type="submit">
            Sign in
          </Button>
        </Box>
      </form>
      <br />
      <Typography>Current data shape</Typography>
      <Typography>{JSON.stringify(data(), null, 2)}</Typography>
      <Typography>Current errors</Typography>
      <Typography>{JSON.stringify(errors(), null, 2)}</Typography>
      <Show when={submitted()}>
        <Typography>Submitted data</Typography>
        <Typography>{JSON.stringify(submitted(), null, 2)}</Typography>
      </Show>
    </>
  );
};

export default Form;
