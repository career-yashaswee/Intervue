import React, { useState } from "react";
import { Button, Header, Modal, Table } from "semantic-ui-react";
import "./Modals.css";
import Admin from "../abis/Admin.json";
import Employee from "../abis/Employee.json";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const GetInfoModal = ({
  isOpen,
  closeInfoModal,
  info,
  isEndorsementReq,
  org,
  admin,
}) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const createUser = async (e) => {
    e.preventDefault();
    const { ethAddress, name, location, role, description } = info;

    if (!name || !location || !description || !role || !ethAddress) {
      toast.error("Please fill all the fields!!");
      return;
    }

    setLoading(true);
    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts();
    const networkId = await web3.eth.net.getId();
    const AdminData = Admin.networks[networkId];

    if (AdminData) {
      const adminContract = new web3.eth.Contract(Admin.abi, AdminData.address);
      const owner = await adminContract.methods.owner().call();

      if (owner !== accounts[0]) {
        setLoading(false);
        toast.error("Sorry! You are not the Admin!!");
        return;
      }

      try {
        await adminContract.methods
          .registerUser(ethAddress, name, location, description, role)
          .send({ from: accounts[0] });
        toast.success("New user registered successfully!!!!");
        navigate(role === "1" ? "/" : "/all-organization-endorser");
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
  };

  const endorseEmployee = async () => {
    const { req } = info;
    const sections = {
      "Education Endorsement Request": 1,
      "Certification Endorsement Request": 2,
      "Work Experience Endorsement Request": 3,
    };
    const section = sections[req] || -1;

    setLoading(true);
    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts();
    const networkId = await web3.eth.net.getId();
    const AdminData = Admin.networks[networkId];

    if (AdminData) {
      const adminContract = new web3.eth.Contract(Admin.abi, AdminData.address);

      try {
        const employeeContractAddress = await adminContract.methods
          .getEmployeeContractByAddress(info.ethAddress)
          .call();
        const employeeContract = new web3.eth.Contract(
          Employee.abi,
          employeeContractAddress
        );

        if (section === 1) {
          await employeeContract.methods
            .endorseEducation()
            .send({ from: accounts[0] });
        } else if (section === 2) {
          await employeeContract.methods
            .endorseCertification(info.name)
            .send({ from: accounts[0] });
        } else if (section === 3) {
          await employeeContract.methods
            .endorseWorkExp()
            .send({ from: accounts[0] });
        }

        toast.success("Endorsement completed successfully!");
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    closeInfoModal();
  };

  const renderTableRows = () => {
    const {
      req,
      institute,
      description,
      startdate,
      enddate,
      name,
      score,
      role,
      organization,
      ethAddress,
    } = info;
    switch (req) {
      case "Education Endorsement Request":
        return (
          <>
            <Table.Row>
              <Table.Cell>
                <p style={{ fontWeight: "700" }}>Institute</p>
              </Table.Cell>
              <Table.Cell>
                <p>{institute}</p>
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>
                <p style={{ fontWeight: "700" }}>Description</p>
              </Table.Cell>
              <Table.Cell>
                <p>{description}</p>
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>
                <p style={{ fontWeight: "700" }}>Start date</p>
              </Table.Cell>
              <Table.Cell>
                <p>{startdate}</p>
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>
                <p style={{ fontWeight: "700" }}>End date</p>
              </Table.Cell>
              <Table.Cell>
                <p>{enddate}</p>
              </Table.Cell>
            </Table.Row>
          </>
        );
      case "Certification Endorsement Request":
        return (
          <>
            <Table.Row>
              <Table.Cell>
                <p style={{ fontWeight: "700" }}>Name</p>
              </Table.Cell>
              <Table.Cell>
                <p>{name}</p>
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>
                <p style={{ fontWeight: "700" }}>Organization</p>
              </Table.Cell>
              <Table.Cell>
                <p>{organization}</p>
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>
                <p style={{ fontWeight: "700" }}>Score</p>
              </Table.Cell>
              <Table.Cell>
                <p>{score}</p>
              </Table.Cell>
            </Table.Row>
          </>
        );
      case "Work Experience Endorsement Request":
        return (
          <>
            <Table.Row>
              <Table.Cell>
                <p style={{ fontWeight: "700" }}>Role</p>
              </Table.Cell>
              <Table.Cell>
                <p>{role}</p>
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>
                <p style={{ fontWeight: "700" }}>Organization</p>
              </Table.Cell>
              <Table.Cell>
                <p>{organization}</p>
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>
                <p style={{ fontWeight: "700" }}>Description</p>
              </Table.Cell>
              <Table.Cell>
                <p>{description}</p>
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>
                <p style={{ fontWeight: "700" }}>Start Date</p>
              </Table.Cell>
              <Table.Cell>
                <p>{startdate}</p>
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>
                <p style={{ fontWeight: "700" }}>End Date</p>
              </Table.Cell>
              <Table.Cell>
                <p>{enddate}</p>
              </Table.Cell>
            </Table.Row>
          </>
        );
      default:
        return (
          <>
            <Table.Row>
              <Table.Cell>
                <p style={{ fontWeight: "700" }}>Name</p>
              </Table.Cell>
              <Table.Cell>
                <p>{info.name}</p>
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>
                <p style={{ fontWeight: "700" }}>Eth Address</p>
              </Table.Cell>
              <Table.Cell>
                <p>{ethAddress}</p>
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>
                <p style={{ fontWeight: "700" }}>Location</p>
              </Table.Cell>
              <Table.Cell>
                <p>{info.location}</p>
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>
                <p style={{ fontWeight: "700" }}>Description</p>
              </Table.Cell>
              <Table.Cell>
                <p>{description}</p>
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>
                <p style={{ fontWeight: "700" }}>Role Requested</p>
              </Table.Cell>
              <Table.Cell>
                <p>{role === "1" ? "Employee" : "Organization Endorser"}</p>
              </Table.Cell>
            </Table.Row>
          </>
        );
    }
  };

  return (
    <Modal open={isOpen} size="tiny" className="modal-des">
      <Header
        className="modal-heading"
        icon="pencil"
        content={isEndorsementReq ? info.req : "Info Provided to Admins"}
        as="h2"
      />
      <Modal.Content className="modal-content">
        <Table className="design-info-table">
          <Table.Row>
            <Table.HeaderCell>Fields</Table.HeaderCell>
            <Table.HeaderCell>Values Provided</Table.HeaderCell>
          </Table.Row>
          <hr style={{ border: "none", borderTop: "1px solid white" }} />
          <Table.Body>{renderTableRows()}</Table.Body>
        </Table>
      </Modal.Content>
      <Modal.Actions className="modal-actions">
        <Button
          className="close-button"
          type="button"
          color="red"
          icon="times"
          content="Close"
          onClick={closeInfoModal}
        />
        {isEndorsementReq && org && (
          <Button
            className="button-css"
            type="button"
            color="green"
            icon="save"
            content="Endorse"
            loading={loading}
            onClick={endorseEmployee}
          />
        )}
        {admin && !isEndorsementReq && (
          <Button
            className="button-css"
            type="button"
            color="green"
            icon="save"
            content="Register User"
            loading={loading}
            onClick={createUser}
          />
        )}
      </Modal.Actions>
    </Modal>
  );
};

export default GetInfoModal;
