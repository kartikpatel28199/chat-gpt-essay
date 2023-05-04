import React from "react";
import { Button, FormControl, TextField } from "@mui/material";
import "./Interaction.css";

function Interaction() {
  return (
    <>
      <div className="form-question">
        <FormControl className="form-control">
          <TextField
            className="text-field-width"
            type="text"
            variant="outlined"
            placeholder="Enter your question here"
          />
          <br />
          <Button variant="contained" size="medium">
            Submit
          </Button>
        </FormControl>
      </div>

      <div>
        <TextField
          className="text-field-width"
          type="text"
          multiline
          rows={3}
          defaultValue="Chat gpt response"
          disabled
        />
      </div>
    </>
  );
}

export default Interaction;
