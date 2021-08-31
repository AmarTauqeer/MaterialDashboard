import "./App.css";
import { BrowserRouter as Router, Redirect, Route } from "react-router-dom";
import Home from "./pages/Home";
import CssBaseline from "@material-ui/core/CssBaseline";
import Navbar from "./components/Navbar";
import Contact from "./pages/Contact";
import { Grid } from "@material-ui/core";
import Sidebar from "./components/Sidebar";
import CategoryList from "./pages/category/CategoryList";
import Register from "./pages/authentication/Register";
import Login from "./pages/authentication/Login";
import BasicTable from "./pages/category/BasicTable";
import AddCategory from "./pages/category/AddCategory";

import "react-toastify/dist/ReactToastify.css";
import EditCategory from "./pages/category/EditCategory";

import { Link, useHistory } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import {
  removeSelectedUser,
  setUser,
} from "./components/redux/actions/userActions";

function App() {
  const user_name = useSelector((state) => state.allUsers.users.user_name);
  const history = useHistory();

  return (
    <>
      <Router>
        <CssBaseline />
        <Navbar />

        <Grid container>
          <Grid items xs={2} sm={2} md={2}>
            <Sidebar />
          </Grid>

          <Grid items xs={10} sm={8} md={10}>
            <Route path="/" exact component={Home} />
            <Route path="/contact" exact component={Contact} />

            {user_name ? (
              <div>
                <Route path="/category" exact component={CategoryList} />
                <Route path="/add-category" exact component={AddCategory} />
                <Route
                  path="/edit-category/:id"
                  exact
                  component={EditCategory}
                />
              </div>
            ) : (
              <Redirect to="/login" />
            )}

            <Route path="/register" exact component={Register} />
            <Route path="/login" exact component={Login} />
            <Route path="/table" exact component={BasicTable} />
          </Grid>
        </Grid>
      </Router>
    </>
  );
}

export default App;
