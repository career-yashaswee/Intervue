import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card, Dropdown, Form, Message } from "semantic-ui-react";
import "./NoRole.css";
import { messageAdmin } from "../../drizzle/api";

const NoRole = () => {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [role, setRole] = useState("0");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const roleOptions = [
    { key: "0", text: "No-Role-Selected", value: "0" },
    { key: "1", text: "Employee", value: "1" },
    { key: "2", text: "OrganizationEndorser", value: "2" },
  ];

  const handleDropdownSelect = (e, data) => {
    setRole(data.value);
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    if (id === "name") setName(value);
    else if (id === "location") setLocation(value);
    else if (id === "description") setDescription(value);
    else if (id === "message") setMessage(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const info = { name, description, role, location };
      await messageAdmin(info, message);
      setName("");
      setDescription("");
      setRole("0");
      setLocation("");
      setMessage("");
      setErrorMessage("");
      toast.success("Message sent to the admin successfully!");
    } catch (error) {
      console.log(error);
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="norole">
      <Card className="card-style">
        <Card.Content>
          <Card.Header centered>
            <h2 className="card-heading">Message Admin</h2>
            <small className="norole-heading-subtext">
              Message admin to get added on the blockchain
            </small>
          </Card.Header>
          <hr className="horizontal-line" />
          <br />
          <Form error={!!errorMessage} onSubmit={handleSubmit}>
            <Form.Field className="form-inputs-admin">
              <input
                id="name"
                placeholder="Your Name"
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
                placeholder="Your Location"
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
                placeholder="Brief Description"
                autoComplete="off"
                autoCorrect="off"
                value={description}
                onChange={handleChange}
              />
            </Form.Field>
            <br />
            <Form.Field className="form-inputs-admin">
              <Dropdown
                placeholder="Desired Role"
                fluid
                selection
                options={roleOptions}
                value={role}
                onChange={handleDropdownSelect}
              />
            </Form.Field>
            <br />
            <Form.Field className="form-inputs-admin">
              <textarea
                id="message"
                rows="4"
                placeholder="Short Message for Admin"
                autoComplete="off"
                autoCorrect="off"
                value={message}
                onChange={handleChange}
              />
            </Form.Field>
            <br />
            <Message error header="Oops!!" content={errorMessage} />
            <br />
            <div className="button-holder">
              <Button
                className="button-css-admin"
                type="submit"
                loading={loading}
              >
                Send
              </Button>
            </div>
          </Form>
        </Card.Content>
      </Card>
      <br />
    </div>
  );
};

export default NoRole;
