import { useState,useCallback,useEffect,useRef } from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(8)
  const[number,setNumber]=useState(false)
  const[character,setChar]=useState(false)
  const[pass,setPass]=useState("")
   const passwordref=useRef(null)
  const passwordGenerator=useCallback(()=>{
    let pass=""
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(number) str+="0123456789"
    if(character) str+="!@#$%^&*()_~!"

    for(let i=1;i<=length;i++)
    {
      let char=Math.floor(Math.random()*str.length+1)
      pass+=str.charAt(char)
    }
    setPass(pass)
  },[length,number,character,setPass])

  const copyPasswordToClipboard=useCallback(()=>{
    passwordref.current?.select();
    window.navigator.clipboard.writeText(pass)
  },[pass])

 useEffect(()=>{passwordGenerator()},[length,number,character,passwordGenerator])
  return (
    <>
    <div className="flex items-center justify-center min-h-screen">
    <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-4 my-8 text-purple-500 bg-gray-800 '>
 <h1 className='text-white text-center my-3'>Password Generator</h1>
      <div className="flex shadow rounded-lg overflow-hidden mb-4">
        <input type="text"
        value={pass}
        className='outline-none w-full py-1 px-3' 
        placeholder='password'
        readOnly
        ref={passwordref}
        />
        <button onClick={copyPasswordToClipboard}className='outline-none bg-purple-700 text-white px-3 py-0.5 shrink-0 hover:bg-blue-600'>COPY</button>
      </div>
      <div className='flex text-sm gap-x-2'>
      <div className='flex items-center gap-x-1'>
        <input type="range"
        min={6}
        max={100}
        value={length}
        className='cursor-pointer' 
        onChange={(e)=>{setLength(e.target.value)}}/>
        <label>Length:{length} </label>
      </div>
      <div className='flex items-center gap-x-1'>
        <input type="checkbox"
        defaultChecked={number}
        id="numberInput"
        onChange={()=>{setNumber((prev)=>!prev)}}/>
        <label htmlFor="numberrInput">Numbers</label>
      </div>
      <div className='flex items-center gap-x-1'>
        <input type="checkbox"
        defaultChecked={character}
        id="characterInput"
        onChange={()=>{setChar((prev)=>!prev)}}/>
        <label htmlFor="characterInput">Characters</label>
      </div>
      </div>
    </div>
    </div>
    </>
  )
}

export default App
