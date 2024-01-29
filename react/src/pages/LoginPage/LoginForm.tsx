import { useRef } from "react";
import { Form } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { authActions } from "../../store/auth.slice";
import { RootState } from '../../store';

import classes from "./LoginForm.module.css";

export default function LoginForm() {
  const dispatch = useDispatch();
  const authState = useSelector((state:RootState) => state.auth);
 
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  
  function handleSubmit(event:React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const email = emailRef.current?.value || '';
    const password = passwordRef.current?.value || '';
    dispatch(authActions.tryLogin({email, password}));
  }

  function handleCancel() {
    dispatch(authActions.cancelLogin());
  }

  return <>
    <Form method="post" className={classes.form} onSubmit={handleSubmit} >
      <p>
        <label htmlFor="email" className={classes.input}>Email</label>
        <input 
          id="email" 
          type="email" 
          name="email" 
          ref={emailRef} 
          disabled={authState.status==='submitting'} 
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
          disabled={authState.status==='submitting'} 
          required 
        />
      </p>
      
      {authState.message && 
        <p className={classes.err}>
          {authState.message}
        </p>
      }

      <p className={classes.actions}>
        <button type="button" className="flat" disabled={authState.status==='submitting'} onClick={handleCancel}>
          Cancel
        </button>
        <button type="submit" disabled={authState.status==='submitting'}>
          {authState.status==='submitting' ? 'Logging in...' : 'Login'}
        </button>
      </p>
    </Form>
  </>;
}