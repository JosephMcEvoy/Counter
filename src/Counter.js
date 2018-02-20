import React from 'react';
import axios from 'axios';

function plusOneToTotal(name) {
  return axios.post('/count', { name })
  .then(res => {
    console.log(res);
    console.log(res.data);
  });
}


class Counter extends React.Component {
  constructor() {
    super();
    this.state = { persons: [] };
  }

  componentDidMount() {
    axios.get('/count')
    .then(res => {
      const persons = res.data;
      this.setState({ persons });
    })
  }

  render() {
    const persons = this.state.persons;
    let namesButtons = persons.map((person, index) =>
      <button onClick={() => plusOneToTotal(person.name)} key={index}>
        {person.name}: {person.count}
      </button>
    );

    return (
      <ul>
        {namesButtons}
      </ul>
    );
  }
}

export default Counter;
