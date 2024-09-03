import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  Dropdown,
  Form,
  Input,
  Message,
} from "semantic-ui-react";
import Admin from "../../abis/Admin.json";
import { toast } from "react-toastify";
import ScanQR from "../../components/ScanQR";
import "./Admin.css";

const CreateUser = () => {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [ethAddress, setEthAddress] = useState("");
  const [description, setDescription] = useState("");
  const [role, setRole] = useState("0");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [scanQR, setScanQR] = useState(false);

  const navigate = useNavigate();

  const roleOptions = [
    { key: "0", text: "No-Role-Selected", value: "0" },
    { key: "1", text: "Employee", value: "1" },
    { key: "2", text: "OrganizationEndorser", value: "2" },
  ];

  const handleDropdownSelect = (e, data) => setRole(data.value);

  const handleChange = (e) => {
    const { id, value } = e.target;
    if (id === "name") setName(value);
    if (id === "location") setLocation(value);
    if (id === "description") setDescription(value);
    if (id === "ethAddress") setEthAddress(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !location || !description || !role || !ethAddress) {
      toast.error("Please fill all the fields!!");
      return;
    }

    setLoading(true);
    setErrorMessage("");

    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts();
    const networkId = await web3.eth.net.getId();
    const AdminData = Admin.networks[networkId];

    if (AdminData) {
      const admin = new web3.eth.Contract(Admin.abi, AdminData.address);
      const owner = await admin.methods.owner().call();

      if (owner !== accounts[0]) {
        setErrorMessage("Sorry! You are not the Admin!!");
        setLoading(false);
        return;
      }

      try {
        await admin.methods
          .registerUser(ethAddress, name, location, description, role)
          .send({ from: accounts[0] });
        toast.success("New user registered successfully!");

        navigate(`${role === "1" ? "/" : "/all-organization-endorser"}`);
        setName("");
        setLocation("");
        setEthAddress("");
        setDescription("");
        setRole("0");
      } catch (err) {
        setErrorMessage(err.message);
      }
      setLoading(false);
    }
  };

  const closeScanQRModal = () => setScanQR(false);

  const handleAddAddress = (res) => setEthAddress(res);

  return (
    <>
      <ScanQR
        isOpen={scanQR}
        closeScanQRModal={closeScanQRModal}
        handleAddAddress={handleAddAddress}
      />
      <div className="create-user">
        <Card className="card-style">
          <Card.Content>
            <Card.Header centered>
              <h2 className="card-heading">Register New User</h2>
            </Card.Header>
            <hr className="horizontal-line"></hr>
            <br></br>
            <Form error={!!errorMessage}>
              <Form.Field className="form-inputs-admin">
                <input
                  id="name"
                  placeholder="Name"
                  autoComplete="off"
                  autoCorrect="off"
                  value={name}
                  onChange={handleChange}
                />
              </Form.Field>
              <br />
              <Form.Field className="form-inputs-admin">
                <input
                  id="location"
                  placeholder="Location"
                  autoComplete="off"
                  autoCorrect="off"
                  value={location}
                  onChange={handleChange}
                />
              </Form.Field>
              <br />
              <Form.Field className="form-inputs-admin">
                <input
                  id="description"
                  placeholder="Description"
                  autoComplete="off"
                  autoCorrect="off"
                  value={description}
                  onChange={handleChange}
                />
              </Form.Field>
              <br />
              <Form.Field className="form-inputs-admin">
                <Input action className="form-inputs-admin">
                  <input
                    id="ethAddress"
                    placeholder="0x0"
                    autoComplete="off"
                    autoCorrect="off"
                    value={ethAddress}
                    onChange={handleChange}
                  />
                  <Button
                    type="button"
                    content="QR"
                    icon="qrcode"
                    onClick={() => setScanQR(true)}
                  />
                </Input>
              </Form.Field>
              <br />
              <Form.Field className="form-inputs-admin">
                <Dropdown
                  placeholder="Select Role"
                  fluid
                  selection
                  options={roleOptions}
                  onChange={handleDropdownSelect}
                />
              </Form.Field>
              <br />
              <Message error header="Oops!!" content={errorMessage} />
              <br />
              <div className="button-holder">
                <Button
                  className="button-css-admin"
                  type="submit"
                  onClick={handleSubmit}
                  loading={loading}
                >
                  Register
                </Button>
              </div>
            </Form>
          </Card.Content>
        </Card>
      </div>
    </>
  );
};

export default CreateUser;
