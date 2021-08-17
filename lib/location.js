import React, { useState } from "react";
import Geocode from "react-geocode";
import { setLocalAddress, getLocalAddress } from "./LocalStorage";
export default function Location(props) {
  const [address, setAddress] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const getCoords = async function (input) {
    setIsLoading(true);
    return Geocode.fromAddress(input).then(
      (response) => {
        const { lat, lng } = response.results[0].geometry.location;

        setIsLoading(false);

        return { lat, lng };
      },
      (error) => {
        setError(error);
        setIsLoading(false);
        console.error(error);
      }
    );
  };

  ////////
  Geocode.setApiKey(process.env.NEXT_PUBLIC_MAPS);

  async function handleSubmit(event) {
    var coords;
    event.preventDefault();
    var localStorage;
    if ((localStorage = getLocalAddress(address))) {
      return props.emit(localStorage);
    }
    try {
      console.log("TRYYYYYYYYYYYYYYYYYY BLCOK FOR SUBMIT TO MAPS");
      coords = await getCoords(address);
    } catch (error) {
      setError(error);
      return;
    }
    setAddress("");
    if (coords) {
      setLocalAddress({ address, ...coords });
      props.emit({ address, ...coords });
    }
  }

  //when its a react component capitalize this shit but doesnt seem needed when not react
  return (
    <div className='locations__search-box'>
      <p className='locations__search-box-title'>Find a Location</p>
      {isLoading && <span>Loading...</span>}

      {error && <span>Error {error.message}</span>}

      <form onSubmit={handleSubmit}>
        <input
          className='locations__search-box-input'
          type='text'
          value={address}
          onChange={(event) => {
            setAddress(event.target.value);
            setError("");
          }}
        ></input>
        <button>Submit</button>
      </form>
    </div>
  );
}
