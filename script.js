const voteContractAddress = "0x29838cCA1465F4aA56d9a2b64E253b4459137547";
const voteContractABI = [
  {
    inputs: [],
    name: "voteA",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "voteB",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "winner",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];
let voteContract;
let signer;

const provider = new ethers.providers.Web3Provider(window.ethereum, "goerli");

provider.send("eth_requestAccounts", []).then(() => {
  provider.listAccounts().then((accounts) => {
    signer = provider.getSigner(accounts[0]);
    voteContract = new ethers.Contract(
      voteContractAddress,
      voteContractABI,
      signer
    );
  });
});

async function voteA() {
  await voteContract.voteA();
}

async function voteB() {
  await voteContract.voteB();
}

async function getWinner() {
  const winner = await voteContract.winner();
  document.getElementsByClassName("winner")[0].innerHTML = winner;
}
