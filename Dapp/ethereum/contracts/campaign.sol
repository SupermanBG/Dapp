pragma solidity ^0.4.24;
contract CampaignFactory{
  address[] public deployedCampaign;
  function createCampaign(uint minimun) public{
    address newCampaign = new Campaign(minimun,msg.sender);
    deployedCampaign.push(newCampaign);
  }
  function getDeployedCampaign() public view returns(address[]){
    return deployedCampaign;
  }
}
contract Campaign{
    struct Request{
    string description;//描述
    uint value;//申请总金额
    address recipients; //受益人地址
    bool complete;//请求是否完成
    uint approvalCount;//同意请求的投资人的总数
    mapping(address=>bool) approvers;//投资人的意见
    }

  Request[] public requests;//存储请求
  address public manager;//管理者的地址
  uint public minimunContribute;//最小贡献量
  mapping(address=>bool) public approvers;//投资的意见
  uint public approversCount;//投资人的数量
  modifier restricted{
    require(msg.sender==manager);
    _;
  }
  constructor(uint minimun,address _address) public{
    manager=_address;
    minimunContribute = minimun;
  }
  function contribute() public payable{// 投资人投资
    require(msg.value>minimunContribute);
    approvers[msg.sender] = true;
    approversCount++;
  }
  function createRequest(string _description,uint _value,address _addr) public restricted{//管理着创建一个请求
    Request memory newquest = Request({
      description:_description,
      value:_value,
      recipients:_addr,
      complete:false,
      approvalCount:0
      });
      requests.push(newquest);
  }
  function approveRequest(uint index) public{//投资人是否支持请求
    Request storage request = requests[index];
    require(approvers[msg.sender]);
    require(!request.approvers[msg.sender]);
    request.approvers[msg.sender] = true;
    request.approvalCount++;
  }
  function finalizeRequest(uint index) public restricted payable{//请求是否成功
    Request storage request = requests[index];
    require(request.approvalCount > approversCount / 2);
    request.recipients.transfer(request.value);
    request.complete = true;
  }
  function getSummary() public view returns(uint,uint,uint,uint,address){
    return(minimunContribute,address(this).balance,requests.length,approversCount,manager);
  }
  function getRequestCount() public view returns(uint){
    return requests.length;
  }
}
