// deploy.js
const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const {interface, bytecode} = require('./compile');

const provider = new HDWalletProvider(process.env.MNEMONIC, process.env.INFURA_API);
const web3 = new Web3(provider);

const deploy = async () =>{
    // Get a list of all accounts
    accounts = await web3.eth.getAccounts();
    console.log('Attempting to deploy contract from account', accounts[0])
    // Use one of those accounts to deploy the contract
    result = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({data:bytecode, arguments:['Hi there!']})
    .send({from: accounts[0], gas:'1000000'})
    console.log(result.options.address);
    // To prevent hanging at deployment
    provider.engine.stop();
};

deploy();
