import { Redirect, Route, Switch } from "react-router-dom";
import Login from "./Login";

const PublicRoute = () => {
  return (
    <Switch>
      <Route path="/login" component={Login} exact />
      <Redirect to="/login" />
    </Switch>
  );
};

export default PublicRoute;
