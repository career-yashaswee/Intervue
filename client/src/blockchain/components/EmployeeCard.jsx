import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "semantic-ui-react";
import Web3 from "web3";
import Employee from "../abis/Employee.json";
import "./EmployeeCard.css";
import LoadComp from "./LoadComp";

const EmployeeCard = ({ employeeContractAddress }) => {
  const [employeedata, setEmployeeData] = useState({});
  const [skills, setSkills] = useState([]);
  const [certifications, setCertifications] = useState([]);
  const [workExps, setWorkExps] = useState([]);
  const [educations, setEducations] = useState([]);
  const [readmore, setReadMore] = useState(false);
  const [loadcomp, setLoadComp] = useState(false);

  const colour = ["#b6e498", "#61dafb", "#764abc", "#83cd29", "#00d1b2"];

  const navigate = useNavigate(); // Using the hook to replace `history.push`

  useEffect(() => {
    const init = async () => {
      if (typeof window !== "undefined" && typeof window.web3 !== "undefined") {
        const web3 = new Web3(window.web3.currentProvider);
        const EmployeeContract = new web3.eth.Contract(
          Employee.abi,
          employeeContractAddress
        );

        await getSkills(EmployeeContract);
        await getCertifications(EmployeeContract);
        await getWorkExp(EmployeeContract);
        await getEducation(EmployeeContract);

        const employeeInfo = await EmployeeContract.methods
          .getEmployeeInfo()
          .call();
        const newEmployedata = {
          ethAddress: employeeInfo[0],
          name: employeeInfo[1],
          location: employeeInfo[2],
          description: employeeInfo[3],
          overallEndorsement: employeeInfo[4],
          endorsecount: employeeInfo[5],
        };

        setEmployeeData(newEmployedata);
      } else {
        console.error("Web3 is not available. Please check your provider.");
      }
    };

    init();
  }, [employeeContractAddress]);

  const getSkills = async (EmployeeContract) => {
    const skillCount = await EmployeeContract.methods.getSkillCount().call();
    const skillsArray = await Promise.all(
      Array.from({ length: parseInt(skillCount) }, (_, index) =>
        EmployeeContract.methods.getSkillByIndex(index).call()
      )
    );

    const newskills = skillsArray.map((certi) => ({
      name: certi[0],
      overall_percentage: certi[1],
      experience: certi[2],
      endorsed: certi[3],
      endorser_address: certi[4],
      review: certi[5],
    }));

    setSkills(newskills);
  };

  const getCertifications = async (EmployeeContract) => {
    const certiCount = await EmployeeContract.methods
      .getCertificationCount()
      .call();
    const certificationsArray = await Promise.all(
      Array.from({ length: parseInt(certiCount) }, (_, index) =>
        EmployeeContract.methods.getCertificationByIndex(index).call()
      )
    );

    const newcertifications = certificationsArray.map((certi) => ({
      name: certi[0],
      organization: certi[1],
      score: certi[2],
      endorsed: certi[3],
    }));

    setCertifications(newcertifications);
  };

  const getWorkExp = async (EmployeeContract) => {
    const workExpCount = await EmployeeContract.methods
      .getWorkExpCount()
      .call();
    const workExpsArray = await Promise.all(
      Array.from({ length: parseInt(workExpCount) }, (_, index) =>
        EmployeeContract.methods.getWorkExpByIndex(index).call()
      )
    );

    const newworkExps = workExpsArray.map((work) => ({
      role: work[0],
      organization: work[1],
      startdate: work[2],
      enddate: work[3],
      endorsed: work[4],
      description: work[5],
    }));

    setWorkExps(newworkExps);
  };

  const getEducation = async (EmployeeContract) => {
    const educationCount = await EmployeeContract.methods
      .getEducationCount()
      .call();
    const educationsArray = await Promise.all(
      Array.from({ length: parseInt(educationCount) }, (_, index) =>
        EmployeeContract.methods.getEducationByIndex(index).call()
      )
    );

    const neweducation = educationsArray.map((certi) => ({
      institute: certi[0],
      startdate: certi[1],
      enddate: certi[2],
      endorsed: certi[3],
      description: certi[4],
    }));

    setEducations(neweducation);
  };

  const toEmployee = () => {
    navigate(`/getemployee/${employeeContractAddress}`);
  };

  return loadcomp ? (
    <LoadComp />
  ) : (
    <Card className="employee-card">
      <Card.Content>
        <Card.Header onClick={toEmployee} style={{ cursor: "pointer" }}>
          <span>{employeedata?.name}</span>
          <small>{employeedata.ethAddress}</small>
        </Card.Header>
        <br />
        <div>
          <p>
            <em>Location : </em>
            <span style={{ color: "#c5c6c7" }}>{employeedata?.location}</span>
          </p>
        </div>
        <br />
        <div>
          <em>Description :</em>
          <p style={{ color: "#c5c6c7" }}>{employeedata?.description}</p>
        </div>
        <br />
        <div>
          <em>Skills:</em>
          <div className="skill-holder">
            {skills?.map((skill, index) => (
              <div
                key={index}
                className="skill-design"
                style={{
                  color: "#c5c6c7",
                  border: `1px solid ${colour[index % 5]}`,
                }}
              >
                <p>{skill.name}</p>
              </div>
            ))}
          </div>
        </div>
        <br />
        {readmore ? (
          <div>
            {/* Education, Certifications, Work Experience sections */}
            <div className="readopenclose" onClick={() => setReadMore(false)}>
              <p>Hide</p>
            </div>
          </div>
        ) : (
          <div className="readopenclose" onClick={() => setReadMore(true)}>
            <p>...Read More</p>
          </div>
        )}
      </Card.Content>
    </Card>
  );
};

export default EmployeeCard;
