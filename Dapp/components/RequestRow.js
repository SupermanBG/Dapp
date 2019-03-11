import React from 'react';
import {Table,Button} from 'semantic-ui-react';
import web3 from '../ethereum/web3';
import Campaign from '../ethereum/campaign';
class RequestRow extends React.Component{
  onApprove = async()=>{
    const campaign = Campaign(this.props.address);
    const accounts = await web3.eth.getAccounts();
    await campaign.methods.approveRequest(this.props.id).send({
      from:accounts[0]
    });
  }
onFinalize = async()=>{
  const campaign =Campaign(this.props.address);
  const accounts = await web3.eth.getAccounts();
  await campaign.methods.finalizeRequest(this.props.id).send({
    from:accounts[0]
  });
}



   render(){
     console.log(this.props.address);
  const {Row,Cell} = Table;
  const {id,request,approversCount} = this.props;
     return (
       <Row disabled= {request.complete}>
       <Cell>{id}</Cell>
         <Cell>{request.description}</Cell>
           <Cell>{web3.utils.fromWei(request.value,'ether')}</Cell>
     <Cell>{request.recipients}</Cell>
     <Cell>{request.approvalCount}/{approversCount}</Cell>
     <Cell>
     {
       request.complete?null:(<Button color='green' onClick={this.onApprove}>同意</Button>)
     }
     </Cell>
     <Cell>
     {
       request.complete?null:( <Button color='red' onClick={this.onFinalize}>完成</Button>)
     }
     </Cell>
       </Row>
     );
  }
}
export default RequestRow;
