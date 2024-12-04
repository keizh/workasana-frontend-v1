import React from "react";
import { Select, Option } from "@material-tailwind/react";
import PieChart from "../components/PieChart";
import NavigationSpeedDial from "../components/NavigationSpeedDial";
import NavigationSideBar from "../components/NavigationSideBar";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import useAuthCheck from "../utils/useAuthCheck";
import {
  fetchTotalDaysOff,
  fetchLastWeekReport,
  fetchClosedBy,
} from "../features/infoSlice";
import { Typography } from "@material-tailwind/react";

function Report() {
  useAuthCheck();
  const dispatch = useDispatch();
  const { teams, projects, lastWeekData, totalDaysOfWorkPending, taskClosed } =
    useSelector((state) => state.info);
  const { userId, name } = useSelector((state) => state.user);
  const [team, setTeam] = useState("");
  const [project, setProject] = useState("");
  const [owner, setOwner] = useState("");

  useEffect(() => {
    if (userId != "") {
      setOwner(userId);
      console.log(`userId`, userId);
      dispatch(fetchClosedBy({ who: "owners", whom: userId }));
    }
  }, [userId, dispatch]);

  useEffect(() => {
    if (teams.length > 0) {
      const id = teams[0]._id;
      setTeam(id);
      console.log(`teams`, teams[0]._id);
      dispatch(fetchClosedBy({ who: "team", whom: id }));
    }
  }, [teams, dispatch]);

  useEffect(() => {
    if (projects.length > 0) {
      const id = projects[0]._id;
      setTeam(id);
      console.log(`projects`, id);
      dispatch(fetchClosedBy({ who: "project", whom: id }));
    }
  }, [projects, dispatch]);

  // monitors state change
  useEffect(() => {
    if (project != "") {
      dispatch(fetchClosedBy({ who: "project", whom: project }));
    }
  }, [project, dispatch]);

  useEffect(() => {
    if (team != "") {
      dispatch(fetchClosedBy({ who: "team", whom: team }));
    }
  }, [team, dispatch]);

  useEffect(() => {
    dispatch(fetchTotalDaysOff());
    dispatch(fetchLastWeekReport());
  }, []);

  return (
    <div className="h-screen w-screen flex flex-col relative">
      <div className=" text-center font-mono text-3xl py-2">Reports</div>
      <div className="grow flex overflow-hidden">
        <NavigationSpeedDial />
        <NavigationSideBar />
        <div className="grow overflow-y-auto overflow-x-hidden  px-4">
          <Typography variant="h2" className="text-left mt-2 mb-4">
            Report Overview
          </Typography>
          <Typography variant="lead" className="my-2">
            <span className="font-black">Total Work Done Last Week</span> :{" "}
            {lastWeekData?.length || 0}
          </Typography>
          <Typography variant="lead" className="my-2">
            <span className="font-black">Total Days of Work Pending</span> :{" "}
            {totalDaysOfWorkPending || 0}
          </Typography>
          <div className="grid grid-cols-1 lg:grid-cols-2 pt-4 gap-5">
            {/* pie chart for team */}
            <div className="w-full h-full flex-col items-center justify-center ">
              <Typography variant="h5" className="text-center mt-2 mb-4">
                Team Task Report
              </Typography>
              <div className="w-36 text-center">
                {teams.length > 0 ? (
                  <Select
                    className="mx-auto"
                    onChange={(val) => setTeam(val)}
                    label="Team"
                  >
                    {teams.map((ele) => (
                      <Option default key={ele._id} value={ele._id}>
                        {ele.name}
                      </Option>
                    ))}
                  </Select>
                ) : (
                  "NO TEAMS EXIST"
                )}
              </div>
              <div className="my-4 w-full h-[400px]">
                {taskClosed.team != null && (
                  <PieChart
                    completedTasks={taskClosed?.team?.tct}
                    pendingTasks={taskClosed?.team?.tpt}
                    fallBack="No Task Has been assigned to this Team"
                  />
                )}
                {taskClosed.team == null && "PieChart Loading"}
              </div>
            </div>
            {/* pie chart for project */}
            <div className="w-full h-full flex-col items-center justify-center ">
              <Typography variant="h5" className="text-center mt-2 mb-4">
                Project Task Report
              </Typography>
              <div className="w-36 text-center">
                {projects.length > 0 ? (
                  <Select
                    className="mx-auto"
                    onChange={(val) => setProject(val)}
                    label="Project"
                  >
                    {projects?.map((ele) => (
                      <Option key={ele._id} value={ele._id}>
                        {ele.name}
                      </Option>
                    ))}
                  </Select>
                ) : (
                  "NO TEAMS EXIST"
                )}
              </div>
              <div className="my-4 w-full h-[400px]">
                {taskClosed.project != null && (
                  <PieChart
                    completedTasks={taskClosed?.project?.tct}
                    pendingTasks={taskClosed?.project?.tpt}
                    fallBack="No Task Has been assigned to this Project"
                  />
                )}
                {taskClosed.project == null && "PieChart Loading"}
              </div>
            </div>
            {/* pie chart for owner */}
            <div className="w-full h-full flex flex-col items-center justify-center ">
              <Typography variant="h5" className="text-center mt-2 mb-4">
                {name} task report
              </Typography>
              <div className="my-4 w-full h-[400px] ">
                {taskClosed.owners != null && (
                  <PieChart
                    completedTasks={taskClosed?.owners?.tct}
                    pendingTasks={taskClosed?.owners?.tpt}
                    fallBack="No Task Has been assigned to User"
                  />
                )}
                {taskClosed.owners == null && "PieChart Loading"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Report;
