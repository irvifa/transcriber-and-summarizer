import "react-app-polyfill/ie11";
import React, { Component } from "react";
import * as ReactDOM from "react-dom";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import "./Form.css";

interface Props {}
interface State {
  url: string;
  result: string;
  loading: boolean;
}
export class Form extends Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      url: "test  ",
      result: "",
      loading: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.isLoading = this.isLoading.bind(this);
  }

  handleSubmit(e: any) {
    e.preventDefault();
    // 👇 call backend endpoint using fetch API
    this.setState({
      loading: true,
    });
    fetch("http://127.0.0.1:5000/api/transcribe", {
      body: JSON.stringify({ url: this.state.url }),
      method: "post",
      headers: {
        "content-type": "application/json",
      },
    }).then(async (result) => {
      // 👇 modify the state to show the result
      const resp = await result.json();
      this.setState({
        result: resp.transcript,
        loading: false,
      });
    });
  }

  handleChange(event: any) {
    this.setState({
      url: event.target.value,
    });
  }

  isLoading() {
    return this.state.loading;
  }

  render() {
    if (this.isLoading()) {
      return (
        <Box>
          <div className="spinner"></div>
        </Box>
      );
    }
    return (
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
          onSubmit={this.handleSubmit}
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
            onChange={this.handleChange}
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
        <Box sx={{ mt: 3, mb: 2, width: "75%" }}>{this.state.result}</Box>
      </Box>
    );
  }
}
