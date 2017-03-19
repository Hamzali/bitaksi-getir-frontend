import React, { Component } from 'react';
import bitaksi from './bitaksi-logo.png';
import getir from './getir-logo.jpg';

import './App.css';

import { DateRange } from 'react-date-range';
import axios from 'axios'

class App extends Component {
  constructor (props) {
    super(props);

    this.state = {
      startDate: '2016-01-26',
      endDate: '2017-02-02',
      listData: [],
      err: '',
      isLoading: false
    };

    this.fetchData = this.fetchData.bind(this);

  }

  fetchData () {
    this.setState({err: '', isLoading: true});
    axios({
      url: 'https://getir-bitaksi-hackathon.herokuapp.com/getRecords',
      method: 'post',
      data: {
        "startDate": this.state.startDate,
        "endDate": this.state.endDate
      }
    })
    
    .then((res) => {
      this.setState({listData: res.data.records, isLoading: false});
    })
    .catch(err => {
      console.log(err);
      this.setState({err: 'Error try again!', isLoading: false});
    });
  }
  render() {
    let btnStyle = this.state.isLoading ? 'loading' : '';
    return (
      <div className="App">
        <div className="App-header">
          <img src={bitaksi} className="App-logo" alt="logo" />
          <img src={getir} className="App-logo" alt="logo" />
        </div>
        <div className="App-intro">
          <DateRange
            startDate='26/01/2016'
            endDate={ now => {
              return '02/02/2017';
            }}
            onChange={(date) => {
              this.setState({
                startDate: date.startDate.format('YYYY-MM-DD'),
                endDate: date.endDate.format('YYYY-MM-DD')}
              );
            }}
          />

          <button className={btnStyle}onClick={() => {
            if (this.state.startDate && this.state.endDate) {
              this.fetchData();
            }
          }}>Fetch Data</button>

          {this.state.err ? <span className={'error'}>{this.state.err}</span> : ''}
        </div>

        <ul className="flex-container">
          {this.state.isLoading ? <div className="spinner"></div> : ''}
          {this.state.listData.map((elem) => {
            return (
             <li className={'flex-item'} key={elem.key}>
               <p>key: {elem.key}</p>
               <p className="value">{elem.value}</p>
               </li> 
            );
          })}

        </ul>
      </div>
    );
  }
}

export default App;
