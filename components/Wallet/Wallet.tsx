
import { useSolana } from "@solana/wallet-adapter-react";
import { useEffect, useState } from "react";

const Wallet = () => {
  const { connected, publicKey } = useSolana();
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    if (publicKey) {
      // Fetch the user's balance from the Solana blockchain.
      fetch(`/api/balance/${publicKey.toString()}`)
        .then((res) => res.json())
        .then((data) => setBalance(data.balance));
    }
  }, [publicKey]);

  return (
    <div>
      {connected ? (
        <div>
          <p>Public Key: {publicKey.toString()}</p>
          <p>Balance: {balance} SOL</p>
        </div>
      ) : (
        <p>Please connect your Solana wallet.</p>
      )}
    </div>
  );
};

export default Wallet;