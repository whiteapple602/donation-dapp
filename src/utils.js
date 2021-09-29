const donationBoxABI = [{ "inputs": [], "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "sender", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "DonationTransferred", "type": "event" }, { "inputs": [], "name": "donate", "outputs": [], "stateMutability": "payable", "type": "function" }, { "inputs": [], "name": "getTotalDonations", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }];

const donationAddress = "0x3986FD026EBF1d20ED8B69A07c5AAAaac16B9Ef8";

const getWeb3 = () => {
  return new Promise((resolve, reject) => {
    window.addEventListener("load", async () => {
      if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        try {
          await window.ethereum.request({ method: "eth_requestAccounts" });
          resolve(web3);
        } catch (error) {
          reject(error);
        }
      } else {
        reject("must install MetaMask");
      }
    });
  });
};

const getContract = async (web3) => {
  const donate = new web3.eth.Contract(
    donationBoxABI,
    donationAddress
  );
  return donate;
};
