import "react-app-polyfill/ie11";
import React, { useState } from "react";
import * as ReactDOM from "react-dom";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import "./App.css";

interface Values {
  url: string;
}

const App = () => {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState<any>();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    e.preventDefault();
    // 👇 call backend endpoint using fetch API
    setLoading(true);
    fetch("http://127.0.0.1:5000/api/transcribe", {
      body: JSON.stringify({ url: url }),
      method: "post",
      headers: {
        "content-type": "application/json",
      },
    }).then(async (result) => {
      // 👇 modify the state to show the result
      const resp = await result.json();
      setResult(resp.transcript);
      setLoading(false);
    });
  };

  const handleChange = (event: any) => {
    setUrl(event.target.value);
  };

  return (
    <Container component="main" maxWidth="xs">
      {loading ? (
        <Box>
          <div className="spinner"></div>
        </Box>
      ) : (
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Transcribe & Summarize
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="url"
              label="YouTube URL"
              name="url"
              autoComplete="url"
              autoFocus
              onChange={handleChange}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Transcribe
            </Button>
          </Box>
          <Typography component="h5" variant="h5">
            Transcript
          </Typography>
          <Box sx={{ mt: 3, mb: 2, width: "75%" }}>{result}</Box>
        </Box>
      )}
    </Container>
  );
};

export default App;
