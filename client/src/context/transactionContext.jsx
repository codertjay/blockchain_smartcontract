import React, {useState, useEffect} from "react";
import {contractABI, contractAddress} from "../utils/constants";
import {ethers} from 'ethers';


export const TransactionContext = React.createContext();

const {ethereum} = window;

const getEthereumContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner()
    const transactionContract = new ethers.Contract(contractAddress, contractABI, signer)
    return transactionContract;
}


export const TransactionProvider = ({children}) => {

    const [currentAccount, setCurrentAccount] = useState('');
    const [formData, setFormData] = useState({
        addressTo: '',
        amount: '', keyword: '',
        message: ''
    })
    const [isLoading, setIsLoading] = useState(false);
    const [transactionCount, setTransactionCount] = useState(localStorage.getItem(
        'transactionCount'));
    const [transactions, setTransactions] = useState([]);
    const handleChange = (e, name) => {
        setFormData((prevState) => ({
            ...prevState,
            [name]: e.target.value
        }))
    }

    const getAllTransactions = async () => {
        try {
            if (!ethereum) return alert("Please install metamask");
            const transactionContract = getEthereumContract()
            const availableTransactions = await transactionContract.getAllTransactions()
            console.log(availableTransactions)
            const structuredTransactions = availableTransactions.map((transaction) => (
                {
                    addressTo: transaction.receiver,
                    addressFrom: transaction.sender,
                    timestamp: new Date(transaction.timestamp.toNumber() * 1000).toLocaleString(),
                    message: transaction.message,
                    keyword: transaction.keyword,
                    amount: parseInt(transaction.amount._hex) / (10 ** 18),
                }
            ))
            setTransactions(structuredTransactions)
            console.log(structuredTransactions)
        } catch (e) {
            console.log(e);
            throw  new Error('No ethereum object');
        }
    }

    const checkIfWalletIsConnected = async () => {
        try {
            if (!ethereum) return alert("Please install MetaMask.");

            const accounts = await ethereum.request({method: "eth_accounts"});

            if (accounts.length) {
                setCurrentAccount(accounts[0]);

                getAllTransactions();
            } else {
                console.log("No accounts found");
            }
        } catch (error) {
            console.log(error);
        }
    };

    const connectWallet = async () => {
        try {
            if (!ethereum) return alert("Please install metamask");
            const accounts = await ethereum.request({method: 'eth_requestAccounts'})
            setCurrentAccount(accounts[0]);
        } catch (error) {
            console.log(error);
            throw  new Error('No ethereum object');
        }
    }

    const checkIfTransactionExist = async () => {
        try {
            const transactionContract = getEthereumContract()
            const transactionCount = await transactionContract.getTransactionCount();
            window.localStorage.setItem("transactionCount", transactionCount)
        } catch (e) {
            console.log(e);
            throw  new Error('No ethereum object');
        }
    }
    const sendTransaction = async () => {
        try {
            if (!ethereum) return alert("Please install metamask")
            const {addressTo, amount, keyword, message} = formData;
            const transactionContract = getEthereumContract()
            const parsedAmount = ethers.utils.parseEther(amount);

            await ethereum.request({
                method: 'eth_sendTransaction',
                params: [{
                    from: currentAccount,
                    to: addressTo,
                    gas: '0x5208', // 2100 GWEI
                    value: parsedAmount._hex
                }]
            })
            const transactionHash = await transactionContract.addToBlockChain(
                addressTo, parsedAmount, message, keyword);
            setIsLoading(true)
            console.log(`loading - ${transactionHash.hash}`)
            await transactionHash.wait();
            setIsLoading(false)
            console.log(`Success - ${transactionHash.hash}`)
            const transactionCount = await transactionContract.getTransactionCount();
            setTransactionCount(transactionCount.toNumber());
            getAllTransactions();
        } catch (e) {
            console.log(e)
            throw  new Error('No ethereum object');

        }
    }


    useEffect(() => {
        checkIfWalletIsConnected();
        checkIfTransactionExist()
    }, []);

    return (<TransactionContext.Provider
        value={{
            connectWallet, currentAccount,
            formData, setFormData, handleChange, transactions,isLoading,sendTransaction,setIsLoading
        }}>
        {children}
    </TransactionContext.Provider>);
}
