import { useState } from "react"
import { ethers } from "ethers"
import abi from "@/abi/contract.json"
import { ZeroForgery } from "@/typechain-types"
export default function Page({ }) {
    const divStyle = {
        fontSize: '40px',
        fontWeight: 'bold',
    }
    const mainStyle = {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column' as 'column',
        justifyContent: 'center',
        height: '100vh',
    }
    const inputStyle = {
      
        border: '30px yellow',
        outline: 'none',
        fontSize: '20px',
        padding: '10px',
    
    }
    const buttonStyle = {
        border: 'none',
        outline: 'none',
        fontSize: '20px',
        padding: '10px',
        backgroundColor: 'white',
        color: 'black',
        cursor: 'pointer',
        marginTop: "10px"
    }

    const [master, setMaster] = useState('')
    const [provider, setProvider] = useState('')
    const [decision, setDecision] = useState('')
    const [decisionType, setDecisionType] = useState('')

    async function registerMaster(){
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        const contract = new ethers.Contract("0x27a922Ebc818e3c50D6F59fCe655c722c4e6cB43",abi , signer) as ZeroForgery
        const masterRole = await contract.MASTER_ROLE()
        const tx = await contract.grantRole(masterRole, master)
        await tx.wait()
    }
    async function registerProvider(){
        const providerx = new ethers.providers.Web3Provider(window.ethereum)
        const signer = providerx.getSigner()
        const contract = new ethers.Contract("0x27a922Ebc818e3c50D6F59fCe655c722c4e6cB43",abi , signer) as ZeroForgery
        const decision = await contract.submitDecision(provider, 0)
        const tx = await decision.wait()
        // get decision index
        //@ts-ignore
        const decisionIndex = tx.events[0].args.decisionIndex.toNumber()
        console.log(decisionIndex)
    }

    async function confirmDecision(){
        const providerx = new ethers.providers.Web3Provider(window.ethereum)
        const signer = providerx.getSigner()
        const contract = new ethers.Contract("0x27a922Ebc818e3c50D6F59fCe655c722c4e6cB43",abi , signer) as ZeroForgery
        const dec = await contract.confirmDecision(parseInt(decision))
        await dec.wait()
    }
    async function executeDecision(){
        const providerx = new ethers.providers.Web3Provider(window.ethereum)
        const signer = providerx.getSigner()
        const contract = new ethers.Contract("0x27a922Ebc818e3c50D6F59fCe655c722c4e6cB43",abi , signer) as ZeroForgery
        const dec = await contract.executeDecision(parseInt(decision))
        await dec.wait()
    }
  return (
    <div style={mainStyle}>
        <div style={divStyle}>REGISTER A MASTER</div>
        <input onChange={(e) => setMaster(e.target.value)} style={inputStyle} placeholder="Master"/>
        <button onClick={registerMaster} style={buttonStyle}>Register</button>
        <br />
        <br />
        <br />
        <div style={divStyle}>REGISTER A PROVIDER</div>
        <input onChange={(e) => setProvider(e.target.value)} style={inputStyle} placeholder="Provider"/>
        <button  onClick={registerProvider} style={buttonStyle}>Register</button>
        <br />
        <br />
        <br />
        <div style={divStyle}>DECIDE A DECISION</div>
        <input onChange={(e) => setDecision(e.target.value)} style={inputStyle} placeholder="Decision"/>
        <br />
        <select onChange={(e) => setDecisionType(e.target.value)} style={inputStyle}>
            <option value="0">Yes</option>
            <option value="1">No</option>
        </select>
        <button  onClick={confirmDecision} style={buttonStyle}>Decide</button>
        <button  onClick={executeDecision} style={buttonStyle}>Execute</button>
    </div>
  )
}