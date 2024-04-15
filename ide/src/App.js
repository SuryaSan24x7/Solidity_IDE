import React, { useState } from 'react';
import AceEditor from "react-ace";
import axios from 'axios';
import "ace-builds/src-noconflict/theme-monokai";
import "ace-mode-solidity/build/remix-ide/mode-solidity";

function App() {
  const [code, setCode] = useState('');
  const [abi, setAbi] = useState('');
  const [bytecode, setBytecode] = useState('');

  const handleCompile = async () => {
    try {
      const response = await axios.post('https://solidity-ide.vercel.app:5151/compile', { code });
      setAbi(response.data.abi);
      setBytecode(response.data.bytecode);
    } catch (error) {
      console.error('Error compiling code:', error);
    }
  };

  return (
    <div className="App">
      <div style={{ width: "50%", float: "left" }}>
        <AceEditor
          mode="solidity"
          theme="monokai"
          onChange={setCode}
          name="UNIQUE_ID_OF_DIV"
          editorProps={{ $blockScrolling: true }}
          value={code}
          setOptions={{ useWorker: false }}
          height="500px"
          width="100%"
        />
      </div>
      <div style={{ width: "50%", float: "right", padding: "20px" }}>
        <button onClick={handleCompile}>Compile</button>
        {abi && (
          <>
            <h3>ABI</h3>
            <textarea value={JSON.stringify(abi, null, 2)} readOnly style={{ width: "100%", height: "200px" }}></textarea>
          </>
        )}
        {bytecode && (
          <>
            <h3>Bytecode</h3>
            <textarea value={bytecode} readOnly style={{ width: "100%", height: "200px" }}></textarea>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
