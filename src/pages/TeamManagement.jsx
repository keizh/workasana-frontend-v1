import React from "react";
import NavigationSpeedDial from "../components/NavigationSpeedDial";
import NavigationSideBar from "../components/NavigationSideBar";
import NewTeam from "../components/NewTeam";
import { Typography } from "@material-tailwind/react";
import { useSelector } from "react-redux";
import KnowMore from "../components/KnowMore";
import useAuthCheck from "../utils/useAuthCheck";

function TeamManagement() {
  useAuthCheck();
  const { teams } = useSelector((state) => state.info);
  return (
    <div className="h-screen w-screen flex flex-col relative">
      <div className=" text-center font-mono text-3xl py-2">
        Team Managements
      </div>
      <div className="grow flex overflow-hidden">
        <NavigationSpeedDial />
        <NavigationSideBar />
        <div className="grow grid grid-rows-12 overflow-hidden py-5">
          <div className="row-span-11 p-4 overflow-x-hidden overflow-y-hidden flex flex-col">
            <Typography variant="h1" color="blue" textGradient>
              List Of Team
            </Typography>
            <div className="grow overflow-y-auto overflow-x-hidden border border-orange-300 rounded-xl p-3 flex flex-col gap-4 Vscrollbar">
              {teams?.length > 0 ? (
                teams?.map((ele, index) => (
                  <div
                    className="bg-white rounded-lg p-4 flex gap-2 flex-wrap "
                    key={index}
                  >
                    <Typography
                      variant="lead"
                      className="p-2 bg-orange-200 rounded-lg"
                    >
                      {ele.name}
                    </Typography>

                    <Typography
                      className="p-2 bg-[#8bc34a] rounded-lg"
                      variant="lead"
                    >
                      Created On :{" "}
                      {new Date(new Date(ele.createdAt)).toLocaleDateString(
                        "en-US",
                        {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        }
                      )}
                    </Typography>
                    <KnowMore
                      lable="Team Description"
                      description={ele.description}
                    />
                  </div>
                ))
              ) : (
                <Typography variant="h4" color="blue" textGradient>
                  No Teams's
                </Typography>
              )}
            </div>
          </div>
          <div className="row-span-1  flex items-center px-2">
            <NewTeam />
          </div>
        </div>
      </div>
    </div>
  );
}

export default TeamManagement;
