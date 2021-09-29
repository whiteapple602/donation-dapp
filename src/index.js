const displayTotalDonation = async (contract, util) => {
  donation = await contract.methods.getTotalDonations().call();
  donation = util.fromWei(donation, 'ether');
  $("h3").html(`Total donation: ${donation} eth`);
};

const doDonate = (contract, accounts, util) => {
  let input;
  $("#input").on("change", (e) => {
    input = e.target.value;
  });
  $("#form").on("submit", async (e) => {
    e.preventDefault();
    try {
      await contract.methods
        .donate()
        .send({ from: accounts[0], gas: 40000, value: util.toWei(input, 'ether') });
      displayTotalDonation(contract, util);
    }
    catch (err) {
      alert(err);
    }
  });
};

async function main() {
  const web3 = await getWeb3();
  const accounts = await web3.eth.getAccounts();
  const contract = await getContract(web3);
  const util = await web3.utils;

  doDonate(contract, accounts, util);
}

main();
