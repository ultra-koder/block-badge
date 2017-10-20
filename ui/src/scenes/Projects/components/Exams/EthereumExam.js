import React, { Component } from 'react';
import Button from 'react-md/lib/Buttons';
import eth_image from '../../../../../public/img/ethereum101-baked.png';

// ui\public\img\ethereum101-baked.png
//
// ui\src\scenes\Projects\components\Exams\EthereumExam.js

class EthereumExam extends Component {
  constructor(props) {
      super(props);
      this.state = {myBadge:false}
    }

    handleSubmitClick = (event)=> {
      event.stopPropagation();
      this.setState({myBadge: true});
      console.log('Submitt!');
    };


  render() {
    const myBadge= this.state.myBadge;

    return (
        <div className="container">

            <form action="#">
                <h3>Is Ethereum a </h3>
                <p>
                    <input name="group1" type="radio" id="test1" />
                    <label htmlFor="test1">Distributed Network</label>
                </p>
                <p>
                    <input name="group2" type="radio" id="test2" />
                    <label htmlFor="test2">Decentralized Network</label>
                </p>
                <br/>
                <h3>What is the correct way to declare the version while writing solidity? </h3>
                <p>
                    <input name="group3" type="radio" id="test1" />
                    <label htmlFor="test1">pragma solidity ^0.4.13;</label>
                </p>
                <p>
                    <input name="group4" type="radio" id="test2" />
                    <label htmlFor="test2">pragma solidity 0.4.13^;</label>
                </p>

                <div className="md-cell md-cell--6-desktop md-cell--8-tablet md-cell--8-phone md-text-right login-cell">
                  <Button raised primary label="Submit" onClick={ this.handleSubmitClick} />
                  {myBadge && <div>
                    <div style={{padding: 20 + 'px'}}>Congratulations. You completed Ethereum 101!</div>
                    <div style={{padding: 10 + 'px'}}>Your badge is safely stored on blockchain.</div>
                    <img src = {eth_image}/></div>}
                </div>

            </form>
        </div>
    );
}
}

export default EthereumExam;
