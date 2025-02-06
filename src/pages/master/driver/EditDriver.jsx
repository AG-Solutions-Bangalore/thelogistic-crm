import React, { useEffect, useState } from "react";
import Layout from "../../../layout/Layout";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import BASE_URL from "../../../base/BaseUrl";
import { toast } from "sonner";
import { IconArrowBack, IconInfoCircle } from "@tabler/icons-react";

const status = [
  {
    value: "Active",
    label: "Active",
  },
  {
    value: "Inactive",
    label: "Inactive",
  },
];

const vehicleType = [
  {
    value: "6W Truck",
    label: "6W Truck",
  },
  {
    value: "10W Truck",
    label: "10W Truck",
  },
];
const EditDriver = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [driver, setDriver] = useState({
    full_name: "",
    email: "",
    mobile: "",
    user_company: "",
    vehicle_type: "",
    user_address: "",
    dl_no: "",
    dl_expiry: "",
    hazard_lice_no: "",
    user_status: "",
    user_branch: "",
    user_insurance: "",
    user_insurance_no: "",
    user_bank: "",
    user_bank_branch: "",
    user_account_no: "",
    user_ifsc_code: "",
    user_image: "",
    user_adhar_card: "",
    user_pan_card: "",
    user_passbook: "",
    user_licence: "",
  });

  const [selectedFile1, setSelectedFile1] = useState(null);
  const [selectedFile2, setSelectedFile2] = useState(null);
  const [selectedFile3, setSelectedFile3] = useState(null);
  const [selectedFile4, setSelectedFile4] = useState(null);
  const [selectedFile5, setSelectedFile5] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [company, setCompany] = useState([]);
  const [branch, setBranch] = useState([]);
  const fetchEditDriver = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${BASE_URL}/api/web-fetch-driver-by-id/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setDriver(response.data?.driver);
    } catch (error) {
      console.error("Error fetching  driver edit master data", error);
    } finally {
      setLoading(false);
    }
  };
  const fetchCompany = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await axios.get(`${BASE_URL}/api/web-fetch-company`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setCompany(response.data?.company);
    } catch (error) {
      console.error("Error fetching  driver master data", error);
    } finally {
      setLoading(false);
    }
  };
  const fetchBranch = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await axios.get(`${BASE_URL}/api/web-fetch-branch`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setBranch(response.data?.branch);
    } catch (error) {
      console.error("Error fetching  driver master data", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEditDriver();
    fetchCompany();
    fetchBranch();
  }, []);

  const validateOnlyDigits = (inputtxt) => {
    var phoneno = /^\d+$/;
    if (inputtxt.match(phoneno) || inputtxt.length == 0) {
      return true;
    } else {
      return false;
    }
  };

  const onInputChange = (e) => {
    if (e.target.name == "mobile") {
      if (validateOnlyDigits(e.target.value)) {
        setDriver({
          ...driver,
          [e.target.name]: e.target.value,
        });
      }
    } else {
      setDriver({
        ...driver,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = document.getElementById("addIndiv");
    if (!form.checkValidity()) {
      toast.error("Fill all required");
      setIsButtonDisabled(false);

      return;
    }
    const data = new FormData();
    data.append("full_name", driver.full_name);
    data.append("email", driver.email);
    data.append("mobile", driver.mobile);
    data.append("user_company", driver.user_company);
    data.append("vehicle_type", driver.vehicle_type);
    data.append("user_address", driver.user_address);
    data.append("dl_no", driver.dl_no);
    data.append("dl_expiry", driver.dl_expiry);
    data.append("hazard_lice_no", driver.hazard_lice_no);
    data.append("hazard_lice_expiry", driver.hazard_lice_expiry);
    data.append("user_branch", driver.user_branch);
    data.append("user_insurance", driver.user_insurance);
    data.append("user_insurance_no", driver.user_insurance_no);
    data.append("user_bank", driver.user_bank);
    data.append("user_bank_branch", driver.user_bank_branch);
    data.append("user_account_no", driver.user_account_no);
    data.append("user_ifsc_code", driver.user_ifsc_code);
    data.append("user_status", driver.user_status);
    data.append("user_image", selectedFile1);
    data.append("user_adhar_card", selectedFile2);
    data.append("user_pan_card", selectedFile3);
    data.append("user_passbook", selectedFile4);
    data.append("user_licence", selectedFile5);

    setIsButtonDisabled(true);
    axios({
      url: BASE_URL + `/api/web-update-driver/${id}?_method=PUT`,
      method: "POST",
      data,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then((res) => {
      if (res.data.code == 200) {
        toast.success(res.data.msg);
      } else if (res.data.code == 400) {
        toast.error(res.data.msg);
      }
      navigate("/master/driver-list");
    });
  };

  const FormLabel = ({ children, required }) => (
    <label className="block text-sm font-semibold text-black mb-1 ">
      {children}
      {required && <span className="text-red-500 ml-1">*</span>}
    </label>
  );

  const inputClassSelect =
    "w-full px-3 py-2 text-xs border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 border-blue-500";
  const inputClass =
    "w-full px-3 py-2 text-xs border rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-500 border-blue-500";
  return (
    <Layout>
      <div className=" bg-[#FFFFFF] p-2  rounded-lg  ">
        <div className="sticky top-0 p-2  mb-4 border-b-2 border-red-500 rounded-lg  bg-[#E1F5FA] ">
          <h2 className=" px-5 text-[black] text-lg   flex flex-row  justify-between items-center  rounded-xl p-2 ">
            <div className="flex  items-center gap-2">
              <IconInfoCircle className="w-4 h-4" />
              <span>Edit Driver </span>
            </div>
            <IconArrowBack
              onClick={() => navigate("/master/driver-list")}
              className="cursor-pointer hover:text-red-600"
            />
          </h2>
        </div>
        <hr />
        <form
          onSubmit={handleSubmit}
          id="addIndiv"
          className="w-full max-w-7xl  rounded-lg mx-auto p-4 space-y-6 "
        >
          <div className="grid grid-cols-1  md:grid-cols-1 lg:grid-cols-4   gap-6">
            {/* Driver Name  */}
            <div>
              <FormLabel required>Driver Name</FormLabel>
              <input
                disabled
                type="text"
                name="full_name"
                value={driver.full_name}
                onChange={(e) => onInputChange(e)}
                className={`${inputClass} cursor-not-allowed opacity-50`}
                required
              />
            </div>

            {/* Company  */}
            <div>
              <FormLabel required>Company</FormLabel>
              <select
                name="user_company"
                value={driver.user_company}
                onChange={(e) => onInputChange(e)}
                required
                className={inputClassSelect}
              >
                <option value="">Select Company </option>
                {company.map((option) => (
                  <option key={option.company_name} value={option.company_name}>
                    {option.company_name}
                  </option>
                ))}
              </select>
            </div>
            {/* Branch  */}
            <div>
              <FormLabel required>Branch</FormLabel>
              <select
                name="user_branch"
                value={driver.user_branch}
                onChange={(e) => onInputChange(e)}
                required
                className={inputClassSelect}
              >
                <option value="">Select Branch </option>
                {branch.map((option) => (
                  <option key={option.branch_name} value={option.branch_name}>
                    {option.branch_name}
                  </option>
                ))}
              </select>
            </div>
            {/* Mobile  */}
            <div>
              <FormLabel required>Mobile</FormLabel>
              <input
                maxLength={10}
                type="tel"
                required
                name="mobile"
                value={driver.mobile}
                onChange={(e) => onInputChange(e)}
                className={inputClass}
              />
            </div>

            {/* Address  */}
            <div className="col-span-0 lg:col-span-4">
              <FormLabel required>Address</FormLabel>
              <textarea
                type="text"
                name="user_address"
                value={driver.user_address}
                onChange={(e) => onInputChange(e)}
                className={inputClass}
                required
                rows={3}
              />
            </div>

            {/* Email  */}
            <div>
              <FormLabel>Email</FormLabel>
              <input
                type="email"
                name="email"
                value={driver.email}
                onChange={(e) => onInputChange(e)}
                className={inputClass}
              />
            </div>

            {/* Vechile  */}
            <div>
              <FormLabel required>Vechile</FormLabel>
              <select
                name="vehicle_type"
                value={driver.vehicle_type}
                onChange={(e) => onInputChange(e)}
                required
                className={inputClassSelect}
              >
                <option value="">Select Vechile </option>
                {vehicleType.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.value}
                  </option>
                ))}
              </select>
            </div>
            {/* DL No  */}
            <div>
              <FormLabel>DL No</FormLabel>
              <input
                type="text"
                name="dl_no"
                value={driver.dl_no}
                onChange={(e) => onInputChange(e)}
                className={inputClass}
              />
            </div>
            {/*DL Expiry  */}
            <div>
              <FormLabel>DL Expiry</FormLabel>
              <input
                type="date"
                name="dl_expiry"
                value={driver.dl_expiry}
                onChange={(e) => onInputChange(e)}
                className={inputClass}
              />
            </div>
            {/*Hazard Lice No  */}
            <div>
              <FormLabel>Hazard Lice No</FormLabel>
              <input
                type="text"
                name="hazard_lice_no"
                value={driver.hazard_lice_no}
                onChange={(e) => onInputChange(e)}
                className={inputClass}
              />
            </div>
            {/*Hazard Lice Expiry  */}
            <div>
              <FormLabel>Hazard Lice Expiry</FormLabel>
              <input
                type="date"
                name="hazard_lice_expiry"
                value={driver.hazard_lice_expiry}
                onChange={(e) => onInputChange(e)}
                className={inputClass}
              />
            </div>
            {/* Bank  */}
            <div>
              <FormLabel>Bank</FormLabel>
              <input
                type="text"
                name="user_bank"
                value={driver.user_bank}
                onChange={(e) => onInputChange(e)}
                className={inputClass}
              />
            </div>
            {/* Bank Branch  */}
            <div>
              <FormLabel>Bank Branch</FormLabel>
              <input
                type="text"
                name="user_bank_branch"
                value={driver.user_bank_branch}
                onChange={(e) => onInputChange(e)}
                className={inputClass}
              />
            </div>
            {/* Bank IFSC  */}
            <div>
              <FormLabel>Bank IFSC</FormLabel>
              <input
                type="text"
                name="user_ifsc_code"
                value={driver.user_ifsc_code}
                onChange={(e) => onInputChange(e)}
                className={inputClass}
              />
            </div>
            {/* Account No  */}
            <div>
              <FormLabel>Account No</FormLabel>
              <input
                type="text"
                name="user_account_no"
                value={driver.user_account_no}
                onChange={(e) => onInputChange(e)}
                className={inputClass}
              />
            </div>
            {/* Insurance  */}
            <div>
              <FormLabel>Insurance</FormLabel>
              <input
                type="text"
                name="user_insurance"
                value={driver.user_insurance}
                onChange={(e) => onInputChange(e)}
                className={inputClass}
              />
            </div>
            {/* Insurance No  */}
            <div>
              <FormLabel>Insurance No</FormLabel>
              <input
                type="text"
                name="user_insurance_no"
                value={driver.user_insurance_no}
                onChange={(e) => onInputChange(e)}
                className={inputClass}
              />
            </div>
            {/* Status  */}
            <div>
              <FormLabel required>Status</FormLabel>
              <select
                name="user_status"
                value={driver.user_status}
                onChange={(e) => onInputChange(e)}
                required
                className={inputClassSelect}
              >
                <option value="">Select Status </option>
                {status.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            {/* Photo */}
            <div>
              <FormLabel>Photo</FormLabel>
              <input
                type="file"
                name="user_image"
                onChange={(e) => setSelectedFile1(e.target.files[0])}
                className="w-full px-3 py-1 text-xs border rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-500 border-blue-500 file:mr-4 file:py-1 file:px-2 file:rounded-lg file:border-0 file:text-xs  file:bg-[#E1F5FA] file:text-black  cursor-not-allowed  "
              />
              <span className="text-[11px] p-1 ml-2 text-red-900">
                {driver?.user_image}
              </span>
            </div>
            {/* Aadhar Card */}
            <div>
              <FormLabel>Aadhar Card</FormLabel>
              <input
                type="file"
                name="user_adhar_card"
                onChange={(e) => setSelectedFile2(e.target.files[0])}
                className="w-full px-3 py-1 text-xs border rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-500 border-blue-500 file:mr-4 file:py-1 file:px-2 file:rounded-lg file:border-0 file:text-xs  file:bg-[#E1F5FA] file:text-black  cursor-not-allowed  "
              />
              <span className="text-[11px] p-1 ml-2 text-red-900">
                {driver?.user_adhar_card}
              </span>
            </div>
            {/* PAN Card */}
            <div>
              <FormLabel>PAN Card</FormLabel>
              <input
                type="file"
                name="user_pan_card"
                onChange={(e) => setSelectedFile3(e.target.files[0])}
                className="w-full px-3 py-1 text-xs border rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-500 border-blue-500 file:mr-4 file:py-1 file:px-2 file:rounded-lg file:border-0 file:text-xs  file:bg-[#E1F5FA] file:text-black  cursor-not-allowed  "
              />
              <span className="text-[11px] p-1 ml-2 text-red-900">
                {driver?.user_pan_card}
              </span>
            </div>
            {/* Pass Book */}
            <div>
              <FormLabel>Pass Book</FormLabel>
              <input
                type="file"
                name="user_passbook"
                onChange={(e) => setSelectedFile4(e.target.files[0])}
                className="w-full px-3 py-1 text-xs border rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-500 border-blue-500 file:mr-4 file:py-1 file:px-2 file:rounded-lg file:border-0 file:text-xs  file:bg-[#E1F5FA] file:text-black  cursor-not-allowed  "
              />
              <span className="text-[11px] p-1 ml-2 text-red-900">
                {driver?.user_passbook}
              </span>
            </div>
            {/* Licence */}
            <div>
              <FormLabel>Licence</FormLabel>
              <input
                type="file"
                name="user_licence"
                onChange={(e) => setSelectedFile5(e.target.files[0])}
                className="w-full px-3 py-1 text-xs border rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-500 border-blue-500 file:mr-4 file:py-1 file:px-2 file:rounded-lg file:border-0 file:text-xs  file:bg-[#E1F5FA] file:text-black  cursor-not-allowed  "
              />
              <span className="text-[11px] p-1 ml-2 text-red-900">
                {driver?.user_licence}
              </span>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex flex-wrap gap-4 justify-start">
            <button
              type="submit"
              className="text-center text-sm font-[400] cursor-pointer  w-36 text-white bg-blue-600 hover:bg-green-700 p-2 rounded-lg shadow-md"
              disabled={isButtonDisabled}
            >
              {isButtonDisabled ? "Updating..." : "Update"}
            </button>

            <button
              type="button"
              className="text-center text-sm font-[400] cursor-pointer  w-36 text-white bg-red-600 hover:bg-red-400 p-2 rounded-lg shadow-md"
              onClick={() => {
                navigate("/master/driver-list");
              }}
            >
              Back
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default EditDriver;
