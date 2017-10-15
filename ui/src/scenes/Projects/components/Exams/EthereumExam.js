import React, { Component } from 'react';

class EthereumExam extends Component {
  render() {
    return (
        <div className="container">

            <form action="#">
                <h3>Is eth a </h3>
                <p>
                    <input name="group1" type="radio" id="test1" />
                    <label for="test1">Distributed Network</label>
                </p>
                <p>
                    <input name="group1" type="radio" id="test2" />
                    <label for="test2">Decentralized Network</label>
                </p>
                <br/>
                <h3>What is the correct way to declare the version while writing solidity? </h3>
                <p>
                    <input name="group1" type="radio" id="test1" />
                    <label for="test1">pragma solidity ^0.4.13;</label>
                </p>
                <p>
                    <input name="group1" type="radio" id="test2" />
                    <label for="test2">pragma solidity 0.4.13^;</label>
                </p>
                
                <a class="btn purple">Submit</a>

            </form>
        </div>
    );
}
}

export default EthereumExam;
