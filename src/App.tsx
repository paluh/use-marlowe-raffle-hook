import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Props, useWithdrawal } from 'marlowe-raffle';
import { useWallet } from '@meshsdk/react';


console.log(useWithdrawal);

function App() {
  //  { wallet: walletInfo.wallet
  //  , network: B.preprod
  //  , txOutRef: Runtime.TxOutRef
  //    -- { txId: Runtime.TxId "c93175feff92ddfb571f4d12b9d34ab910594dce54ad4017a5670a0b43a930f5"
  //    -- , txIx: 0
  //    -- }
  //    { txId: Runtime.TxId "3605db0c5ae9be7623cd4ecb04f8e99d784da35258f2952896b25f7613968b54"
  //    , txIx: 2
  //    }
  //  , blockfrostProjectId: B.ProjectId "preprodD9cONxVqzHYtFEL4RObOZ46y4begqNHc"
  //  }
  // {
  //  name: connectedWalletName,
  //  connecting: connectingWallet,
  //  connected: hasConnectedWallet,
  //  wallet: connectedWalletInstance,
  //  connect: connectWallet,
  //  disconnect,
  //  error,
  //}; 
  const wallet = useWallet()

  const props: Props = {
    network: "preprod",
    wallet: "wallet",
    txOutRef: {
      txId: "c93175feff92ddfb571f4d12b9d34ab910594dce54ad4017a5670a0b43a930f5",
      txIx: 2
    },
    blockfrostProjectId: "preprodD9cONxVqzHYtFEL4RObOZ46y4begqNHc"
  };
  const { status, reset } = useWithdrawal(props);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <ul>
          <li>Edit <code>src/App.tsx</code> and save to reload.</li>
          <li>WALLET: {wallet.name}</li>
        </ul>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
