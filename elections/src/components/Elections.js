import React, { useEffect, useState } from "react";
import cx from "classnames";
import { ELECTION_ADDRESS, ELECTION_ABI } from "../config";
import Web3 from "./Web3";
import VoteForm from "./VoteForm";

const Elections = ({ accountId }) => {
  const [candidates, setCandidates] = useState(null);

  const electionInstance = new Web3.eth.Contract(
    ELECTION_ABI,
    ELECTION_ADDRESS
  );

  const getCandidates = async () => {
    let candidatesList = [];
    const candidatesCount = await electionInstance.methods
      .candidatesCount()
      .call();

    for (let i = 0; i < candidatesCount; i++) {
      const result = await electionInstance.methods.candidates(i + 1).call();

      candidatesList = [
        ...candidatesList,
        { id: result.id, name: result.name, voteCount: result.voteCount },
      ];
    }

    setCandidates(candidatesList);
  };

  useEffect(() => {
    if (!candidates) {
      getCandidates();
    }
  });

  return (
    candidates && (
      <div className="max-w-screen-lg mx-auto mt-5">
        <table className="w-full">
          <thead>
            <tr className="border-b-2 border-black text-zinc-500">
              <th>Candidate</th>
              <th>Vote count</th>
            </tr>
          </thead>
          <tbody>
            {candidates.map((item, index) => (
              <tr
                key={index}
                className={cx("text-lg", index % 2 !== 0 && "bg-slate-300")}
              >
                <th className="Candidates__Name">{item.name}</th>
                <th className="Candidates__VoteCount">{item.voteCount}</th>
              </tr>
            ))}
          </tbody>
        </table>
        <VoteForm accountId={accountId} candidates={candidates} />
      </div>
    )
  );
};

export default Elections;
