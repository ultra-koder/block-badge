import React, { Component } from 'react';

class EthereumExam extends Component{
  render() {
    return (

  <div className="container">
      <div className="row">
      <div className="col-md-6">
      <label for="">Q: Is ETH a?</label>
      <div class="radio">
        <label><input type="radio" name="optradio"/> Distributed Network</label>
      </div>
      <div class="radio">
      <label><input type="radio" name="optradio"/> Decentralized Network</label>
      </div>

      </div>

      </div>

      <div className="row">
      <div className="col-md-6">
      <label for="">Q: What is the correct way to state the version while writing solidity?</label>
      <div class="radio">
        <label><input type="radio" name="optradio"/> pragma solidity ^0.4.13;</label>
      </div>
      <div class="radio">
      <label><input type="radio" name="optradio"/> pragma solidity 0.4.13^;</label>
      </div>
      </div>
      </div>

      <input type="submit" className="btn btn-primary" value="Submit"/>

  </div>


    );
  }
}

export default EthereumExam;
