import React from 'react';
import axios from 'axios';

const serverAddress = 'localhost:3000';

function plusOneToTotal(name){
  return axios.post('localhost:3000/count/' + "{name: " + name + "}")
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
}

function getTotal(name){
  axios.get('localhost:3000/count/' + name)
  .then(function (response) {
    return response;
  })
  .catch(function (error) {
    console.log(error);
  });
}

class Counter extends React.Component {
  constructor() {
    super();
    this.state = { 'persons': [] };
  }

  /*
  componentDidMount() {
    axios.get(`${serverAddress}/count`)
    .then(res => {
      const persons = res.data;
      this.setState({ persons });
    })
  }
  */

  render() {
    return (
      <ul>
        { this.state.persons.map(person => <li>{person.name}</li>) }
      </ul>
    );
  }
}

export default Counter;
