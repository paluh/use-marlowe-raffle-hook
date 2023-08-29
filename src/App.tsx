import React from 'react';
// import logo from './logo.svg';
import './App.css';
import { Props, useWithdrawal } from 'marlowe-raffle';
import { useWallet, CardanoWallet } from '@meshsdk/react';
// import { useWithdrawal } from '../../marlowe-raffle/src/lib.js';


const Withdrawal = (wallet: any) => {
  const props: Props = {
    network: "preprod",
    wallet,
    txOutRef: {
      txId: "c93175feff92ddfb571f4d12b9d34ab910594dce54ad4017a5670a0b43a930f5",
      // txId: "3605db0c5ae9be7623cd4ecb04f8e99d784da35258f2952896b25f7613968b54",
      txIx: 2
    },
    blockfrostProjectId: "preprodD9cONxVqzHYtFEL4RObOZ46y4begqNHc"
  };
  const { status, reset } = useWithdrawal(props);

  let action, body, initProblem, isWinner, alreadyClaimed;

  switch(status.status) {
    case "AwaitingWithdrawalTrigger":
      body = <button onClick={status.trigger}>Claim your prize</button>;
      break;
    case "WithdrawalSucceeded":
      body = (<div>
        <p>Price should be visible in your wallet soon your wallet. Here is payout tx:</p>
        <a href="https://{ network }.cardanoscan.io/transaction/{ status.txId }" target="_blank" rel="noreferrer">{ status.txId }</a>
      </div>);
      break;
    case "WithdrawalFailed":
      var retry = status.retry;
      body = (<div>
        <p>Something went wrong. Please try again or contact support.</p>
        <button onClick={retry}>Try again</button>
      </div>);
      break;
    case "FatalError":
      body = "Fatal error. Please contact support.";
      break;
    case "InitializationFailed":
      switch(status.error.tag) {
        // If role token was not found this wallet is probably not a winner
        case "FindRoleTokenUTxOError":
          body = "Sorry, you are not a winner";
          break;
        // If payout utxo was already spent, this wallet has already claimed its price
        case "PayoutUTxOAlreadySpentError":
          body = "You have already claimed your prize";
          break;
        // Otherwise it is a serious problem - non recoverable:
        default:
          body = "Serious problem - report sent to admin ;-)";
          break;
      };
      break;
    case "Initializing":
      body = "Checking your price claim...";
      break;
    case "ProcessingWithdrawal":
      body = "Processing withdrawal...";
      break;
  };

  return (<div>{ body }</div>);
}

function App() {
  const wallet = useWallet()

  let withdrawal;
  if (wallet.connected) {
    let w: any = wallet.wallet;
    withdrawal = Withdrawal(w._walletInstance);
  } else {
    withdrawal = "no wallet";
  }

  return (
    <div className="App">
      <header className="App-header">
        <CardanoWallet />
        <div className="withdrawal">{ withdrawal }</div>
      </header>
    </div>
  );
}

export default App;
