import React from 'react';
import axios from 'axios';



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
  }
  render() {
    var names = ['Randy','Calvin','Paul','Joe','Greg'];
    var namesList = names.map(function(name, index){
      return <button onClick={()=>{plusOneToTotal(name)}} key={index}>{name}: {getTotal(name.name)} </button>;
    })
    return (
     <ul> {namesList} </ul>
    );
  }
}
export default Counter;
