import React,{Component} from 'react';
import Layout from '../../components/Layout';
import { Button, Form } from 'semantic-ui-react';
import {Dropdown,Input} from 'semantic-ui-react';
import { Message } from 'semantic-ui-react';
import web3 from '../../ethereum/web3';
import factory from '../../ethereum/factory';
import {Router} from '../../routes';
const options = [
  { key: 'ether', text: 'ether', value: 'ether' },
  { key: 'wei', text: 'wei', value: 'wei' },

]
class CampaignsNew extends Component{
  state ={
    minimum:'',
    errorMessage:'',
    loading:''
  };


  onSubmit = async()=>{
    this.setState({errorMessage:''});
    this.setState({loading:true});
  try{
    event.preventDefault();
    const accounts = await web3.eth.getAccounts();
    await factory.methods.createCampaign(this.state.minimum).send({from:accounts[0]});

    Router.pushRoute('/');
  }catch(err){
   this.setState({errorMessage:err.message});
  }
  this.setState({loading:false});
}


  render(){
    //console.log(this.state.minimum);
    return (
      <Layout>
      <h2>创建你的众筹项目</h2>

      <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>

      <Form.Field>

      <label>请输入最小投资额</label>

      <Input  label={<Dropdown defaultValue='ether' options={options} />}
    labelPosition='right'
    placeholder='ether or wei'
    value = {this.state.minimun}
    onChange={event=>this.setState({minimum:event.target.value})}
    />

      <Button loading={this.state.loading} primary>创建众筹</Button>

       <Message error header="错误!" content={this.state.errorMessage} />

      </Form.Field>

      </Form>

      </Layout>
    );
  }
}
export default CampaignsNew;
