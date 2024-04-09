import { useState } from "react";
import { ethers } from "ethers";
import abi from "@/abi/contract.json";
import toast from "react-hot-toast";

import { josefinSans } from "@/global/fonts/jose";
import classnames from "@/functions/utils/classnames";
import Certificate from "../Certificate";
import { format, getHash } from "@zero-forgery/common";

function UCertificate() {
  const [name, setName] = useState("");
  const [school, setSchool] = useState("");
  const [date, setDate] = useState("");
  const [department, setDepartment] = useState("");
  const [ID, setID] = useState("");

  const handleSubmit = async (e: any) => {
    // 0x27a922Ebc818e3c50D6F59fCe655c722c4e6cB43
    e.preventDefault();
    if (window.ethereum !== undefined) {
      const provider = new ethers.providers.Web3Provider(
        window.ethereum as any
      );
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        "0x27a922Ebc818e3c50D6F59fCe655c722c4e6cB43",
        abi,
        signer
      );
      // hash = keccak256(name + school + date + department + registrar + ID)
      // büyük I yı -> küçük i yapıyor
      const formatted = format(name + school + date + department + ID);
      const hash = getHash(formatted);
      const checkIfCertificateExists = await contract.certificates(hash);
      if (checkIfCertificateExists.hash === hash) {
        toast.error("Certificate already exists");
        return;
      }
      const tx = await contract.createCertificate(hash);
      await tx.wait();
      toast.success("Certificate created successfully");
      setShow(true);
    } else {
      toast.error("Please install metamask");
    }
  };
  const [show, setShow] = useState<boolean>(false);
  return (
    <div className={classnames("w-[23rem] ", josefinSans.className)}>
      {show && (
        <Certificate
          name={name}
          school={school}
          date={date}
          department={department}
          ID={ID}
          setShow={setShow}
        />
      )}
      {/** GET TCKN, GET NAME, GET SCHOOL NAME, GET DATE, GET DEPARTMENT, REGISTRAR (WILL BE SIGNATURE) */}
      <form
        className="z-10 w-full border-2 border-[#f7c655] px-12 py-6 flex flex-col space-y-4 rounded-3xl"
        onSubmit={handleSubmit}
        onChange={(e) => {
          const { name, value } = e.target as any;
          switch (name) {
            case "name":
              setName(value);
              break;
            case "school":
              setSchool(value);
              break;
            case "date":
              setDate(value);
              break;
            case "department":
              setDepartment(value);
              break;

            case "ID":
              setID(value);
              break;
            default:
              break;
          }
        }}>
        <div>
          <h1 className="form-header text-center">NAME</h1>
          <input
            className="form-input"
            required
            placeholder="ENTER THE FULL NAME"
            type="text"
            name="name"
            id="name"
          />
        </div>
        <div>
          <h1 className="form-header text-center">SCHOOL</h1>
          <input
            className="form-input"
            required
            placeholder="ENTER THE SCHOOL"
            type="text"
            name="school"
            id="school"
          />
        </div>
        <div>
          <h1 className="form-header text-center">DATE</h1>
          <input
            className="form-input"
            required
            placeholder="ENTER THE DATE"
            type="date"
            name="date"
            id="date"
          />
        </div>
        <div>
          <h1 className="form-header text-center">DEPARTMENT</h1>
          <input
            className="form-input"
            required
            placeholder="ENTER THE DEPARTMENT"
            type="text"
            name="department"
            id="department"
          />
        </div>

        <div>
          <h1 className="form-header text-center">ID</h1>
          <input
            className="form-input"
            required
            placeholder="ENTER THE ID"
            type="text"
            name="ID"
            id="ID"
          />
        </div>
        <button
          type="submit"
          className="text-xl font-bold hover:bg-gray-200 transition ease-in-out duration-300  !mt-8 bg-[#f7c655] border-[#f7c655] rounded-full text-black border w-48  mx-auto">
          GENERATE
        </button>
      </form>
    </div>
  );
}

export default UCertificate;
