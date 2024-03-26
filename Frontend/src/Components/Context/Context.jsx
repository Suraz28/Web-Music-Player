import React, {useContext, createContext, useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const FormContext = createContext();

export const FormProvider = ({children}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [ispasswordVisible, setIsPasswordVisible] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [Data, setData] = useState([]);
  const [loginmessage, setLoginMessage] = useState("");
  const [signupmessage, setSignupMessage] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();


  const RevokeLogin = () => {
    if (!name || !password) {
      setLoginMessage(<p style={{ color:"#ef4444", marginBottom:"1rem", fontSize:"15px" }}>Empty Inputs</p>);
      setTimeout(() => {
        setLoginMessage('');
      }, 3000);
      return;
    }

    axios.post('http://localhost:8081/login', { name, password })
  .then(res => {
    if (res.data === "Success") {
      setLoginMessage(<p style={{ color:"#4299e1", marginBottom:"1rem", fontSize:"15px" }}>Logging in...</p>);
      setName('');
      setPassword('');
      setCurrentUser({ name, email, password });
      setTimeout(() => {
        setLoginMessage('');
        navigate("/explore");
      }, 3000);
    } else {
      setLoginMessage(<p style={{ color:"#ef4444", marginBottom:"1rem", fontSize:"15px" }}>Details not matched</p>);
      setTimeout(() => {
        setLoginMessage('');
      }, 3000);
    }
  })
  .catch(err => {
    console.error(err);
    setLoginMessage(<p style={{ color:"#ef4444", marginBottom:"1rem", fontSize:"15px" }}>Login Failed</p>);
    setTimeout(() => {
      setLoginMessage('');
    }, 3000);
  });
  };

  const NewAccount = (e) => {

    if(name !== "" && email !== "" && password !== ""){
      if (password.length >= 8) {
        if (!isChecked) {
          e.preventDefault();
          setSignupMessage(<p style={{color:"#ef4444", marginBottom:"1rem", fontSize:"15px" }}>Agree to terms & conditions</p>);
          setTimeout(() => {
            setSignupMessage("");
          }, 3000);
        }else{
          setSignupMessage(<p style={{color: "#4299e1", marginBottom:"1rem", fontSize:"15px"}}>Account Created. Login Now</p>);
          setTimeout(() => {
            setSignupMessage("");
          }, 3000);
        };
      } else {
        e.preventDefault();
        setSignupMessage(<p style={{color:"#ef4444", marginBottom:"1rem", fontSize:"15px" }}>Password must be at least 8 characters long</p>);
        setTimeout(() => {
          setSignupMessage("");
        }, 3000);
      }
    }
    else if(name == "" || email == "" || password == ""){
      setSignupMessage(<p style={{color:"#ef4444", marginBottom:"1rem", fontSize:"15px" }}>Empty Input</p>);
      setTimeout(()=> {
        setSignupMessage("");
      },3000);
    }
  };

  const handleFields = () => {
    setName("");
    setEmail("");
    setPassword("");
  }

  const handleSignUp = (e) => {
    e.preventDefault();
    const newData = 
      {name: name.toLowerCase(),
      email: email,
      password: password,
    };
  setData(prevData => [...prevData, newData]);
  setIsChecked(false);
  if(name !== "" && email !== "" && password !== ""){
    axios.post('http://localhost:8081/signup', newData)
    .then(res => console.log(res))
    .catch(err => console.log(err));
  };
  setName('');
  setPassword('');
  setEmail('');
  console.log("Account Created:", {name: name, email: email, password: password });

};

  const Toggle = () => {
    setIsPasswordVisible(!ispasswordVisible);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsChecked(false);
    handleFields();
  };

  const ContextValue = {currentUser, name, setName, email, setEmail, password, setPassword, ispasswordVisible, setIsPasswordVisible, Toggle, handleSubmit, handleFields, isChecked, setIsChecked, Data, setData, handleSignUp, loginmessage, setLoginMessage, signupmessage, RevokeLogin, NewAccount};

  return(
    <FormContext.Provider value={ContextValue}>
        {children}
    </FormContext.Provider>
  );
};

export const useFormContext = () => useContext(FormContext);