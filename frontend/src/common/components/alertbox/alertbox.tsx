import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
export default function AlertBox(props: any) {
  return (
    <Stack
      className="stack"
      sx={{
        width: "39%",
        position: "fixed",
        bottom: "0",
        marginBottom: "5%",
        left: "50%",
        transform: "translate(-50%)",
        color: "red",
      }}
      spacing={2}
    >
      <Alert severity="error">
        {" "}
        <strong> {props.message}</strong>
      </Alert>
    </Stack>
  );
}
