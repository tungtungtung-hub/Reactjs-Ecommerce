import React, { useState } from 'react';

export default function SearchBox(props) {
  const [name, setName] = useState('');
  const submitHandler = (e) => {
    e.preventDefault();
    props.history.push(`/search/name/${name}`);
  };
  return (
    
    <form className="search-container" onSubmit={submitHandler}>
      &nbsp;
      
        <input
          type="text"
          name="q"
          id="q"
          placeholder="Search.."
          onChange={(e) => setName(e.target.value)}
        ></input>
        
     
    </form>
  );
}
