import React, { Component } from 'react';

class EthereumExam extends Component {
    render() {
        return (
            <div className="container">
                <form>

                    <div className="row">
                        <label>Is ETH a?</label>
                        <div class="radio">
                            <label><input type="radio" name="group1" value="a" /> Distributed Network</label>
                        </div>
                        <div class="radio">
                            <label><input type="radio" name="group1" value="b"/> Decentralized Network</label>
                        </div>
                    </div>
                </form>
                <form>

                    <div className="row">
                        <label>What is the correct way to state the version while writing solidity?</label>
                        <div class="radio">
                            <label><input type="radio" name="group2" /> pragma solidity ^0.4.13;</label>
                        </div>
                        <div class="radio">
                            <label><input type="radio" name="group2" /> pragma solidity 0.4.13^;</label>
                        </div>
                    </div>
                    <input type="submit" className="btn btn-primary" value="Submit" />
                </form>
            </div>
        );
    }
}

export default EthereumExam;
