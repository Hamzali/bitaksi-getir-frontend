import React, {Component} from 'react'
import bitaksi from './bitaksi-logo.png'
import getir from './getir-logo.jpg'

import './App.css'

import {DateRange} from 'react-date-range'
import axios from 'axios'


import Button from './components/button'
import List from './components/list'
import Modal from './components/modal'
import Spinner from './components/spinner'

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      startDate: '2016-01-26',
      endDate: '2017-02-02',
      listData: [],
      err: '',
      isLoading: false,
      isModalOpen: false,
      activeRecord: {
        value: '',
        keyVal: ''
      }
    };
  }

  fetchData = () => {
    this.setState({err: '', isLoading: true});
    axios({
      url: 'https://getir-bitaksi-hackathon.herokuapp.com/getRecords',
      method: 'post',
      data: {
        "startDate": this.state.startDate,
        "endDate": this.state.endDate
      }
    }).then((res) => {
      this.setState({listData: res.data.records, isLoading: false});
    }).catch(err => {
      console.log(err);
      this.setState({err: 'Error try again!', isLoading: false});
    });
  }

  _handleBtnClick = () => {
    if(this.state.startDate && this.state.endDate) {
      this.fetchData();
    }
  }

  toggleModal = (value='', keyVal='') => {
    this.setState({isModalOpen: !this.state.isModalOpen, activeRecord: {value: value, keyVal: keyVal}});
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <a href="https://bitaksi.com">
            <img src={bitaksi} className="App-logo" alt="logo"/>
          </a>
          <a href="https://getir.com">
            <img src={getir} className="App-logo" alt="logo"/>
          </a>
          
        </div>
        <div className="App-intro">
          <DateRange
            startDate={now => '26/01/2016'}
            endDate={now => '02/02/2017'}
            onChange={(date) => {
              this.setState({
                startDate: date
                  .startDate
                  .format('YYYY-MM-DD'),
                endDate: date
                  .endDate
                  .format('YYYY-MM-DD')
              });
            }}/>
          </div>

          <Button 
            label={'fetch data'}
            onClick={this._handleBtnClick}
          />

          {this.state.err ? <span className={'error'} > {this.state.err} </span> : ''}

           {this.state.isLoading
                ? <Spinner />
                :  <List data={this.state.listData} toggleModal={this.toggleModal}/>}

            {this.state.isModalOpen ? 
              <Modal 
                value={this.state.activeRecord.value}
                keyVal={this.state.activeRecord.keyVal}
                closeModal={this.toggleModal}/> : ''}
          </div>
    );
  }
}

export default App;
