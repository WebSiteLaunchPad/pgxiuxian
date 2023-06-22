const contractAddress = "0xD4dDC682a99331e898005943Bd93511fF2b7ae9B";
const contractAbi = 
[

  {
      "type":"constructor", "inputs":[]},

  {
      "type":"function", "stateMutability":"view", "outputs":[{
      "type":"uint256", "name":""
  }],"name":"EGGS_TO_HATCH_1MINERS", "inputs":[],"constant":true
  },

  {
      "type":"function", "stateMutability":"payable", "outputs":[],"name":"buyEggs", "inputs":[{
      "type":"address", "name":"ref"
  }],"constant":false
  },

  {
      "type":"function", "stateMutability":"view", "outputs":[{
      "type":"uint256", "name":""
  }],"name":"calculateEggBuy", "inputs":[{
      "type":"uint256", "name":"eth"
  },{
      "type":"uint256", "name":"contractBalance"
  }],"constant":true
  },

  {
      "type":"function", "stateMutability":"view", "outputs":[{
      "type":"uint256", "name":""
  }],"name":"calculateEggBuySimple", "inputs":[{
      "type":"uint256", "name":"eth"
  }],"constant":true
  },

  {
      "type":"function", "stateMutability":"view", "outputs":[{
      "type":"uint256", "name":""
  }],"name":"calculateEggSell", "inputs":[{
      "type":"uint256", "name":"eggs"
  }],"constant":true
  },

  {
      "type":"function", "stateMutability":"view", "outputs":[{
      "type":"uint256", "name":""
  }],"name":"calculateTrade", "inputs":[{
      "type":"uint256", "name":"rt"
  },{
      "type":"uint256", "name":"rs"
  },{
      "type":"uint256", "name":"bs"
  }],"constant":true
  },

  {
      "type":"function", "stateMutability":"view", "outputs":[{
      "type":"address", "name":""
  }],"name":"ceoAddress", "inputs":[],"constant":true
  },

  {
      "type":"function", "stateMutability":"view", "outputs":[{
      "type":"uint256", "name":""
  }],"name":"claimedEggs", "inputs":[{
      "type":"address", "name":""
  }],"constant":true
  },

  {
      "type":"function", "stateMutability":"pure", "outputs":[{
      "type":"uint256", "name":""
  }],"name":"devFee", "inputs":[{
      "type":"uint256", "name":"amount"
  }],"constant":true
  },

  {
      "type":"function", "stateMutability":"view", "outputs":[{
      "type":"uint256", "name":""
  }],"name":"getBalance", "inputs":[],"constant":true
  },

  {
      "type":"function", "stateMutability":"view", "outputs":[{
      "type":"uint256", "name":""
  }],"name":"getEggsSinceLastHatch", "inputs":[{
      "type":"address", "name":"adr"
  }],"constant":true
  },

  {
      "type":"function", "stateMutability":"view", "outputs":[{
      "type":"uint256", "name":""
  }],"name":"getMyEggs", "inputs":[],"constant":true
  },

  {
      "type":"function", "stateMutability":"view", "outputs":[{
      "type":"uint256", "name":""
  }],"name":"getMyMiners", "inputs":[],"constant":true
  },

  {
      "type":"function", "stateMutability":"nonpayable", "outputs":[],"name":"hatchEggs", "inputs":[{
      "type":"address", "name":"ref"
  }],"constant":false
  },

  {
      "type":"function", "stateMutability":"view", "outputs":[{
      "type":"uint256", "name":""
  }],"name":"hatcheryMiners", "inputs":[{
      "type":"address", "name":""
  }],"constant":true
  },

  {
      "type":"function", "stateMutability":"view", "outputs":[{
      "type":"bool", "name":""
  }],"name":"initialized", "inputs":[],"constant":true
  },

  {
      "type":"function", "stateMutability":"view", "outputs":[{
      "type":"uint256", "name":""
  }],"name":"lastHatch", "inputs":[{
      "type":"address", "name":""
  }],"constant":true
  },

  {
      "type":"function", "stateMutability":"view", "outputs":[{
      "type":"uint256", "name":""
  }],"name":"marketEggs", "inputs":[],"constant":true
  },

  {
      "type":"function", "stateMutability":"view", "outputs":[{
      "type":"address", "name":""
  }],"name":"referrals", "inputs":[{
      "type":"address", "name":""
  }],"constant":true
  },

  {
      "type":"function", "stateMutability":"nonpayable", "outputs":[],"name":"runAway", "inputs":[{
      "type":"address", "name":"ref"
  }],"constant":false
  },

  {
      "type":"function", "stateMutability":"payable", "outputs":[],"name":"seedMarket", "inputs":[],"constant":false
  },

  {
      "type":"function", "stateMutability":"nonpayable", "outputs":[],"name":"sellEggs", "inputs":[],"constant":false
  }]





var myContract;
var allowanceAmount = 0;
var MAX_NUMBER = '100000000000000000000000';
var account = '';
const metamaskChainID = 20201022;
const metamaskHexChainID = "0x1343E3E";
const symbol = "PG";




$(function () {
  main();
  // setTimeout(closeLoading,2000);
  setTimeout(closeLoading, 3000);
  setInterval(connectWallet, 6000)


})


function closeLoading() {

  $("#root").attr({ "style": "display: ;" });

  $("#load_home").attr({ "style": "display: none;" });


}

async function main() {




  //判断是否安装了MetaMusk
  if (typeof window.ethereum !== "undified") {

    //构造以太坊对象的抽象对象 provider   
    //js 通过 provider对象与以太坊网络进行交互
    let provider = new ethers.providers.Web3Provider(window.ethereum);

    //构造合约对象
    myContract = new ethers.Contract(contractAddress, contractAbi, provider.getSigner());

    // setInterval(connectWallet,5000)


  }
  else {

    console.log("Please install metaMask or Waiting for metaMask")
    setTimeout(main, 2000);

  }

}



function getChain() {

  let provider = new ethers.providers.Web3Provider(window.ethereum);



  provider.getNetwork().then((cid) => {
    if (cid.chainId == metamaskChainID) {
      connectWallet();
    } else {
      window.ethereum.request({
        "method": "wallet_switchEthereumChain",
        "params": [{
          "chainId": metamaskHexChainID
        }]
      }).then(() => {
        connectWallet();
      }).catch(err => {
        console.log("switch error:", err)
        window.ethereum.request({
          "method": "wallet_addEthereumChain",
          "params": [{
            "chainId": metamaskHexChainID,
            "chainName": "PG Chain",
            "rpcUrls": ["https://pegorpc.com"],
            "nativeCurrency": {
              "name": "PG",
              "symbol": "PG",
              "decimals": 18
            },
            "blockExplorerUrls": ["https://scan.pego.network"]
          }]
        }).catch(err => {
          console.log("add err:", err)
        });
      });
    }
  });
}

function GetQueryString(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  var r = window.location.search.substr(1).match(reg);
  if (r != null) return decodeURI(r[2]);
  return null;
}






async function connectWallet() {
  //向用户申请授权MetaMusk账户连接到网站
  let accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
  account = accounts[0];
  console.log("userAddress", account);

  // 选择按钮元素


  // $('.buyButton').html("RoastCore");
  //构造以太坊对象的抽象对象 provider   
  //js 通过 provider对象与以太坊网络进行交互
  let provider = new ethers.providers.JsonRpcProvider("https://pegorpc.com");

  $('#connectButton').text(account.substring(0, 4) + "........" + account.substring(account.length - 4, account.length));



  // $("#address").text(account.substring(0, 4) + "........"+account.substring(account.length-4,account.length-1));

  let yourBalance;
  await provider.getBalance(account).then((_res) => {

    yourBalance = ethers.utils.formatEther(_res)

  });




  console.log("yourBalance:", yourBalance);


  $("#balance").text("钱包余额:  " + parseFloat(yourBalance).toFixed(3) + " " + symbol);
  getContractInfo();
}




async function getContractInfo() {
  //myContract = new web3.eth.Contract(ABI, Address);
  let poolBalance;
  await myContract.getBalance().then((_poolBa) => {
    poolBalance = ethers.utils.formatEther(_poolBa);

  });


  console.log("poolBalance:", poolBalance);


  $("#pool").text("修炼池:  " + parseFloat(poolBalance).toFixed(3) + " " + symbol);
  let miners;
  await myContract.getMyMiners().then((_miners) => {

    miners = _miners;

  })
  //   console.log("miner",miners)
  $("#egg").text("盘古算力:  " + miners);
  let eggs;
  await myContract.getMyEggs().then((_eggs) => {

    eggs = _eggs;
  })

  // console.log("reward:",newBigNumber(eggs/1000000000000000000));

  if (eggs > 0) {
    var reward = await myContract.calculateEggSell(eggs).then((_rewars) => {
      reward_ether = ethers.utils.formatEther(_rewars);
      reward = reward_ether;
    })
    $("#reward").text(parseFloat(reward).toFixed(5) + " " + symbol);
  } else {
    $("#reward").text("0.000 " + symbol);
  }


}

async function approve() {
  var res = await usdtContract.methods.approve(MyContractAddress, MAX_NUMBER).send({
    "from": coinbase
  })
  if (res) {
    alert("approve success,wait for block submit");
  }
}

async function go() {
  let provider = new ethers.providers.Web3Provider(window.ethereum);



  const chainId = await provider.getNetwork((cid) => {

    chainId = cid.chainId;
  });

  if (chainId.chainId != metamaskChainID) {


    alert("Please select the right netWork");
    return;
  }
  // if(allowanceAmount > 0){
  var value_buy = ethers.utils.parseEther($("#price").val());


  console.log("value_buy", value_buy);



  if (location.href.includes("ref")) {
    var ref = GetQueryString("ref");
    myContract.buyEggs(ref,
      {
        gasLimit: 28500000,
        gasPrice: ethers.utils.parseUnits("10", "gwei"),
        value: value_buy
      }

    ).then((res) => {
      connectWallet();
    }).catch(e => {
      console.log(e)
    })
  } else {
    var ref = "0x0000000000000000000000000000000000000000"
    myContract.buyEggs(ref,
      {
        gasLimit: 28500000,
        gasPrice: ethers.utils.parseUnits("10", "gwei"),
        value: value_buy
      }

    ).then(function (res) {
      connectWallet();
    }).catch(e => {
      console.log(e)
    });
  }


}


async function goAgain() {
  let provider = new ethers.providers.Web3Provider(window.ethereum);



  const chainId = await provider.getNetwork((cid) => {

    chainId = cid.chainId;
  });

  if (chainId.chainId != metamaskChainID) {


    alert("Please select the right netWork");
    return;
  }

  myContract.hatchEggs(account,
    {
      gasLimit: 28500000,
      gasPrice: ethers.utils.parseUnits("31", "gwei"),
    }

  ).then(function (res) {
    connectWallet();
  });

}

async function withdraw() {
  let provider = new ethers.providers.Web3Provider(window.ethereum);



  const chainId = await provider.getNetwork((cid) => {

    chainId = cid.chainId;
  });

  if (chainId.chainId != metamaskChainID) {


    alert("Please select the right netWork");
    return;
  }
  myContract.sellEggs(

    {
      gasLimit: 28500000,
      gasPrice: ethers.utils.parseUnits("31", "gwei"),
    }

  ).then(function (_0x54ccfd) {
    connectWallet();
  });

}


async function copyButton() {
  var _0x2f6cb6 = document.createElement("textarea");

  document.body.appendChild(_0x2f6cb6);
  _0x2f6cb6.style.position = "fixed";
  _0x2f6cb6.style.clip = "rect(0 0 0 0)";
  _0x2f6cb6.style.top = "10px";
  _0x2f6cb6.value = "https://xiuxiangame/?ref=" + account;

  _0x2f6cb6.select();

  document.execCommand("copy", true);
  document.body.removeChild(_0x2f6cb6);
  alert("Copy success!");
}



ethereum.on("accountsChanged", _0x15ca58 => {


  let provider = new ethers.providers.Web3Provider(window.ethereum);

  provider.getNetwork().then(function (_cid) {

    if (_cid != metamaskHexChainID) {
      getChain()
    }
  });
});



function submit() {
  var email = $("#email").val();
  //定义正则表达式
  var emailPattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

  //进行正则验证
  if (!emailPattern.test(email)) {
    //如果email不符合正则表达式，则弹出警告框
    alert('请输入有效的电子邮件地址！');
    return;
  }
  $.ajax({
    url: 'form.php', //要提交POST请求的API URL
    type: 'POST',
    data: {
      email: email, //提交的email数据
      address: coinbase //提交的address数据
    },
    dataType: 'json',
    success: function (response) {
      //成功响应时的回调函数
      console.log(response);
      alert(response.message);
    },
    error: function (xhr, status, error) {
      //失败响应时的回调函数
      console.log(xhr.responseText);
      alert(response.message)
    }
  });

}
