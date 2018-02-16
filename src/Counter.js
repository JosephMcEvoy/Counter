import React from 'react';
import axios from 'axios';



function plusOneToTotal(name){
  return axios.post('http://localhost:3000/count/' + name)
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
}

function getTotal(name){
  axios.get('http://localhost:3000/count/' + name)
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
      return <button onClick={()=>{plusOneToTotal()}} key={index}>{name}: {getTotal(name)} </button>;
    })
    return (
     <ul> {namesList} </ul>
    );
  }
}
export default Counter;
