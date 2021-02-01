import React, { Component } from 'react';
import './App.css';
import { LineChart, XAxis, YAxis, CartesianGrid, Line, Tooltip, Legend } from 'recharts';

const urlString = 'https://yddnr6i1f8.execute-api.us-east-2.amazonaws.com/Dev/cupcakes'

class App extends Component{

  constructor(props) {
    super(props);
    this.state = {
      records: null,
      loading: false,
    }
  }

  sortMonths = (i, j) => {
    if (i.Id === j.Id) {
        return 0;
    }
    else {
        return (i.Id > j.Id) ? 1 : -1;
    }
  }


  async componentDidMount(){
    const response = await fetch(urlString)
    const data = await response.json();
    console.log(data)
    // data.sort((a, b) => (a.id < b.id) ? -1 : 1)
    data.sort(this.sortMonths)
    this.setState({records: data, loading:false})
  }
  render(){

    if(this.state.loading) {
      return (
      <div align="center">
        Page Loading!!!
      </div>)
    }

    return(
      <div align="center">
        <h1> Graph - Interest over TimeLine </h1>
        <div>
        {<LineChart width={1400} height={300} data={this.state.records} >
          <XAxis dataKey="Month"/>
          <YAxis dataKey = "Interest" />
          <CartesianGrid stroke="#eee" strokeDasharray="5 5"/>
          <Line type="monotone" dataKey="Interest" stroke="#8884d8" activeDot={{ r: 8 }} />
          <Tooltip />
          <Legend />
        </LineChart>}
        </div>
      </div>
    );
  }
}

export default App;
