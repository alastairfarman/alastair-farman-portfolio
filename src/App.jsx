import React, { useState } from "react";
import Title from "./Title";
import Standard from "./Standard";
import ProdVis from "./ProdVis";
import Three2 from "./Three2";
import About from "./About";

import { SharedGLContext } from "./threeInstance";

function App() {
  const [sharedGLContext, setSharedGLContext] = useState(null);
  return (
    <>
      <Title />
      <SharedGLContext.Provider value={{ sharedGLContext, setSharedGLContext }}>
        <Standard />
        <ProdVis />
        <Three2 />
      </SharedGLContext.Provider>
      <About />
    </>
  );
}

export default App;
