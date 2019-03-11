import React,{Component} from 'react';
import {Button} from 'semantic-ui-react';
import {Link} from '../../../routes';
import Layout from '../../../components/Layout';
import Campaign from '../../../ethereum/campaign';
import {Table} from 'semantic-ui-react';
import RequestRow from '../../../components/RequestRow';
class CampaignsRequests extends Component{
  static async getInitialProps(props){
    const {address} = props.query;
    const campaign= Campaign(address);

    const requestCount = await campaign.methods.getRequestCount().call();
     const approversCount = await campaign.methods.approversCount().call();

   const requests =await Promise.all(
     Array(parseInt(requestCount)).fill().map((element,index)=>{
       return campaign.methods.requests(index).call();
     })
   )
   console.log(requests);
    return {address,requests,approversCount};
  }

renderRow(){
  return this.props.requests.map((request,index)=>{
    return (
      <RequestRow
      key={index}
      id={index}
      request={request}
      address={this.props.address}
      approversCount={this.props.approversCount}
      ></RequestRow>
    );
  });
}

  render(){
      //console.log(this.props.requests);
      const {HeaderCell,Row,Header} = Table;
    return (
      <Layout>

    <h1>请求列表</h1>
    <Link route={`/campaigns/${this.props.address}/requests/new`}>

    <Button primary>增加请求</Button>
    </Link>
     <Table>
    <Table.Header>
         <Table.Row>
           <Table.HeaderCell>ID</Table.HeaderCell>
           <Table.HeaderCell>描述</Table.HeaderCell>
           <Table.HeaderCell>总的金额</Table.HeaderCell>
           <Table.HeaderCell>受益人的地址</Table.HeaderCell>
            <Table.HeaderCell>同意数量</Table.HeaderCell>
          <Table.HeaderCell>是否同意</Table.HeaderCell>
             <Table.HeaderCell>是否完成</Table.HeaderCell>
         </Table.Row>
       </Table.Header>
       <Table.Body>
       { this.renderRow() }
       </Table.Body>
       </Table>
    </Layout>
  );
  }
}
export default CampaignsRequests;
