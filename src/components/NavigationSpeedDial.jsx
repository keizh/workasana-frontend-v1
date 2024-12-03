import { Button } from "@material-tailwind/react";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const navigationBTN = [
  { name: "Dashboard", match: "" },
  { name: "Teams", match: "teams" },
  { name: "Reports", match: "reports" },
];

function NavigationSpeedDial() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {}, []);

  return (
    <div className="hidden md:flex md:w-[18%] md:flex-col  pt-[8vh] gap-4">
      {navigationBTN.map((ele, index) => {
        const isActive = location.pathname === `/${ele.match}`;
        return (
          <Button
            onClick={() => navigate(`/${ele.match}`)}
            key={index}
            color={isActive ? "white" : "black"}
            className="w-32 mx-auto"
          >
            {ele.name}
          </Button>
        );
      })}
    </div>
  );
}

export default NavigationSpeedDial;
