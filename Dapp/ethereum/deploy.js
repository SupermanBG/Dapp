const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
//const {interface,bytecode} = require('./compile');
const compileFactory = require('./build/CampaignFactory.json');
const provider = new HDWalletProvider(
  'project tired spring liquid circle ceiling vintage spawn able drastic trick please',
  'https://ropsten.infura.io/v3/40580e86da274e0497422b9af99bed34'
);


const web3 = new Web3(provider);

const deploy = async ()=>{
//console.log(interface);
  const accounts =await web3.eth.getAccounts();
  //console.log('Attemp to deploy contract',accounts[0]);
const result = await new web3.eth.Contract(JSON.parse(compileFactory.interface)).deploy({data:'0x'+compileFactory.bytecode})
  .send({from:accounts[0],gas:'1000000'});
  console.log('contract deployed to',result.options.address);
}
deploy();
