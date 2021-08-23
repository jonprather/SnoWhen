import React, { useState } from "react";
import Geocode from "react-geocode";
import { setLocalAddress, getLocalAddress } from "../lib/LocalStorage";
export default function Location(props) {
  const [address, setAddress] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const resorts = [
    { name: "Mammoth", code: 619002 },
    { name: "Everest", code: 420 },
    { name: "K2", code: 4201 },
  ];

  ////////
  var [resort, setResort] = useState(null);
  // s
  function handleChange(resort) {
    //why is this shit not emmiting up or even handling it wtf is going on with this selct its not working as expect
    console.log("SLKDJF", resort);
    // console.log("SELECT", event.target.value);

    if (!getLocalAddress()) {
      setLocalAddress(resort);
    }

    props.emit(resort);
  }

  //when its a react component capitalize this shit but doesnt seem needed when not react
  return (
    <div className='locations__search-box'>
      <p className='locations__search-box-title'>Find a Resort</p>
      {isLoading && <span>Loading...</span>}

      {error && <span>Error {error.message}</span>}

      <label htmlFor='resort'> </label>
      <select
        name='resort'
        id='resort'
        value={resort}
        onChange={(event) => {
          setResort();
          handleChange(event.target.value);
          setResort();
        }}
      >
        <option value=''></option>
        {resorts.map((resort) => {
          return <option value={resort.code}>{resort.name}</option>;
        })}
      </select>
    </div>
  );
}

{
  /* <select onChange={this.onChangeUser}>
{users.map((user, index) => {
  return <option>{user.email}</option>;
})}
</select> */
}
