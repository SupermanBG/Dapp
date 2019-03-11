import React,{Component} from 'react';
import {Form,Input,Button,Message} from 'semantic-ui-react';
import Layout from '../../../components/Layout';
import Campaign from '../../../ethereum/campaign';
import web3 from '../../../ethereum/web3';
import {Router,Link} from '../../../routes';
class CampaignsRequestnew extends Component{
  static async getInitialProps(props){
    const {address}= props.query;
    return {address};
  }
  state= {
    description:'',
    errorMessage:'',
    value:'',
    recipientAddress:'',
    loading:''
  }

  onSubmit = async()=>{
    event.preventDefault();

    const campaign= Campaign(this.props.address);
     const accounts = await web3.eth.getAccounts();
     const {description,value,recipientAddress} = this.state;

     this.setState({errorMessage:''});
     this.setState({loading:true});
     try{
      await campaign.methods.createRequest(description,web3.utils.toWei(value,'ether'),recipientAddress).send({
        from:accounts[0],
      });
      Router.pushRoute(`/campaign/${this.props.address}/requests`);
     }catch(err){
       this.setState({errorMessage:err.message});
     }
     this.setState({loading:false});
  }

  render(){
    return (
      <Layout>
      <Link route={`/campaigns/${this.props.address}/requests`}>
      <a>返回</a>
      </Link>
      <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>

      <Form.Field>
      <label>请求描述</label>
      <Input
      value={this.state.description}
      onChange={event=>this.setState({description:event.target.value})}
      />
      </Form.Field>

      <Form.Field>
      <label>请求金额(ether)</label>
      <Input
      value={this.state.value}
      onChange={event=>this.setState({value:event.target.value})}
      />
      </Form.Field>

      <Form.Field>
      <label>受益人的地址</label>
      <Input
      value={this.state.recipientAddress}
      onChange={event=>this.setState({recipientAddress:event.target.value})}
      />
    </Form.Field>

       <Form.Field>
      </Form.Field>

      <Button loading={this.state.loading} primary>请求提交</Button>
      <Message  error header = "错误!" content={this.state.errorMessage}/>
      </Form>

      </Layout>
    );
  }
}
export default CampaignsRequestnew;
