import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import { login } from "../actions/auth";
import { useDispatch,useSelector } from "react-redux";
import { addUser } from "../redux/userSlice";
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

const FormLogin = () => {
  const initialState = {
    username: "",
    pass: "",
  };
  const [username, setUsername] = useState(initialState.username);
  const [password, setPassword] = useState(initialState.pass);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const submitLogin = async (e) => {
    e.preventDefault();
    const formData = {
      user: username,
      pass: password,
    };
    const response = await login(formData);
    if(response.ok){
      localStorage.setItem("token", response.info.token);
      dispatch(addUser(response.info))
      navigate('/')
    }else{
      toast.error('VERIFIQUE SUS CREDENCIALES ')
    }
  };
  return (
    <Form onSubmit={submitLogin}>
      <ToastContainer 
      autoClose={2000}
      />
      <Form.Group className="mb-4" controlId="exampleForm.ControlInput1">
        <Form.Label className="fw-bold">Usuario</Form.Label>
        <Form.Control
          type="text"
          placeholder="admin"
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          value={username}
        />
      </Form.Group>
      <Form.Group className="mb-4" controlId="exampleForm.ControlTextarea1">
        <Form.Label className="fw-bold">Contraseña</Form.Label>
        <Form.Control
          type="password"
          placeholder="***********"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          value={password}
        />
      </Form.Group>
      <Button
        variant="primary"
        type="submit"
        className="fw-bold"
        style={{ width: "100%" }}
        size="lg"
      >
        INGRESAR
      </Button>
    </Form>
  );
};

export default FormLogin;
