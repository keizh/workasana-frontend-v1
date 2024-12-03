import NavigationSpeedDial from "../components/NavigationSpeedDial";
import NavigationSideBar from "../components/NavigationSideBar";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSpecificTask } from "../features/infoSlice";
import { useParams } from "react-router-dom";
import { Typography, Chip, Checkbox } from "@material-tailwind/react";
import { markCompletedASYNC, markCompletedSYNC } from "../features/userSlice";
import { markSTCompletedSYNC, removeST } from "../features/infoSlice";
import useAuthCheck from "../utils/useAuthCheck";

function TaskDetail() {
  useAuthCheck();
  const dispatch = useDispatch();
  const { id } = useParams();
  const { specificTask } = useSelector((state) => state.info);
  useEffect(() => {
    dispatch(fetchSpecificTask(id));
    return () => {
      dispatch(removeST());
    };
  }, [dispatch]);

  return (
    <div className="h-screen w-screen flex flex-col relative">
      <div className=" text-center font-mono text-3xl py-2">
        Task Detail : {specificTask?.name ?? ""}
      </div>
      <div className="grow flex overflow-hidden">
        <NavigationSpeedDial />
        <NavigationSideBar />
        <div className="grow  overflow-y-auto overflow-x-hidden p-4">
          <Typography className="text-center my-5" variant="h4">
            Task Details
          </Typography>
          <div className="overflow-y-hidden overflow-x-hidden flex flex-col gap-4">
            <Typography variant="lead" className="p-2 bg-white rounded-lg">
              <span className="font-bold">Task Name</span> :{" "}
              {specificTask?.name}
            </Typography>
            <Typography variant="lead" className="p-2 bg-white rounded-lg">
              <span className="font-bold"> Project Associated With</span> :{" "}
              {specificTask?.project?.name}
            </Typography>
            <Typography variant="lead" className="p-2 bg-white rounded-lg">
              <span className="font-bold"> Team Working On It</span> :{" "}
              {specificTask?.team?.name}
            </Typography>
            <Typography variant="lead" className="p-2 bg-white rounded-lg">
              <span className="font-bold"> Task Created On </span> :{" "}
              {new Date(specificTask?.createdAt).toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </Typography>
            <Typography variant="lead" className="p-2 bg-white rounded-lg">
              <span className="font-bold"> Task End Date </span> :{" "}
              {new Date(
                Date.now(specificTask?.createdAt) +
                  specificTask?.timeToComplete * 24 * 60 * 60 * 1000
              ).toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </Typography>
            {Date.now() <
            new Date(specificTask?.createdAt).getTime() +
              specificTask?.timeToComplete * 24 * 60 * 60 * 1000 ? (
              <Typography variant="lead" className="p-2 bg-white rounded-lg">
                <span className="font-bold">Days Remaining</span>:{" "}
                {Math.round(
                  (new Date(specificTask?.createdAt).getTime() +
                    specificTask?.timeToComplete * 24 * 60 * 60 * 1000 -
                    Date.now()) /
                    (24 * 60 * 60 * 1000)
                )}
              </Typography>
            ) : (
              <Typography variant="lead" className="p-2 bg-white rounded-lg">
                <span className="font-bold">Days Overdue</span>:{" "}
                {Math.round(
                  (Date.now() -
                    (new Date(specificTask?.createdAt).getTime() +
                      specificTask?.timeToComplete * 24 * 60 * 60 * 1000)) /
                    (24 * 60 * 60 * 1000)
                )}
              </Typography>
            )}
            <div className="p-2 bg-white rounded-lg flex items-center flex-wrap gap-3">
              <Typography variant="lead">
                <span className="font-bold"> Tags</span> :
              </Typography>
              <div className="flex gap-2 flex-wrap">
                {specificTask?.tags.map((ele, index) => (
                  <Chip
                    className="inline"
                    color="amber"
                    value={ele}
                    key={index}
                  />
                ))}
              </div>
            </div>
            <div className="p-2 bg-white rounded-lg flex items-center flex-wrap gap-3">
              <Typography variant="lead">
                <span className="font-bold"> Owners</span> :
              </Typography>
              <div className="flex gap-2 flex-wrap">
                {specificTask?.owners.map((ele, index) => (
                  <Chip
                    className="inline"
                    color="amber"
                    value={ele.name}
                    key={index}
                  />
                ))}
              </div>
            </div>
            <Typography
              variant="lead"
              className="p-2 bg-white rounded-lg flex items-center flex-erap"
            >
              <span className="font-bold"> Status </span> :{" "}
              {specificTask?.status}{" "}
              <Checkbox
                color="green"
                checked={specificTask?.status === "Completed"}
                disabled={specificTask?.status === "Completed"}
                label="Mark Completed"
                onClick={() => {
                  dispatch(markSTCompletedSYNC());
                  dispatch(markCompletedSYNC(specificTask?._id));
                  dispatch(markCompletedASYNC(specificTask?._id));
                }}
              />
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TaskDetail;
