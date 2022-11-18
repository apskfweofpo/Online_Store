import { observable } from "mobx";
import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import {BrowserRouter} from "react-router-dom";
import { Context } from "./index";
import AppRouter from "./components/AppRouter";
import NavBar from "./components/NavBar";
import {check} from "./http/userApi";
import { Spinner } from "react-bootstrap";

const App = observer(() => { 
  const {user} = useContext(Context)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
      check().then(data => {
        user.setUser(true)
        user.setIsAuth(true)
    })
    }, [])

  if (loading) {
    return <Spinner animation={"grow"}/>
  }

  return (
    <BrowserRouter>
        <NavBar />
        <AppRouter/>
    </BrowserRouter>
  );
})

export default App;
