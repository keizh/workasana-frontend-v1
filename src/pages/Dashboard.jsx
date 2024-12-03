import { useState, useEffect, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import auth from "../utils/auth";
import NewTask from "../components/NewTask";
import NewProject from "../components/NewProject";
import NavigationSpeedDial from "../components/NavigationSpeedDial";
import NavigationSideBar from "../components/NavigationSideBar";
import useAuthCheck from "../utils/useAuthCheck";
import {
  fetchTeams,
  fetchOwners,
  fetchTags,
  fetchProjects,
} from "../features/infoSlice";
import {
  fetchUserTasks,
  markCompletedSYNC,
  markCompletedASYNC,
} from "../features/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { Typography, Button, Checkbox, Radio } from "@material-tailwind/react";
import { userUpdate } from "../features/userSlice";
import store from "../app/store";
function Dashboard() {
  useAuthCheck();
  const [filter, setFilter] = useState("All");
  const [taskArr, setTaskArr] = useState(null);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const { projects } = useSelector((state) => state.info);
  const { userTasks } = useSelector((state) => state.user);
  // IMP TEMPLATE PART
  useEffect(() => {
    // ig you have signed in using google this will run
    const token = searchParams.get("token");
    if (token) {
      localStorage.setItem("token", token);
    }
  }, [searchParams]);

  // IMP TEMPLATE PART
  useEffect(() => {
    // will always check
    console.log(`useEffect---->`);
    const token = localStorage.getItem("token");
    const obj = auth(token);
    console.log(obj);
    console.log(token);
    if (!token || !obj.result) {
      navigate("/signin");
      console.log(`Naviated---------->`);
    } else {
      dispatch(userUpdate(obj));
    }
  }, [navigate]);

  useEffect(() => {
    dispatch(fetchOwners());
    dispatch(fetchTags());
    dispatch(fetchTeams());
    dispatch(fetchProjects());
    const userId = store.getState().user.userId;
    dispatch(fetchUserTasks(userId));
  }, [dispatch]);

  useEffect(() => {
    // taskArr.current =
    //   filter == "All"
    //     ? userTasks
    //     : userTasks.filter((ele) => ele.status == filter);
    setTaskArr(() =>
      filter == "All"
        ? userTasks
        : userTasks.filter((ele) => ele.status == filter)
    );
  }, [filter, userTasks]);

  return (
    <div className="h-screen w-screen flex flex-col relative">
      <div className=" text-center font-mono text-3xl py-2">DashBoard</div>
      <div className="grow  flex overflow-hidden">
        <NavigationSpeedDial />
        <NavigationSideBar />
        <div className="w-[100%] md:w-[82%]  grid grid-rows-10 h-[100%] overflow-hidden">
          <div className="px-4 pt-2 row-span-4 flex flex-col  min-h-0 ">
            <div className="flex justify-between items-center mb-3">
              <Typography variant="h2" align="left">
                Projects
              </Typography>
              <NewProject />
            </div>
            <div className="grow  overflow-x-hidden overflow-y-scroll Vscrollbar border rounded-xl border-red-200">
              {projects?.length > 0 ? (
                projects.map((ele, index) => (
                  <Button
                    onClick={() => navigate(`/project/${ele._id}`)}
                    key={index}
                    color="blue"
                    className="p-3 h-fit w-fit m-2"
                  >
                    {ele.name}
                  </Button>
                ))
              ) : (
                <Typography>No Projects </Typography>
              )}
            </div>
          </div>
          <div className="row-span-5 px-4 pt-2 flex flex-col   min-h-0 ">
            <div className="flex justify-between items-center mb-3">
              <Typography variant="h2" align="left">
                Tasks
              </Typography>
              <NewTask />
            </div>
            <div className="grow  overflow-x-hidden overflow-y-scroll Vscrollbar border rounded-xl border-red-200 flex flex-col gap-2 pt-4 px-4">
              {taskArr?.length > 0 ? (
                taskArr?.map((ele, index) => (
                  // <Button
                  //   onClick={() => navigate(`/project/${ele._id}`)}
                  //   key={index}
                  //   color="blue"
                  //   className="p-3 h-fit w-fit m-2"
                  // >
                  //   {ele.name}
                  // </Button>
                  <div
                    className="p-4 rounded-md flex gap-[20px] flex-wrap bg-white"
                    key={index}
                  >
                    <Typography
                      variant="lead"
                      className="p-2 bg-orange-200 rounded-lg"
                    >
                      {ele.name}
                    </Typography>
                    <Typography
                      className="p-2 bg-orange-200 rounded-lg"
                      variant="lead"
                    >
                      Due Date :{" "}
                      {new Date(
                        new Date(ele.createdAt) +
                          ele.timeToComplete * 24 * 60 * 60 * 1000
                      ).toLocaleDateString("en-US", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </Typography>
                    <Typography
                      variant="lead"
                      className="mr-auto p-2 bg-orange-200 rounded-lg"
                    >
                      STATUS : {ele.status}
                    </Typography>
                    <Typography
                      onClick={() => navigate(`task/${ele._id}`)}
                      variant="lead"
                      className="mr-auto p-2 cursor-pointer bg-blue-200 text-white rounded-lg"
                    >
                      Know More
                    </Typography>
                    <Checkbox
                      color="green"
                      checked={ele.status === "Completed"}
                      disabled={ele.status === "Completed"}
                      onClick={() => {
                        dispatch(markCompletedSYNC(ele._id));
                        dispatch(markCompletedASYNC(ele._id));
                      }}
                      label="Mark Completed"
                    />
                  </div>
                ))
              ) : (
                <Typography variant="h3" color="blue" textGradient>
                  No Task's{" "}
                </Typography>
              )}
            </div>
          </div>
          <div className="row-span-1  px-2 py-3 flex gap-2 min-h-0">
            <Radio
              onClick={(e) => setFilter(e.target.value)}
              value="Completed"
              name="type"
              color="green"
              label="Completed Task"
            />
            <Radio
              onClick={(e) => setFilter(e.target.value)}
              value="In Progress"
              name="type"
              color="blue"
              label="Task In Progress"
            />
            <Radio
              onClick={(e) => setFilter(e.target.value)}
              defaultChecked
              value="All"
              name="type"
              label="All Task"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
