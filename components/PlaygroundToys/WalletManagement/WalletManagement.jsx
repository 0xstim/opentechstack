import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { ethers } from "ethers";
import { createClient, configureChains, mainnet } from '@wagmi/core'
import { publicProvider } from '@wagmi/core/providers/public'
import {
    useAccount,
    useConnect,
    useDisconnect,
    useEnsAvatar,
    useEnsName,
  } from 'wagmi'
import { fetchEnsAddress } from 'wagmi/actions'
import { useEnsResolver } from 'wagmi'
import styles from "./WalletManagement.module.css";


export default function WalletManagement() {
    const [wallet, setWallet] = useState(null);
    const [mnemonic, setMnemonic] = useState(null);
    const [privateKey, setPrivateKey] = useState(null);
    const [showWalletModal, setShowWalletModal] = useState(false);
    const [showWalletLoaded, setShowWalletLoaded] = useState(false);
    const [query, setQuery] = useState("");
    const [ensResolvedAddress, setEnsResolvedAddress] = useState("");
    const { address, connector, isConnected } = useAccount()
    const { data: ensAvatar } = useEnsAvatar({ address })
    const { data: ensName } = useEnsName({ address })
    const { connect, connectors, error, isLoading, pendingConnector } = useConnect()
    const { disconnect } = useDisconnect()


    if (isConnected) {
        return (
          <div className={styles.connected_container}>
            <img src={ensAvatar ? ensAvatar : "../../defi.svg"} 
              width={50}
              height={50}
              alt="ENS Avatar" />
            <div className={styles.address_box}>{ensName ? `${ensName} (${address})` : address}</div>
            <div className={styles.success_message}>Connected to {connector.name}</div>
            <button className={styles.action_button} onClick={disconnect}>Disconnect</button>
          </div>
        )
      }
    
    // function to return the address of an ENS name (e.g. 'awkweb.eth')
    // async function getEnsAddress(query) {
    //     let promise = new Promise((resolve, reject) => {
    //         const ensAddress = await fetchEnsAddress({
    //             name: query,
    //           })
    //         setEnsResolvedAddress(ensAddress)
    //     });
    // }
    

    // function to create a wallet and save to localStorage
    function createWallet() {
        const newWallet = ethers.Wallet.createRandom();
        setWallet(newWallet.address);
        setMnemonic(newWallet.mnemonic.phrase);
        setPrivateKey(newWallet.privateKey);
        localStorage.setItem("wallet", JSON.stringify(newWallet.address));
        localStorage.setItem("mnemonic", JSON.stringify(newWallet.mnemonic.phrase));
        localStorage.setItem("privateKey", JSON.stringify(newWallet.privateKey));
    };
    
    // function to delete wallet from localStorage
    function deleteWallet() {
        setWallet(null);
        setMnemonic(null);
        setPrivateKey(null);
        localStorage.removeItem("wallet");
        localStorage.removeItem("mnemonic");
        localStorage.removeItem("privateKey");
    };

    // function to load wallet from localStorage
    function loadWallet() {
        const wallet = JSON.parse(localStorage.getItem("wallet"));
        const mnemonic = JSON.parse(localStorage.getItem("mnemonic"));
        const privateKey = JSON.parse(localStorage.getItem("privateKey"));
        setWallet(wallet);
        setMnemonic(mnemonic);
        setPrivateKey(privateKey);
        setShowWalletLoaded(true);
    };

    // function to show a modal with wallet info
    function showWallet() {
        const wallet = JSON.parse(localStorage.getItem("wallet"));
        const mnemonic = JSON.parse(localStorage.getItem("mnemonic"));
        const privateKey = JSON.parse(localStorage.getItem("privateKey"));
        setWallet(wallet);
        setMnemonic(mnemonic);
        setPrivateKey(privateKey);
        setShowWalletModal(true);
    };

    function closeWalletModal() {
        setShowWalletModal(false);
    }

    // function to truncate a string in the middle given a fixed length
    function truncateString(str, num) {
        if (str.length <= num) {
            return str
        }
        const midpoint = Math.ceil(str.length / 2);
        const charsToShow = num / 2;
        const frontChars = str.substr(0, midpoint - charsToShow);
        const backChars = str.substr(midpoint + charsToShow, str.length - 1);
        return frontChars + "..." + backChars;
    };


    return (
        <div>
            <h3>Create a wallet with the button below 👇</h3>
            <button className={styles.action_button} onClick={createWallet}>Create wallet</button>
            <h3>If you had created a wallet but exited, you can load the wallet with the button below 👇</h3>
            <button className={styles.action_button} onClick={loadWallet}>Load wallet</button>
            {showWalletLoaded ? 
                (
                    <div>
                        <div>{`This wallet was loaded: ${wallet}`}</div>
                    </div>
                ) : null
            }
            <h3>If you want to see your wallet, click the button below 👇</h3>
            {showWalletModal ? 
                (    
                    <div>
                        <button className={styles.action_button} onClick={closeWalletModal}>Hide wallet</button>
                        <div>{`Address: ${wallet}`}</div>
                        <div>{`Mnemonic: ${mnemonic}`}</div>
                        <div>{`Private Key: ${privateKey}`}</div>
                    </div>
                ) : <button className={styles.action_button} onClick={showWallet}>Show wallet</button>
            }
            <h3>If you want to delete the wallet, click the button below 👇</h3>
            <button className={styles.action_button} onClick={deleteWallet}>Delete wallet</button>
            <h3>You can connect to the below popular wallet options 👇</h3>
            <div className={styles.connect_container}>
                {connectors.map((connector) => (
                    <button
                    className={styles.action_button}
                    disabled={!connector.ready}
                    key={connector.id}
                    onClick={() => connect({ connector })}
                    >
                    {connector.name}
                    {!connector.ready && ' (unsupported)'}
                    {isLoading &&
                        connector.id === pendingConnector?.id &&
                        ' (connecting)'}
                    </button>
                ))}
            
                {error && <div className={styles.error_message}>{error.message}</div>}
            </div>
            {/* <input type="text" onChange={event => setQuery(event.target.value)}/>
            <LoadingButton onClick={async () => getEnsAddress(query)}>Click for address</LoadingButton>
            {
                ensResolvedAddress ? (
                    <div>
                        <div>{`Address: ${ensResolvedAddress}`}</div>
                    </div>
                ) : null
            } */}
        </div>
    )



    // const wallet = ethers.Wallet.createRandom()
    // console.log('address:', wallet.address)
    // console.log('mnemonic:', wallet.mnemonic.phrase)
    // console.log('privateKey:', wallet.privateKey)   
}