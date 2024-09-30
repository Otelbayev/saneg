import React, { useState } from "react";
import {
  Content,
  Contents,
  Div,
  Form,
  Label,
  Name,
  Position,
  Input,
} from "./profile-style";
import { useAuthContext } from "../hooks/useAuthContext";
import img from "../assets/admin.jpg";
import { message } from "antd";

const Profile = () => {
  const { user, dispatch } = useAuthContext();
  const [name, setName] = useState(user.name);
  const [surname, setSurname] = useState(user.surname);
  const [email, setEmail] = useState(user.email);
  const [pw1, setPw1] = useState("");
  const [pw2, setPw2] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!pw1 || !pw2) {
      message.error("Please enter password");
      return;
    }
    if (pw1 !== pw2) {
      message.error("Passwords do not match");
      return;
    }
    if (pw1 === pw2) {
      const response = await fetch("/api/admin/update-profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ name, surname, email, password: pw1 }),
      });
      const json = await response.json();
      if (response.ok) {
        message.success(json.message);
        localStorage.removeItem("user");
        dispatch({ type: "LOGOUT" });
        window.location.href = "/login";
      } else {
        message.error(json.message);
      }
    }
  };

  return (
    <Contents>
      <Content $none={"jasurbek"}>
        <img
          src={img}
          style={{
            width: "100px",
          }}
          alt=""
        />
        <Name>
          {user?.name} {"  "} {user?.surname}
        </Name>
        <Position>{email}</Position>
      </Content>
      <Content>
        <Form onSubmit={handleSubmit}>
          <Div>
            <Label>Name</Label>
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Div>
          <Div>
            <Label>Surname</Label>
            <Input
              type="text"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
            />
          </Div>
          <Div>
            <Label>Login</Label>
            <Input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Div>
          <Div>
            <Label>New Password</Label>
            <Input
              type="text"
              value={pw1}
              onChange={(e) => setPw1(e.target.value)}
            />
          </Div>
          <Div>
            <Label>Retype New Password</Label>
            <Input
              value={pw2}
              onChange={(e) => setPw2(e.target.value)}
              type="text"
            />
          </Div>
          <Div>
            <input className="btn btn-primary" type="submit" value={"Update"} />
          </Div>
        </Form>
      </Content>
    </Contents>
  );
};

export default Profile;
