import { useRef } from "react";
import { Form } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { authActions } from "../../store/auth.slice";
import { RootState } from '../../store';
import LoadingSpinner from "../../components/ui/LoadingSpinner";

import classes from "./LoginForm.module.css";

export default function LoginForm() {
  const dispatch = useDispatch();
  const authState = useSelector((state:RootState) => state.auth);
 
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  
  function handleSubmit(event:React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const username = usernameRef.current?.value || '';
    const password = passwordRef.current?.value || '';
    dispatch(authActions.tryLogin({username, password}));
  }

  function handleCancel() {
    dispatch(authActions.cancelLogin());
  }

  return <>
    {authState.status==='submitting' && <LoadingSpinner />}

    <Form method="post" className={classes.form} onSubmit={handleSubmit} >
      <p>
        <label htmlFor="username" className={classes.input}>Email</label>
        <input 
          id="username" 
          type="email" 
          name="username" 
          ref={usernameRef} 
          autoComplete="off"
          required 
        />
      </p>
      <p>
        <label htmlFor="image" className={classes.input}>Password</label>
        <input 
          id="password" 
          type="password" 
          name="password" 
          ref={passwordRef}  
          autoComplete="off"
          required 
        />
      </p>
      
      {authState.message && 
        <p className={classes.err}>
          {authState.message}
        </p>
      }

      <p className={classes.actions}>
        <button type="button" onClick={handleCancel}>
          Cancel
        </button>
        <button type="submit">
          Login &gt;
        </button>
      </p>
      <p>
      test@test.com / demo123$
      </p>
    </Form>
  </>;
}