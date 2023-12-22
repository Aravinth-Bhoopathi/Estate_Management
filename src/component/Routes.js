import { Redirect, Route, Switch } from "react-router-dom";
import Dashboard from "./Dashboard";
import Properties from "./Properties";
import AddProperty from "./AddProperty";

const Routes = () => {
  return (
    <Switch>
      <Route path="/dashboard" component={Dashboard} exact />
      <Route path="/properties" component={Properties} exact />
      <Route path="/properties/add" component={AddProperty} exact />
      <Route path="/properties/edit/:id" component={AddProperty} exact />
      <Redirect to="/dashboard" />
    </Switch>
  );
};

export default Routes;
