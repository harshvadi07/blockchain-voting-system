const voteContractAddress = "0x52328Beb2e8738945E8825A4deFd7e81163361A7";

const voteContractABI = [
  {
    inputs: [],
    name: "listCandidates",
    outputs: [
      {
        internalType: "string[]",
        name: "",
        type: "string[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string[]",
        name: "_candidates",
        type: "string[]",
      },
    ],
    name: "setCandidates",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
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
const provider = new ethers.providers.Web3Provider(window.ethereum, "goerli");
let voteContract;
let signer;

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

async function setData() {
  const mycandidates = ["a", "b", "c"];
  const setsad = voteContract.setCandidates(mycandidates);
  await setsad;
}

let candids;
async function getData() {
  candids = await voteContract.listCandidates();
  console.log(candids);
  const candidates = document.getElementsByClassName("candidates")[0];

  for (let i = 0; i < candids.length; i++) {
    candidates.innerHTML += "<h1>" + candids[i] + "</h1></br>";
  }
}
