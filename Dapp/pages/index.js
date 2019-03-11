import React, {Component} from'react';
import factory from '../ethereum/factory';
 import { Card,Button} from 'semantic-ui-react'
 import Layout from '../components/Layout';
 import {Link} from '../routes';
// export default ()=>{
//   return <h1>hello index!</h1>;
// }
class Campaignindex extends Component{
static async getInitialProps(){
  const campaign = await factory.methods.getDeployedCampaign().call();
  return {campaign};
}


  //
  // async componentDidMount(){
  //   const campaign = await factory.methods.getDeployedCampaign().call();
  //   console.log(campaign);
  // }
  renderCampaign(){
    const items = this.props.campaign.map(address=>{
      return {
        header: '众筹详情',
      description: <Link route={`/campaigns/${address}`}><a>查看</a></Link>,
     fluid:true
      }
    });
    return <Card.Group items={items} />;
  }
  render(){
    return (
       <Layout>
      <div>
      <h2>项目列表</h2>
      <Link route='campaigns/new'>
       <Button floated="right" content='创建众筹' icon='add circle' labelPosition='right' primary/>
       </Link>
       {this.renderCampaign()}
      </div>
      </Layout>
    // <h1>{this.props.campaign[0]}</h1>
    );
  }
}
export default Campaignindex;
