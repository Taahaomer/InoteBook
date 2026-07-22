import React from 'react'

function Alert({ alert }) {

    if (!alert) return <div style={{height:'50px'}}></div>;

    const capF = (word) => {
      if(word==="danger"){
        word="error"
      }
        const lower = word.toLowerCase();
        return lower.charAt(0).toUpperCase() + lower.slice(1);
    }

    return (
        <div style={{height:'50px'}}>
            <div className={`alert alert-${alert.type} alert-dismissible fade show`} role="alert">
                <strong>{capF(alert.type)}</strong> : {alert.message}
            </div>
        </div>
    );
  }

export default Alert;