import React,{Component} from 'react';
import {Form,Input,Button,Message} from 'semantic-ui-react';
import Campaign from '../ethereum/campaign';
import web3 from '../ethereum/web3';
import {Router} from '../routes';
class ContributeForm extends Component{
state ={
  value:'',
  errorMessage:'',
  loading:''
};

onSubmit =async()=>{
  event.preventDefault();
  const campaign= Campaign(this.props.address);
   const accounts = await web3.eth.getAccounts();
   this.setState({errorMessage:''});
   this.setState({loading:true});
   try{
     await campaign.methods.contribute().send({
       from:accounts[0],
       value:web3.utils.toWei(this.state.value,'ether')
     })
     Router.replaceRoute(`/campaigns/${this.props.address}`);
   }catch(err){
     this.setState({errorMessage:err.message});
   }
   this.setState({loading:false});
};

  render(){
    return (
      <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
      <Form.Field>
      <label>总的投资额</label>
      <Input
      value={this.state.value}
      onChange={event=>this.setState({value:event.target.value})}
      label='ether'
      labelPosition = 'right'
      />
      </Form.Field>
      <Button loading={this.state.loading} primary>投资</Button>
      <Message  error header = "错误!" content={this.state.errorMessage}/>
      </Form>
    );
  }
}
export default ContributeForm;
