import React from "react";

export default function Card10({heroName,price,id}) {
  return (
    <div
      className="flex justify-center align-center rounded-xl  p-4 m-3"
      style={{
        border: "0.88px solid",

        backdropFilter: "saturate(180%) blur(14px)",
        background: " #ffffff0d",
      }}
    >
      <div>
        <img
          src="https://res.cloudinary.com/ddcg0rzlo/image/upload/v1652470298/9StaF0UBJfih_df0248.gif"
          alt="nft-gif"
          width="350"
          height="350"
          className="rounded-xl"
        />
      </div>
      <div className="flex flex-col  rounded-b-xl py-4 m-3">
        <div className="flex justify-between">
          <h1 className="font-RubikBold text-red-500">{heroName+"---||---"}</h1>
          <h1 className="font-bold font-RubikBold">Price</h1>
        </div>
        <div className="flex  justify-between font-mono">
          <p>#{id}</p>
          <p>{price}</p>
        </div>
      </div>
    </div>
  );
}
