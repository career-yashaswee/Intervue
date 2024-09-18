import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom"; // Import from react-router-dom
import axios from "axios"; // Import axios

const DeleteBlock = ({ id }) => {
  const navigate = useNavigate(); // React Router's useNavigate hook

  const deleteTicket = async () => {
    try {
      const res = await axios.delete(`http://localhost:8080/ticket/${id}`);
      if (res.status === 200) {
        navigate(0); // This forces a page refresh similar to router.refresh in Next.js
      }
    } catch (error) {
      console.error("Error deleting ticket:", error);
    }
  };

  return (
    <FontAwesomeIcon
      icon={faX}
      className="text-red-400 hover:cursor-pointer hover:text-red-200"
      onClick={deleteTicket}
    />
  );
};

export default DeleteBlock;
