import 'react-app-polyfill/ie11';
import React, { useState } from "react";
import * as ReactDOM from 'react-dom';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

interface Values {
  url: string;
}

const App = () => {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState<any>()


  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    // 👇 encode the data to application/x-www-form-urlencoded type
    const formData = new URLSearchParams();
    formData.append("url", url);
    // 👇 call backend endpoint using fetch API
    fetch("localhost:5000/api/transcribe", {
      body: formData.toString(),
      method: "post",
      headers: {
        "content-type": "application/json",
      },
    }).then(async (result) => {
      // 👇 modify the state to show the result
      setResult(await result.json());
    });
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
        <Typography component="h1" variant="h5">
          Transcribe & Summarize
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="url"
              label="YouTube URL"
              name="url"
              autoComplete="url"
              autoFocus
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Transcribe
            </Button>

            Result
      <pre>{JSON.stringify(result, null, 4)}</pre>
        </Box>
      </Box>
    </Container>
  );
};


export default App;
