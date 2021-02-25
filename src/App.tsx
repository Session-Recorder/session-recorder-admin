import React from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import WebsitesPage from "pages/WebsitesPage";
import WebsitePage from "pages/WebsitePage";
import NewWebsitePage from "pages/NewWebsitePage";
import SessionPage from "pages/SessionPage";

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route path="/sessions/:id">
            <SessionPage />
          </Route>
          <Route path="/websites" exact>
            <WebsitesPage />
          </Route>
          <Route path="/websites-new" exact>
            <NewWebsitePage />
          </Route>
          <Route path="/websites/:id">
            <WebsitePage />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
