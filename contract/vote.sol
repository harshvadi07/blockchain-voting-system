// SPDX-License-Identifier: MIT
pragma solidity ^0.8.1;

contract vote {

    // This is the contract's body, here you'll specify the logic for this contract.

    // struct for a Candidate
    struct Candidate {
        uint id;
        string name;
        string partyName;
        uint age;
        string city;
        uint votes;
    }

    // storing current id of the last candidate
    uint curr = 0;

    // array for storing the candidates
    Candidate[] candidates;

    // create a function to vote a candidate
    function voteCandidate(uint _id) public {
        for(uint i=0; i<candidates.length; i++)
        {
            if(candidates[i].id == _id)
                candidates[i].votes++;
        }
    }

    // function to add a candidate
    function addCandidate(string memory _name, string memory _partyName, uint _age, string memory _city) public {
        Candidate memory newCandidate = Candidate(curr+1, _name, _partyName, _age, _city, 0);
        candidates.push(newCandidate);
        curr++;
    }
    
    // function to return all candidates
    function getCandidates() public view returns(Candidate[] memory) {
        return candidates;
    }

    // to declare result
    uint declared = 0;
    function declareResults() public {
        declared = 1;
    }

    // get result status
    function getStatus() public view returns(uint) {
        return declared;
    }

    // function to get the winner
    function getWinner() public view returns (Candidate memory) {
        uint mx = 0;
        Candidate memory winner = candidates[0];

        for(uint i=0;i<candidates.length;i++)
        {
            if(candidates[i].votes >= mx)
            {
                mx = candidates[i].votes;
                winner = candidates[i];
            }
        }

        return winner;
    }
}
