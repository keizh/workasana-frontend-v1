import {
  IconButton,
  SpeedDial,
  SpeedDialHandler,
  SpeedDialContent,
  SpeedDialAction,
  Typography,
} from "@material-tailwind/react";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useLocation, useNavigate } from "react-router-dom";

const navigationBTN = [
  { name: "Dashboard", match: "" },
  { name: "Teams", match: "teams" },
  { name: "Reports", match: "reports" },
];

export function NavigationSideBar() {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <div className="absolute bottom-32 right-4 md:hidden">
      <SpeedDial>
        <SpeedDialHandler>
          <IconButton size="lg" className="rounded-full">
            <PlusIcon className="h-5 w-5 transition-transform group-hover:rotate-45" />
          </IconButton>
        </SpeedDialHandler>
        <SpeedDialContent>
          {navigationBTN.map((ele, index) => {
            const Active = location.pathname === `/${ele.match}`;
            return (
              <SpeedDialAction
                key={index}
                className="w-24"
                onClick={() => navigate(`/${ele.match}`)}
              >
                <Typography color={Active ? "black" : "blue"}>
                  {" "}
                  {ele.name}
                </Typography>
              </SpeedDialAction>
            );
          })}
        </SpeedDialContent>
      </SpeedDial>
    </div>
  );
}

export default NavigationSideBar;
