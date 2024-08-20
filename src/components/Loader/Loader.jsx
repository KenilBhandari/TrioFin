import React, { useEffect, useState } from 'react'
import Input from '../Input/Input';
import Lottie from 'react-lottie';
import animationData from '../../../../Loading Animation.json'; 


function Loader() {
 
  const time = Math.floor(Math.random() * (12000 - 6000) + 1000);
  const [loading, setLoading] = useState(true);
  

  const defaultOptions = {
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, time);
    return () => clearTimeout(timer);
  }, []);
  
  if (loading == true) {
    return (
      <>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
        <div className="fixed inset-0 flex justify-center items-center mb-3">
          <Lottie options={defaultOptions} height={200} width={300} />
        </div>
        <div
          className="absolute bottom-2.5 left-0  w-full px-3.5 text-black text-center  z-5   font-sans"
          style={{ fontSize: "2.5rem", fontFamily: "revert-layer" }}
        >
        </div>
      </>
    );
  }
  
  return(

  <>
  <Input/>
  </>
  ) 
}

export default Loader