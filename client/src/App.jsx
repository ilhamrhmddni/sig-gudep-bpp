// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import UserPage from "./pages/userPage"; // Pastikan path sesuai
import EditUserPage from "./pages/editUserPage"; // Jika ada halaman edit user
import AddUserPage from "./pages/addUserPage"; // Jika ada halaman tambah user

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/users" exact component={UserPage} />
        <Route path="/edit-user/:id" component={EditUserPage} />
        <Route path="/add-user" component={AddUserPage} />
      </Switch>
    </Router>
  );
}

export default App;
