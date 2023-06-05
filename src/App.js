import { useEffect, useState } from 'react'
import { ethers } from 'ethers'

// Components
import Navigation from './components/Navigation'
import Section from './components/Section'
import Product from './components/Product'

// ABIs
import Dappazon from './abis/Dappazon.json'

// Config
import config from './config.json'

const { items } = require("./items.json")

function App() {
          const [account, setAccount] = useState('')  
          const [provider, setProvider] = useState('')
          const [dappazon, setDappazon] = useState('')
          const [electronics, setElectronics] = useState([])
          const [clothing, setClothing] = useState([])
          const [toys, setToys] = useState([])


          const [item, setItem] = useState({})
          const [toggle, setToggle] = useState(false)

          const togglePop = (item) => {
            console.log(item)
            setItem(item)
            toggle ? setToggle(false) : setToggle(true)
          }

          const tokens = (n) => {
            return ethers.utils.parseUnits(n.toString(), 'ether')
          }


          const loadBlockchainData = async () => {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            const account = ethers.utils.getAddress(accounts[0])
            setAccount(account);

                //Connect to blockchain
                const provider = new ethers.providers.Web3Provider(window.ethereum)
                setProvider(provider)
                const network = await provider.getNetwork()

                //Connect to the smart contract
                const dappazon = new ethers.Contract(
                  "0x5FbDB2315678afecb367f032d93F642f64180aa3",
                  [
                    {
                      "inputs": [],
                      "stateMutability": "nonpayable",
                      "type": "constructor"
                    },
                    {
                      "anonymous": false,
                      "inputs": [
                        {
                          "indexed": false,
                          "internalType": "string",
                          "name": "name",
                          "type": "string"
                        },
                        {
                          "indexed": false,
                          "internalType": "uint256",
                          "name": "cost",
                          "type": "uint256"
                        },
                        {
                          "indexed": false,
                          "internalType": "uint256",
                          "name": "quantity",
                          "type": "uint256"
                        }
                      ],
                      "name": "Buy",
                      "type": "event"
                    },
                    {
                      "anonymous": false,
                      "inputs": [
                        {
                          "indexed": false,
                          "internalType": "string",
                          "name": "name",
                          "type": "string"
                        },
                        {
                          "indexed": false,
                          "internalType": "uint256",
                          "name": "cost",
                          "type": "uint256"
                        },
                        {
                          "indexed": false,
                          "internalType": "uint256",
                          "name": "quantity",
                          "type": "uint256"
                        }
                      ],
                      "name": "List",
                      "type": "event"
                    },
                    {
                      "inputs": [
                        {
                          "internalType": "uint256",
                          "name": "_id",
                          "type": "uint256"
                        }
                      ],
                      "name": "buy",
                      "outputs": [],
                      "stateMutability": "payable",
                      "type": "function"
                    },
                    {
                      "inputs": [
                        {
                          "internalType": "uint256",
                          "name": "",
                          "type": "uint256"
                        }
                      ],
                      "name": "items",
                      "outputs": [
                        {
                          "internalType": "uint256",
                          "name": "id",
                          "type": "uint256"
                        },
                        {
                          "internalType": "string",
                          "name": "name",
                          "type": "string"
                        },
                        {
                          "internalType": "string",
                          "name": "category",
                          "type": "string"
                        },
                        {
                          "internalType": "string",
                          "name": "image",
                          "type": "string"
                        },
                        {
                          "internalType": "uint256",
                          "name": "cost",
                          "type": "uint256"
                        },
                        {
                          "internalType": "uint256",
                          "name": "rating",
                          "type": "uint256"
                        },
                        {
                          "internalType": "uint256",
                          "name": "stock",
                          "type": "uint256"
                        }
                      ],
                      "stateMutability": "view",
                      "type": "function"
                    },
                    {
                      "inputs": [
                        {
                          "internalType": "uint256",
                          "name": "_id",
                          "type": "uint256"
                        },
                        {
                          "internalType": "string",
                          "name": "_name",
                          "type": "string"
                        },
                        {
                          "internalType": "string",
                          "name": "_category",
                          "type": "string"
                        },
                        {
                          "internalType": "string",
                          "name": "_image",
                          "type": "string"
                        },
                        {
                          "internalType": "uint256",
                          "name": "_cost",
                          "type": "uint256"
                        },
                        {
                          "internalType": "uint256",
                          "name": "_rating",
                          "type": "uint256"
                        },
                        {
                          "internalType": "uint256",
                          "name": "_stock",
                          "type": "uint256"
                        }
                      ],
                      "name": "list",
                      "outputs": [],
                      "stateMutability": "nonpayable",
                      "type": "function"
                    },
                    {
                      "inputs": [
                        {
                          "internalType": "address",
                          "name": "",
                          "type": "address"
                        }
                      ],
                      "name": "orderCount",
                      "outputs": [
                        {
                          "internalType": "uint256",
                          "name": "",
                          "type": "uint256"
                        }
                      ],
                      "stateMutability": "view",
                      "type": "function"
                    },
                    {
                      "inputs": [
                        {
                          "internalType": "address",
                          "name": "",
                          "type": "address"
                        },
                        {
                          "internalType": "uint256",
                          "name": "",
                          "type": "uint256"
                        }
                      ],
                      "name": "orders",
                      "outputs": [
                        {
                          "internalType": "uint256",
                          "name": "time",
                          "type": "uint256"
                        },
                        {
                          "components": [
                            {
                              "internalType": "uint256",
                              "name": "id",
                              "type": "uint256"
                            },
                            {
                              "internalType": "string",
                              "name": "name",
                              "type": "string"
                            },
                            {
                              "internalType": "string",
                              "name": "category",
                              "type": "string"
                            },
                            {
                              "internalType": "string",
                              "name": "image",
                              "type": "string"
                            },
                            {
                              "internalType": "uint256",
                              "name": "cost",
                              "type": "uint256"
                            },
                            {
                              "internalType": "uint256",
                              "name": "rating",
                              "type": "uint256"
                            },
                            {
                              "internalType": "uint256",
                              "name": "stock",
                              "type": "uint256"
                            }
                          ],
                          "internalType": "struct Dappazon.Item",
                          "name": "item",
                          "type": "tuple"
                        }
                      ],
                      "stateMutability": "view",
                      "type": "function"
                    },
                    {
                      "inputs": [],
                      "name": "owner",
                      "outputs": [
                        {
                          "internalType": "address",
                          "name": "",
                          "type": "address"
                        }
                      ],
                      "stateMutability": "view",
                      "type": "function"
                    },
                    {
                      "inputs": [],
                      "name": "withdraw",
                      "outputs": [],
                      "stateMutability": "nonpayable",
                      "type": "function"
                    }
                  ],
                  provider
                )
                setDappazon(dappazon)

                
                const electronics = items.filter((item) => item.category === 'electronics')
                const clothing = items.filter((item) => item.category === 'clothing')
                const toys = items.filter((item) => item.category === 'toys')

                setElectronics(electronics)
                setClothing(clothing)
                setToys(toys)
                

              }
          useEffect(() => {
            if (window.ethereum) {
              loadBlockchainData()
            }
          }, [])
          return (

            <div>
              <Navigation account={account} setAccount={setAccount} />
              <h1>BestSellers</h1>
              {electronics && clothing && toys && (
                <>
                  <Section title={"Clothing & Jewelry"} items={clothing} togglePop={togglePop} />
                  <Section title={"Electronics & Gadgets"} items={electronics} togglePop={togglePop} />
                  <Section title={"Toys & Gaming"} items={toys} togglePop={togglePop} />
                </>
              )}
              {toggle && (
                <Product item={item} provider={provider} account={account} dappazon={dappazon} togglePop={togglePop} />

              )}
            </div>
            

            
          )
}

export default App;
