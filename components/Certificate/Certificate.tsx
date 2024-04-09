import React, { useRef, useEffect } from "react";
import QRCode from "qrcode";
import classnames from "@/functions/utils/classnames";
import { josefinSans } from "@/global/fonts/jose";
//@ts-ignore
interface ICertificate {
  name: string;
  school: string;
  date: string;
  department: string;
  ID: string;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}

function Certificate({
  name,
  school,
  date,
  department,
  setShow,
  ID,
}: ICertificate) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      QRCode.toCanvas(
        canvas,
        name + ":" + school + ":" + date + ":" + department + ":" + ID,
        {
          width: 120,
        },

        (error) => {
          if (error) console.error(error);
          console.log("success!");
        }
      );
    }
  }, []);

  return (
    <div
      className={classnames(
        "absolute top-0 z-[100] left-0 w-full  h-screen bg-black bg-opacity-40",
        josefinSans.className
      )}>
      <div className="flex h-full items-center justify-center ">
        <div className="relative">
          <div
            onClick={() => {
              setShow(false);
            }}
            className="font-bold absolute z-[200] text-2xl text-black right-0 cursor-pointer top-0">
            <img className="w-8" src="/x.svg" />
          </div>

          <div className="flex flex-col text-lg font-bold text-black text-center absolute z-[200] top-6 left-44 space-y-4">
            <div className="relative text-3xl">
              CERTIFICATE
              <div className="w-[110%] absolute left-[-8px] bg-black h-0.5" />
            </div>
            <div className="name">Name: {name ? name : "Mehmet Alacalı"}</div>
            <div className="school">School: {school ? school : "ODTÜ"}</div>
            <div className="date">Date: {date ? date : "22-01-17"}</div>
            <div className="department">
              Department: {department ? department : "EEE"}
            </div>
            <div className="id ">ID: {ID ? ID : "ID"}</div>
          </div>
          <canvas
            className="absolute bottom-[-25px]  left-[38%] z-[200]"
            ref={canvasRef}></canvas>
          <img className=" scale-125" src="/certf.png" />
        </div>
      </div>
    </div>
  );
}

export default Certificate;
