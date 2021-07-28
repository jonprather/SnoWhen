import React, { useState } from "react";
import Geocode from "react-geocode";

export default function Location(props) {
  const [address, setAddress] = useState("");

  Geocode.setApiKey(process.env.NEXT_PUBLIC_MAPS);

  async function handleSubmit(event) {
    event.preventDefault();
    // setAddress(address);

    const coordinates = await Geocode.fromAddress(address).then(
      (response) => {
        const { lat, lng } = response.results[0].geometry.location;
        console.log("IN getCoords", lat, lng);
        return { lat, lng };
      },
      (error) => {
        console.error(error);
      }
    );

    props.emit(coordinates);
  }
  function getCoordinates(address) {}
  //when its a react component capitalize this shit but doesnt seem needed when not react
  return (
    <div>
      Hi
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          value={address}
          onChange={(event) => setAddress(event.target.value)}
        ></input>
        <button>Submit</button>
      </form>
    </div>
  );
}
