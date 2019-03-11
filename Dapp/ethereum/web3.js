import Web3 from 'web3';

var web3;
if(typeof window!='undefined' && window.web3!='undefiend'){
   web3 = new Web3(window.web3.currentProvider);
}else{
  const provider =  new Web3.providers.HttpProvider(
    'https://ropsten.infura.io/v3/40580e86da274e0497422b9af99bed34'
  );
  web3 = new Web3(provider);
}


export default web3;
