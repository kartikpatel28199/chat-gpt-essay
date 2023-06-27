import { useState } from "react";
import { FormControl, TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import "./Interaction.css";
import api from "../../common/api";
import AlertBox from "../../common/components/alertbox/alertbox";

function Interaction() {
  const [inputText, setInputText] = useState("");
  const [questionResponse, setQuestionResponse] = useState("Chat gpt response");
  const [isSubmitButtonLoading, setSubmitButtonLoading] = useState(false);
  const [showAlertBox, setShowAlertBox] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleAskQuestion = async (question: string) => {
    const data = { question };
    const response = await api.openAI.askQuestion(data);
    setSubmitButtonLoading(false);
    if (response.data.error) {
      setErrorMessage(response.data.error.message);
      setShowAlertBox(true);
      setTimeout(() => {
        setShowAlertBox(false);
        setErrorMessage("");
      }, 3000);
    }
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

      <div>{showAlertBox && <AlertBox message={errorMessage} />}</div>
    </>
  );
}

export default Interaction;
