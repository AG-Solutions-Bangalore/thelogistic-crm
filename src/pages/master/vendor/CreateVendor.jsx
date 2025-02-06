import React, { useEffect, useState } from "react";
import Layout from "../../../layout/Layout";
import { useNavigate } from "react-router-dom";
import BASE_URL from "../../../base/BaseUrl";
import axios from "axios";
import { toast } from "sonner";
import { IconArrowBack, IconInfoCircle } from "@tabler/icons-react";

const VType = [
  {
    value: "Garage",
    label: "Garage",
  },
  {
    value: "Tyre",
    label: "Tyre",
  },
  {
    value: "Truck",
    label: "Truck",
  },
  {
    value: "Oil",
    label: "Oil",
  },
  {
    value: "Diesel",
    label: "Diesel",
  },
  {
    value: "Spare Parts",
    label: "Spare Parts",
  },
];

const VType_2 = [
  {
    value: "Tyre",
    label: "Tyre",
  },

  {
    value: "Oil",
    label: "Oil",
  },
];

const CreateVendor = () => {
  const navigate = useNavigate();
  const [vendor, setVendor] = useState({
    vendor_name: "",
    vendor_type: "",
    vendor_contact_person: "",
    vendor_mobile: "",
    vendor_email: "",
    vendor_address: "",
    vendor_gst: "",
    vendor_pan: "",
    vendor_branch: "",
  });

  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [branch, setBranch] = useState([]);

  const fetchBranch = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await axios.get(`${BASE_URL}/api/web-fetch-branch-com`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setBranch(response.data?.branch);
    } catch (error) {
      console.error("Error fetching  create vendor branch data", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
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
    if (e.target.name == "vendor_mobile") {
      if (validateOnlyDigits(e.target.value)) {
        setVendor({
          ...vendor,
          [e.target.name]: e.target.value,
        });
      }
    } else {
      setVendor({
        ...vendor,
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
    const data = {
      vendor_name: vendor.vendor_name,
      vendor_type: vendor.vendor_type,

      vendor_contact_person: vendor.vendor_contact_person,
      vendor_mobile: vendor.vendor_mobile,
      vendor_email: vendor.vendor_email,
      vendor_address: vendor.vendor_address,
      vendor_gst: vendor.vendor_gst,
      vendor_pan: vendor.vendor_pan,
      vendor_branch: vendor.vendor_branch,
    };

    setIsButtonDisabled(true);
    axios({
      url: BASE_URL + "/api/web-create-vendor",
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
      navigate("/master/vendor-list");
      setVendor({
        vendor_name: "",
        vendor_type: "",
        vendor_contact_person: "",
        vendor_mobile: "",
        vendor_email: "",
        vendor_address: "",
        vendor_gst: "",
        vendor_pan: "",
        vendor_branch: "",
      });
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
              <span>Add Vendor </span>
            </div>
            <IconArrowBack
              onClick={() => navigate("/master/vendor-list")}
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 ">
            <div className="md:col-span-2">
              <FormLabel required>Vendor</FormLabel>
              <input
                type="text"
                name="vendor_name"
                value={vendor.vendor_name}
                onChange={(e) => onInputChange(e)}
                className={inputClass}
                required
              />
            </div>

            {/* Branch  */}
            <div>
              <FormLabel required>Branch</FormLabel>
              <select
                name="vendor_branch"
                value={vendor.vendor_branch}
                onChange={(e) => onInputChange(e)}
                required
                className={inputClassSelect}
              >
                <option value="">Select Branch</option>
                {branch.map((option) => (
                  <option key={option.branch_name} value={option.branch_name}>
                    {option.branch_name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="grid grid-cols-1  md:grid-cols-1 lg:grid-cols-3   gap-6">
            {/* Vendor  */}

            {/* Vendor Type  */}
            <div>
              <FormLabel required>Vendor Type</FormLabel>
              <select
                name="vendor_type"
                value={vendor.vendor_type}
                onChange={(e) => onInputChange(e)}
                required
                className={inputClassSelect}
              >
                <option value="">Select Vendor Type</option>
                {vendor.vendor_branch == "COMMON"
                  ? VType_2.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))
                  : VType.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
              </select>
            </div>

            {/* Contact Person  */}
            <div>
              <FormLabel>Contact Person</FormLabel>
              <input
                type="text"
                name="vendor_contact_person"
                value={vendor.vendor_contact_person}
                onChange={(e) => onInputChange(e)}
                className={inputClass}
              />
            </div>

            {/*  Mobile  */}
            <div>
              <FormLabel> Mobile</FormLabel>
              <input
                type="tel"
                name="vendor_mobile"
                value={vendor.vendor_mobile}
                onChange={(e) => onInputChange(e)}
                className={inputClass}
                maxLength={10}
              />
            </div>
            {/* Contact Email  */}
            <div>
              <FormLabel>Contact Email</FormLabel>
              <input
                type="email"
                name="vendor_email"
                value={vendor.vendor_email}
                onChange={(e) => onInputChange(e)}
                className={inputClass}
              />
            </div>

            {/* Gst  */}
            <div>
              <FormLabel>GST</FormLabel>
              <input
                type="text"
                name="vendor_gst"
                value={vendor.vendor_gst}
                onChange={(e) => onInputChange(e)}
                className={inputClass}
                maxLength={15}
              />
            </div>

            {/* Pan No  */}
            <div>
              <FormLabel>PAN No</FormLabel>
              <input
                type="text"
                name="vendor_pan"
                value={vendor.vendor_pan}
                onChange={(e) => onInputChange(e)}
                className={inputClass}
                maxLength={10}
              />
            </div>

            {/* Address  */}
          </div>
          <div className="grid grid-cols-1">
            <FormLabel>Address</FormLabel>
            <textarea
              type="text"
              name="vendor_address"
              value={vendor.vendor_address}
              onChange={(e) => onInputChange(e)}
              className={inputClass}
              required
              rows={3}
            />
          </div>
          {/* Form Actions */}
          <div className="flex flex-wrap gap-4 justify-start">
            <button
              type="submit"
              className="text-center text-sm font-[400] cursor-pointer  w-36 text-white bg-blue-600 hover:bg-green-700 p-2 rounded-lg shadow-md"
              disabled={isButtonDisabled}
            >
              {isButtonDisabled ? "Sumbitting..." : "Sumbit"}
            </button>

            <button
              type="button"
              className="text-center text-sm font-[400] cursor-pointer  w-36 text-white bg-red-600 hover:bg-red-400 p-2 rounded-lg shadow-md"
              onClick={() => {
                navigate("/master/vendor-list");
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

export default CreateVendor;
