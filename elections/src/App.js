import { useEffect, useState, useCallback } from "react";
import Web3 from "./components/Web3";
import Elections from "./components/Elections";
import AuthProblems from "./components/AuthProblems";

import "./styles/output.css";

function App() {
  const [account, setAccount] = useState(null);
  const [authProblems, setAuthProblems] = useState(false);

  const loadAccount = useCallback(async () => {
    if (Web3) {
      try {
        const accounts = await Web3.eth.requestAccounts();
        setAccount(accounts[0]);
      } catch (e) {
        setAuthProblems(true);
      }
    }
  }, []);

  useEffect(() => {
    if (!account) {
      loadAccount();
    }
  }, [account, loadAccount]);

  return (
    <div className="max-w-screen-lg mx-auto mt-5">
      {authProblems ? (
        <AuthProblems />
      ) : (
        <>
          {account ? (
            <>
              <div className="mb-5">
                <h1 className="text-xl">Welcome to the elections booth!</h1>
                <p className="italic">Brought to you buy ETH blockchain.</p>
                <p className="mt-5">
                  Your account is:
                  <span className="ml-3 font-bold break-all">{account}</span>
                </p>
              </div>
              <p className="mb-5">
                Below is a list of candidates, please cast your vote.
              </p>
              <Elections accountId={account} />
            </>
          ) : (
            <div className="text-center">
              <h1 className="text-xl">Elections are loading...</h1>
              <div className="flex justify-center my-4">
                <svg
                  className="animate-spin h-5 w-5 mr-3 bg-emerald-300"
                  viewBox="0 0 24 24"
                ></svg>
              </div>
              <p>You probably need to authorize with Metamask.</p>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default App;
