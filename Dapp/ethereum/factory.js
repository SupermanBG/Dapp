 import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';
const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0x03252c12Ea55Ec16E8C0570295d326A227F163f6'
)
export default instance;
