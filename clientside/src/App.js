import React, { Component } from 'react';
import axios from 'axios';

const BASE_URL = 'http://localhost:9000/konpurto';


class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            id: null,
            message: null
        };

        this.addMessage = this.addMessage.bind(this);
        this.deleteMessage = this.deleteMessage.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    componentDidMount () {
        this.getAllMessages();
    }

    async getAllMessages () {
        const response = await axios.get(`${BASE_URL}/message`);

        if (!response) {

        }

        this.setState({ data: response.data.data});
    }

    async addMessage () {
        const { message } = this.state;

        if (message == null) {
            return;
        }

        const response = await axios.post(`${BASE_URL}/message`, { message });

        if (response.error) {
            return;
        }

        this.setState({ message: '' });
        this.getAllMessages();
    }

    async deleteMessage () {
        const { id } = this.state;

        if (id === 0) {
            alert('Invalid ID');
            return;
        }

        const response = await axios.delete(`${BASE_URL}/message?id=${id}`);

        if (response.error) {
            alert(response.error);
            return;
        }

        this.setState({ id: '' });
        this.getAllMessages();
    }

    handleInputChange(event) {
        const { name, value } = event.target;

        this.setState({
            [name]: value,
        });
    }

    render() {
        const { data } = this.state;

        return (
          <div>
              <ul>
                  {data.length <= 0
                      ? "NO MESSAGES YET!"
                      : data.map(datum => (
                          <li style={ {padding: "10px"} } key={data.indexOf(datum)}>
                              <span style={ {color: "gray"} }> id: </span> {datum.id} <br />
                              <span style={ {color: "gray"} }> message: </span>
                              {datum.message}
                          </li>
                      ))
                  }
              </ul>

              <div style={{ padding: "10px" }}>
                  <input
                      name='message'
                      type="text"
                      onChange={this.handleInputChange}
                      placeholder="Add a new message"
                      value={this.state.message}
                      style={{ width: "200px" }}
                  />
                  <button onClick={this.addMessage}>
                      ADD
                  </button>
              </div>

              <div style={{ padding: "10px" }}>
                  <input
                      name='id'
                      type="number"
                      onChange={this.handleInputChange}
                      placeholder="Delete message"
                      style={{ width: "200px" }}
                      value={this.state.id}
                  />
                  <button onClick={this.deleteMessage}>
                      DELETE
                  </button>
              </div>
          </div>
        );
  }
}

export default App;
