import React from "react";
import Button from "@material-ui/core/Button";
import { Link as RouterLink } from "react-router-dom";

function LandingPage() {
  return (
      <div className="App">
        <header className="App-header">
          <Button
            variant="contained"
            color="primary"
            disableElevation
            component={RouterLink}
            to="/login"
          >
            Go to dashboard
          </Button>
        </header>
      </div>
  );
}

export default LandingPage;
