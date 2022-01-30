import React, { useState, useEffect } from "react";
import Web3 from "./Web3";
import { ELECTION_ADDRESS, ELECTION_ABI } from "../config";

const VoteForm = ({ accountId, candidates }) => {
  const [userChoise, setUserChoise] = useState("1");
  const [displaySuccess, setDisplaySuccess] = useState(false);
  const [userAlreadyVoted, setUserAlreadyVoted] = useState(null);

  const electionInstance = new Web3.eth.Contract(
    ELECTION_ABI,
    ELECTION_ADDRESS
  );

  const handleSubmit = async () => {
    try {
      const result = await electionInstance.methods
        .vote(parseInt(userChoise))
        .send({ from: accountId });

      if (result.status === true) {
        setDisplaySuccess(true);
      }
    } catch (e) {
      console.log("err", e);
    }
  };

  const checkIfUserAlreadyVoted = async () => {
    const result = await electionInstance.methods.voters(accountId).call();
    setUserAlreadyVoted(result);
  };

  useEffect(() => {
    checkIfUserAlreadyVoted();
  });

  return (
    <>
      {displaySuccess || userAlreadyVoted ? (
        <div className="mt-6 text-lime-600 text-xl font-bold">
          Thank you for voting! Here is a cookie. 🍪
        </div>
      ) : (
        <form className="mt-5">
          <label className="block">Vote for:</label>
          <div className="flex">
            <select
              className="form-select max-w-xs inline-block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              onChange={(e) => setUserChoise(e.target.value)}
            >
              {candidates.map((item, index) => (
                <option key={index} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
            <button
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
              className="ml-5 inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Vote
            </button>
          </div>
        </form>
      )}
    </>
  );
};

export default VoteForm;
