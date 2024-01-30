import { useEffect, useState } from "react";
import axios from "axios";

export const Appbar = () => {
  const [firstName, setFirstName] = useState("");

  useEffect(() => {
    const fetchName = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/api/v1/user/name",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem(token)}`,
            },
          }
        );
        setFirstName(response.data.firstName);
        console.log(firstName);
      } catch (error) {
        console.error("Error fetching name:", error);
      }
    };
    fetchName();
  }, []);

  return (
    <div className="shadow h-14 flex justify-between">
      <div className="flex flex-col justify-center h-full ml-4">PayTM App</div>
      <div className="flex">
        <div className="flex flex-col justify-center h-full mr-4">
          {firstName}
        </div>
        <div>{firstName}</div>
      </div>
    </div>
  );
};
