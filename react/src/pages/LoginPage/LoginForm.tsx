import { ReactEventHandler, useRef } from "react";
import { Form, /*useActionData,*/ useNavigation } from "react-router-dom";
import { /*useSelector,*/ useDispatch } from "react-redux";

import { authActions } from "../../store/auth.slice";

import classes from "./LoginForm.module.css";

export default function LoginForm() {
  // const data = useActionData();
  const email = useRef();
  const password = useRef();

  const navigation = useNavigation();
  const dispatch = useDispatch();
  
  const isSubmitting = navigation.state === 'submitting';

  function handleSubmit(event:React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log(email.current.value, password.current.value);
  }

  function handleCancel() {
    dispatch(authActions.cancelLogin());
  }

  return <>
    <Form method="post" className={classes.form} onSubmit={handleSubmit}>

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
        <input 
          id="email" 
          type="email" 
          name="email" 
          ref={email} 
          required 
        />
      </p>
      <p>
        <label htmlFor="image" className={classes.input}>Password</label>
        <input 
          id="password" 
          type="password" 
          name="password" 
          ref={password} 
          required 
        />
      </p>

      <div className={classes.actions}>
        <button type="button" className="flat" disabled={isSubmitting} onClick={handleCancel}>
          Cancel
        </button>
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Logging in...' : 'Login'}
        </button>
      </div>
    </Form>
  </>;
}