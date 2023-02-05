const voteContractAddress = "0xEc92F21F438e586786Feb7D8Ed6BA67536117Aee";

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

async function listCandidates() {
  let status = await voteContract.getStatus();
  status = parseInt(status, 16);

  const candidates = await voteContract.getCandidates();
  const candidatesDisplay = document.querySelector(".candidates");
  candidatesDisplay.innerHTML = "";

  if (status === 1) {
    document.getElementsByClassName("status")[0].innerHTML +=
      "Voting period is over.";
  }

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
    candidateDiv.innerHTML += `<button class="vote-btn btn" onclick = vote(${id})>Vote</button>`;

    candidatesDisplay.appendChild(candidateDiv);
    id = id + 1;
  });

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
  if (parseInt(await voteContract.getStatus(), 16) === 1) {
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

    const parties = await voteContract.getPartyVotes();
    const partyDisplay = document.querySelector(".parties");
    partyDisplay.innerHTML = "";
    partyDisplay.innerHTML += `<h3 class=my-2 style="color:white">Summary</h3>`;

    parties.forEach(function (party) {
      const partyDiv = document.createElement("div");
      partyDiv.classList.add("candidateDiv");
      partyDiv.classList.add("row");
      partyDiv.classList.add("text-center");
      partyDiv.innerHTML += "Party: " + party.partyName + "</br>";
      partyDiv.innerHTML += "Votes: " + party.partyVotes + "</br>";

      partyDisplay.appendChild(partyDiv);
    });
  } else {
    alert("Results are not declared yet.");
  }
}
