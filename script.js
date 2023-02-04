const voteContractAddress = "0x72967b3722b702fbc5218d3681e8F5574abFa672";

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

async function listCandidates() {
  const candidates = await voteContract.getCandidates();
  const candidatesDisplay = document.querySelector(".candidates");
  candidatesDisplay.innerHTML = "";

  if (candidates.length === 0) {
    candidatesDisplay.innerHTML = "No candidates";
  }

  let id = 1;

  candidates.forEach(function (candidate) {
    const candidateDiv = document.createElement("div");
    candidateDiv.classList.add("candidateDiv");
    candidateDiv.classList.add("row");
    candidateDiv.classList.add("text-center");
    candidateDiv.innerHTML += "Name: " + candidate.name + "</br>";
    candidateDiv.innerHTML += "Party: " + candidate.partyName + "</br>";
    candidateDiv.innerHTML += "Age: " + candidate.age + "</br>";
    candidateDiv.innerHTML += "City: " + candidate.city + "</br>";
    candidateDiv.innerHTML += `<button class="vote-btn btn btn-primary" onclick = vote(${id})>Vote</button>`;

    candidatesDisplay.appendChild(candidateDiv);
    id = id + 1;
  });

  let status = await voteContract.getStatus();
  status = parseInt(status, 16);

  if (status === 1) {
    const voteBtns = document.getElementsByClassName("vote-btn");
    for (let i = 0; i < voteBtns.length; i++) {
      voteBtns[i].classList.add("disabled");
    }
  }
}

async function vote(id) {
  await voteContract.voteCandidate(id);
}

async function getResultStatus() {
  let status = await voteContract.getStatus();
  status = parseInt(status, 16);

  if (status === 1) {
    window.location.href = "/results.html";
  } else {
    alert("Results are not declared yet!");
  }
}

async function getResults() {
  const candidates = await voteContract.getCandidates();
  const candidatesDisplay = document.querySelector(".candidates");
  candidatesDisplay.innerHTML = "";

  let id = 1;

  candidates.forEach(function (candidate) {
    const candidateDiv = document.createElement("div");
    candidateDiv.classList.add("candidateDiv");
    candidateDiv.classList.add("row");
    candidateDiv.classList.add("text-center");
    candidateDiv.innerHTML += "Name: " + candidate.name + "</br>";
    candidateDiv.innerHTML += "Party: " + candidate.partyName + "</br>";
    candidateDiv.innerHTML += "Votes: " + candidate.votes + "</br>";

    candidatesDisplay.appendChild(candidateDiv);
    id = id + 1;
  });
}
