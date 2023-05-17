import { useState } from "react";
import { FormControl, TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import "./Interaction.css";
import api from "../common/api";

function Interaction() {
  const [inputText, setInputText] = useState("");
  const [questionResponse, setQuestionResponse] = useState("Chat gpt response");
  const [isSubmitButtonLoading, setSubmitButtonLoading] = useState(false);

  const handleAskQuestion = async (question: string) => {
    const data = { question };
    const response = await api.openAI.askQuestion(data);
    setSubmitButtonLoading(false);
    setQuestionResponse(response.data.data);
  };

  return (
    <>
      <div className="form-question">
        <FormControl className="form-control">
          <TextField
            className="text-field-width"
            type="text"
            variant="outlined"
            placeholder="Enter your question here"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
          <br />
          <LoadingButton
            variant="contained"
            size="medium"
            loading={isSubmitButtonLoading}
            onClick={() => {
              setSubmitButtonLoading(true);
              handleAskQuestion(inputText);
            }}
          >
            Submit
          </LoadingButton>
        </FormControl>
      </div>

      <div>
        <TextField
          className="text-field-width"
          type="text"
          multiline
          rows={4}
          disabled
          value={questionResponse}
        />
      </div>
    </>
  );
}

export default Interaction;
