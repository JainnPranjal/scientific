import React, { useState } from 'react'
import './Calc.css'

const Calc = () => {
    const [data, setData] = useState("9");
    const [inverse ,setInverse] = useState(false);
    const [ReversePow, setReversePow] = useState(false);
    const getValue =(e) =>{

      const val =e.target.value;
      const operator = ['+', '-', '/', '*', '%'];

      if (operator.includes(val) && operator.includes(data.slice(-1))) {
        setData(data.slice(0, -1).concat(val));  
    } else {
        setData(data.concat(val));  
    }
    }

    const allClear = ()=>{
      setData("");
    }

    const backspace = ()=>{
      setData(data.slice(0,-1))
    }

    const power = () => {
      const regex = /^(\d+(\.\d+)?)\^(\d+(\.\d+)?)$/; 
      const match = data.match(regex);
      if (match) {
        const x = parseFloat(match[1]);
        const y = parseFloat(match[3]);
        if (!isNaN(x) && !isNaN(y)) {
          setData(Math.pow(x, y).toString());
        }
      } else {
        setData("Invalid input");
        setTimeout(() => setData(""), 2000);
      }
    };

    const revpower = () => {
      const regex = /^(\d+(\.\d+)?)\^(\d+(\.\d+)?)$/; //regex to match "x^y" 
      const match = data.match(regex);
      if (match) {
        const x = parseFloat(match[1]);
        const y = parseFloat(match[3]);
        if (!isNaN(x) && !isNaN(y)) {
          setData(Math.pow(y, x).toString()); 
        }
      } else {
        setData("Error");
      }
    };
    const calculate = () => {
      try {
        if (ReversePow && data.includes('^')) {
          revpower();
          return;
        } else if (data.includes('^')) {
          let modifiedData = data.replace(/(\d+(\.\d+)?)\^(\d+(\.\d+)?)/g, (match, p1, p2, p3) => {
            return `Math.pow(${p1}, ${p3})`;
          });
          setData(eval(modifiedData).toString());
          return;
        } else {
          setData(eval(data).toString());
        }
      } catch (err) {
        setData("Error");
      }
    };
    

    

    

    const sin = () => {
      let result;
      try {
          result = eval(data);  
          if (inverse) {
              setData(Math.asin(result).toString()); 
          } else {
              setData(Math.sin(result).toString()); 
          }
      } catch (err) {
          setData("Error");
      }
  };

  const cos = () => {
    let result;
    try {
        result = eval(data);  
        if (inverse) {
            setData(Math.acos(result).toString()); 
        } else {
            setData(Math.cos(result).toString()); 
        }
    } catch (err) {
        setData("Error");
    }
  };

  const tan = () => {
    let result;
    try {
        result = eval(data);  
        if (inverse) {
            setData(Math.atan(result).toString()); 
        } else {
            setData(Math.tan(result).toString()); 
        }
    } catch (err) {
        setData("Error");
    }
};
  

  

const sinh = () => {
  let result;
  try {
      result = eval(data);  
      if (inverse) {
          setData(Math.asinh(result).toString()); 
      } else {
          setData(Math.sinh(result).toString()); 
      }
  } catch (err) {
      setData("Error");
  }
};

  const cosh = () => {
      let result;
      try {
          result = eval(data);  
          if (inverse) {
              setData(Math.acosh(result).toString()); 
          } else {
              setData(Math.cosh(result).toString()); 
          }
      } catch (err) {
          setData("Error");
      }
  };

  const tanh = () => {
    let result;
    try {
        result = eval(data);  
        if (inverse) {
            setData(Math.atanh(result).toString()); 
        } else {
            setData(Math.tanh(result).toString()); 
        }
    } catch (err) {
        setData("Error");
    }
};

    const factorial = (n) => {
      if (n === 0 || n === 1) return 1;
      return n * factorial(n - 1);
    };
  
    const handleFactorial = () => {
      setData(factorial(Number(data)).toString());
    };

    const root ='\u221A'

  return (
    <>
    <div className="screen">
        <div className="top">
            <input type="text" value={data}/>
        </div>

        <div className="items">
          

            <button onClick={getValue} value="(">(</button>
            <button onClick={getValue} value=")">)</button>
            <button onClick={allClear} value="mc">mc</button>
            <button onClick={getValue} value="m+">m+</button>
            <button onClick={backspace} value="m-">m-</button>
            <button onClick={getValue} value="mr">mr</button>
            <button onClick={allClear} value="C">C</button>
            <button onClick={getValue} value="**">+/-</button>
            <button onClick={getValue} value="%">%</button>
            <button onClick={getValue} value="/" style={{background:"rgb(238, 161, 19)"}}>  /</button>
        
            
            <button onClick={ ()=> setInverse(!inverse)} >2<sup>nd</sup></button>
            <button onClick={()=>{setData(Math.pow(data,2).toString())}} >x<sup>2</sup></button>
            <button onClick={()=>{setData(Math.pow(data,3).toString())}}>x<sup>3</sup></button>
            
            {/* buttons to calculate power */}
            <button onClick={()=>{
              setReversePow(false);
              setData(data.concat('^'))
            }} 
            value="^">x<sup>y</sup></button>
            
            <button onClick={()=>{
              setReversePow(true);
              setData(data.concat('^'))
            }} 
            value="^">y<sup>x</sup></button>
            <button onClick={()=>{setData(Math.pow(2,data).toString())}}>2<sup>x</sup></button>

            

            <button onClick={getValue} value="7">7</button>
            <button onClick={getValue} value="8">8</button>
            <button onClick={getValue} value="9">9</button>
            <button onClick={getValue} value="*"  style={{background:"rgb(238, 161, 19)"}}>*</button>
            <button onClick={()=>{setData(eval(1/data).toString())}} value="/1"><sup>1</sup>/<sub>x</sub></button>
            <button onClick={()=>{setData(Math.sqrt(data).toString())}}><sup>2</sup>{root} x</button>
            <button onClick={()=>{setData(Math.cbrt(data).toString())}}><sup>3</sup>{root} x</button>
            <button onClick={getValue} value="<sup>y</sup>{root}x"><sup>y</sup>{root} x</button>
            <button onClick={getValue} value="log<sub>y</sub>">log<sub>y</sub></button>
            <button onClick={()=>{setData(Math.log2(data))}} value="log<sub>2</sub>">log<sub>2</sub> </button>
            <button onClick={getValue} value="4">4</button>
            <button onClick={getValue} value="5">5</button>
            <button onClick={getValue} value="6">6</button>
            <button onClick={getValue} value="-"  style={{background:"rgb(238, 161, 19)"}}>-</button>
            
            <button onClick={handleFactorial} value="x!">x!</button>
            
            {/* trigono fns */}
            <button onClick={sin} value="sin">{inverse ? ( <>  sin<sup>-1</sup> </>) : ("sin" )}</button>
            <button onClick={cos} value="cos">{inverse ? ( <>  cos<sup>-1</sup> </>) : ("cos" )}</button>
            <button onClick={tan} value="tan">{inverse ? ( <>  tan<sup>-1</sup> </>) : ("tan" )}</button>
            
            {/* </button> */}
            <button onClick={()=>{setData(Math.exp(data).toString())}} value="e">e</button>
            <button onClick={getValue} value="EE">EE</button>
            <button onClick={getValue} value="1">1</button>
            <button onClick={getValue} value="2">2</button>
            <button onClick={getValue} value="3">3</button>
            <button onClick={getValue} value="+"  style={{background:"rgb(238, 161, 19)"}}>+</button>

            <button onClick={getValue} value="Rad">Rad</button>
            {/* inverse trigonom. */}
            <button onClick={sinh} value="sinh">{inverse ? ( <>  sinh<sup>-1</sup> </>) : ("sinh" )}</button>
            <button onClick={cosh} value="cosh">{inverse ? ( <>  cosh<sup>-1</sup> </>) : ("cosh" )}</button>
            <button onClick={tanh} value="tanh">{inverse ? ( <>  tanh<sup>-1</sup> </>) : ("tanh" )}</button>
            
            <button onClick={()=>{setData(Math.PI.toString())}} >&pi;</button> 
            <button onClick={()=>{setData(Math.random().toString())}} value="Rand">Rand</button>
            <button onClick={getValue} value="0">0</button>
            <button onClick={getValue} value="6">6</button>
            <button onClick={getValue} value=".">.</button>
            <button onClick={calculate}  style={{background:"rgb(238, 161, 19)"}}>=</button>

            
        </div>
    </div>
    </>
  )
}

export default Calc