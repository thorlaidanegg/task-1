import React, { Component } from 'react';
import { fetchData } from './api';
import CircularProgress from '@mui/material/CircularProgress';
import { Container, Typography, Card, FormControl, Radio, FormControlLabel, Button } from '@mui/material';
import './app.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      choice: [],
      feedback: [],
      selectedChoices: {},
      loading: true,
    };
  }

  componentDidMount() {
    this.getChoices();
    this.getFeedback();
  }

  getChoices = () => {
    fetchData().then((data) =>
      this.setState({ choice: data.choices[0], loading: false })
    );
  };

  getFeedback = () => {
    fetchData().then((data) =>
      this.setState({ feedback: data.feedbackQuestions, loading: false })
    );
  };

  handleChoiceChange = (questionIndex, choice) => {
    this.setState((prevState) => ({
      selectedChoices: {
        ...prevState.selectedChoices,
        [this.state.feedback[questionIndex]]: choice,
      },
    }));
  };

  handleSubmit = () => {
    const feedbackData = {
      feedback: {
        questions: Object.values(this.state.feedback),
        choices: Object.values(this.state.selectedChoices),
      },
    };
    console.log('Formatted Feedback Data:', feedbackData);
  };

  render() {
    return (
      <Container>
        {this.state.loading ? (
          <div className="loader-container">
            <CircularProgress />
          </div>
        ) : (
          <div>
            <Typography variant="h1" align="center" gutterBottom>
              Feedback Form
            </Typography>
            <form>
              {this.state.feedback.map((ques, i) => (
                <Card key={i} className="card">
                  <Typography variant="h4" className="card-title">
                    {ques}
                  </Typography>
                  <FormControl component="fieldset" className="card-content">
                    {this.state.choice.map((singleChoice, j) => (
                      <FormControlLabel
                        key={j}
                        value={singleChoice}
                        control={<Radio 
                          checked={this.state.selectedChoices[this.state.feedback[i]] === singleChoice}
                          onChange={() => this.handleChoiceChange(i, singleChoice)}
                          name={`ques${i}`}
                        />}
                        label={singleChoice}
                      />
                    ))}
                  </FormControl>
                </Card>
              ))}
              <Button
                variant="contained"
                color="primary"
                onClick={this.handleSubmit}
              >
                Submit
              </Button>
            </form>
          </div>
        )}
      </Container>
    );
  }
}

export default App;


