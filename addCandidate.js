const voteContractAddress = "0x181Bd9Aa34F606D211Ec9c7dd36FE4BF605F950E";

const voteContractABI = [
  {
    inputs: [
      {
        internalType: "string",
        name: "_name",
        type: "string",
      },
      {
        internalType: "string",
        name: "_partyName",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "_age",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "_city",
        type: "string",
      },
    ],
    name: "addCandidate",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "declareResults",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_id",
        type: "uint256",
      },
    ],
    name: "voteCandidate",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getCandidates",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "id",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "name",
            type: "string",
          },
          {
            internalType: "string",
            name: "partyName",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "age",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "city",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "votes",
            type: "uint256",
          },
        ],
        internalType: "struct vote.Candidate[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getPartyVotes",
    outputs: [
      {
        components: [
          {
            internalType: "string",
            name: "partyName",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "partyVotes",
            type: "uint256",
          },
        ],
        internalType: "struct vote.Party[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getStatus",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getWinner",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "id",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "name",
            type: "string",
          },
          {
            internalType: "string",
            name: "partyName",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "age",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "city",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "votes",
            type: "uint256",
          },
        ],
        internalType: "struct vote.Candidate",
        name: "",
        type: "tuple",
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

async function addCandidate() {
  const name = document.getElementById("name").value;
  const partyName = document.getElementById("partyName").value;
  const age = document.getElementById("age").value;
  const city = document.getElementById("city").value;

  await voteContract.addCandidate(name, partyName, age, city);
  alert("Candidate added successfully");

  location.reload();
}

async function declareResults() {
  await voteContract.declareResults();
  alert("Voting has been ended!");
}
