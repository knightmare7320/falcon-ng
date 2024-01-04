import { Form, useActionData, useNavigation } from "react-router-dom";

import classes from "./LoginForm.module.css";

export default function LoginForm() {
  const data = useActionData();
  const navigation = useNavigation();
  
  const isSubmitting = navigation.state === 'submitting';

  return (
    <>
    <Form method="post" className={classes.form}>
      <h1>Log in</h1>

      {data?.errors && (
        <ul>
          {Object.values(data.errors).map((err) => (
            <li key={err}>{err}</li>
          ))}
        </ul>
      )}

      {data && data.message && <p>{data.message}</p>}

      <p>
        <label htmlFor="email">Email</label>
        <input id="email" type="email" name="email" required />
      </p>
      <p>
        <label htmlFor="image">Password</label>
        <input id="password" type="password" name="password" required />
      </p>
      <div className={classes.actions}>
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Logging in...' : 'Login'}
        </button>
      </div>
    </Form>
  </>
  );
}