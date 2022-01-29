import { useEffect, useState, useCallback } from "react";
import Web3 from "./components/Web3";
import Elections from "./components/Elections";
import './styles/output.css'

function App() {
  const [account, setAccount] = useState(null);

  const loadAccount = useCallback(async () => {
    if (Web3) {
      const accounts = await Web3.eth.requestAccounts();
      setAccount(accounts[0]);
    }
  }, []);

  useEffect(() => {
    if (!account) {
      loadAccount();
    }
  }, [account, loadAccount]);

  return (
    <div>
      <div>Your account is: {account}</div>
      {account && <Elections accountId={account} />}
    </div>
  );
}

export default App;
