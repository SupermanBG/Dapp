import React from 'react';
import Layout from '../../components/Layout';
import Campaign from '../../ethereum/campaign';
import { Card,Grid,Button} from 'semantic-ui-react';
import ContributeForm from '../../components/contributeForm';
import web3 from '../../ethereum/web3';
import {Link} from '../../routes';
class Campaignshow extends React.Component{
  static async getInitialProps(props){
    //console.log(props.query.address);
    const campaign=Campaign(props.query.address);
   const summary = await campaign.methods.getSummary().call();
    //console.log(summary);
    return {
      address:props.query.address,
      minimunContribute:summary[0],
      balance:summary[1],
      requestcount:summary[2],
      approversCount:summary[3],
      manager:summary[4]
    };
  }
   renderCards(){
     const summary = this.props.summary;
     const {
       address,
       minimunContribute,
       balance,
       requestcount,
       approversCount,
       manager
     }=this.props;
   const items = [
     {
       header:manager,
       meta:'管理者地址',
       description:'投资人投资金额:',
       style:{overflowWrap:'break-word'}
     },
     {
       header:minimunContribute,
       meta:'最小贡献量(wei)',
       description:'投资金额至少大于当前金额',
       style:{overflowWrap:'break-word'}
     },
     {
       header:requestcount,
       meta:'请求数量',
       description:'大于1/2投资人数量',
       style:{overflowWrap:'break-word'}
     },
     {
       header:approversCount,
       meta:'投资人数量',
       description:'已为当前众筹投资的投资人数量',
       style:{overflowWrap:'break-word'}
     },
     {
       header:web3.utils.fromWei(balance,'ether'),
       meta:'当前众筹总金额(ether)',
       description:'当前众筹中已募集的资金',
       style:{overflowWrap:'break-word'}
     },

   ];
   return <Card.Group items={items} />;
  }


  render(){

    return (
      <Layout>
        <h3>众筹显示</h3>
      <Grid>
      <Grid.Row>
      <Grid.Column width={10}>
      {this.renderCards()}

      </Grid.Column>

      <Grid.Column width={6}>
        <ContributeForm  address={this.props.address}/>
      </Grid.Column>
        </Grid.Row>

        <Grid.Row>
          <Grid.Column>
        <Link  route={`/campaigns/${this.props.address}/requests`}>
        <a>
        <Button primary>查看请求</Button>
        </a>
        </Link>
          </Grid.Column>
        </Grid.Row>
      </Grid>
      </Layout>
    );
  }
}
export default Campaignshow;
