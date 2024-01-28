import { Form, /*useActionData,*/ useNavigation } from "react-router-dom";
import { /*useSelector,*/ useDispatch } from "react-redux";

import { authActions } from "../../store/auth.slice";

import classes from "./LoginForm.module.css";

export default function LoginForm() {
  // const data = useActionData();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  
  const isSubmitting = navigation.state === 'submitting';

  function handleCancelLogin() {
    dispatch(authActions.cancelLogin());
  }

  return (
    <>
    <Form method="post" className={classes.form}>

      {/* {data?.errors && (
        <ul>
          {Object.values(data.errors).map((err) => (
            <li key={err}>{err}</li>
          ))}
        </ul>
      )}

      {data && data.message && <p>{data.message}</p>} */}

      <p>
        <label htmlFor="email" className={classes.input}>Email</label>
        <input id="email" type="email" name="email" required />
      </p>
      <p>
        <label htmlFor="image" className={classes.input}>Password</label>
        <input id="password" type="password" name="password" required />
      </p>
      <div className={classes.actions}>

        <button type="button" disabled={isSubmitting} onClick={handleCancelLogin}>
          Cancel
        </button>

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Logging in...' : 'Login'}
        </button>

      </div>
    </Form>
  </>
  );
}