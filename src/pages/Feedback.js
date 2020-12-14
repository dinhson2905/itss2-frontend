import React from 'react';
import axios from 'axios';

export default class Feedback extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      message: ''
    }
  }
  render() {
  return (
    <div className="app">
    <form className="form" onSubmit={this.handleSubmit.bind(this)} method="POST">
      <h1>Contact Us 🤳</h1>

      <label>Name</label>
      <input placeholder="Name" value={this.state.name} onChange={this.onNameChange.bind(this)}/>

      <label>Email</label>
      <input
        placeholder="Email"
        value={this.state.email}
        onChange={this.onEmailChange.bind(this)}
      />

      <label>Message</label>
      <textarea
        placeholder="Message"
        value={this.state.message}
        onChange={this.onMessageChange.bind(this)}
      ></textarea>

      <button
        type="submit"      >
        Submit
      </button>
    </form>
    </div>
  );
  }
  onNameChange(event) {
    this.setState({name: event.target.value})
  }

  onEmailChange(event) {
    this.setState({email: event.target.value})
  }

  onMessageChange(event) {
    this.setState({message: event.target.value})
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log(this.state);
    axios({
      method: "POST", 
      url:"http://localhost:5000/send",
      data:  this.state
    }).then((response)=>{
      if (response.data.status === 'success') {
        alert("Message Sent."); 
        this.resetForm()
      } else if (response.data.status === 'fail') {
        alert("Message failed to send.")
      }
    })
  }
  resetForm(){
    this.setState({name: '', email: '', message: ''})
  }
}
