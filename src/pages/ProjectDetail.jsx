import NavigationSpeedDial from "../components/NavigationSpeedDial";
import NavigationSideBar from "../components/NavigationSideBar";
import NewTask from "../components/NewTask";
import { Select, Option, Typography } from "@material-tailwind/react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchProjectSpecificTask, removePT } from "../features/infoSlice";
import useAuthCheck from "../utils/useAuthCheck";
function ProjectDetail() {
  useAuthCheck();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    owners,
    tags,
    projectSpecificTasks,
    projectSpecificTags,
    projectSpecificOwners,
  } = useSelector((state) => state.info);
  const { id } = useParams();
  const [arr, setArr] = useState([]);
  const [ownerFilter, setOwnerFilter] = useState("All");
  const [tagFilter, setTagFilter] = useState("All");
  const [sortBy, setSortBy] = useState("");
  useEffect(() => {
    dispatch(fetchProjectSpecificTask(id));
    return () => {
      dispatch(removePT());
    };
  }, []);

  useEffect(() => {
    setArr(() => {
      return projectSpecificTasks
        ?.filter((task) => {
          // console.log(
          //   `Line 38`,
          //   task?.owners,
          //   `--->`,
          //   ownerFilter,
          //   `---->`,
          //   task?.owners?.map((ele) => ele.name).includes(ownerFilter)
          // );
          if (ownerFilter == "All") {
            console.log(`Line 34 , ALL owners`);
            return true;
          } else if (
            task?.owners?.map((ele) => ele.name).includes(ownerFilter)
          ) {
            return true;
          } else {
            return false;
          }
        })
        ?.filter((task) => {
          if (tagFilter == "All") {
            return true;
          } else if (task?.tags?.includes(tagFilter)) {
            return true;
          } else {
            return false;
          }
        })
        ?.sort((a, b) => {
          if (sortBy === "Priority") {
            return a.Due - b.Due;
          } else {
            return b.Due - a.Due;
          }
        });
    });
  }, [projectSpecificTasks, ownerFilter, tagFilter, sortBy]);

  return (
    <div className="h-screen w-screen flex flex-col relative">
      <div className="text-center font-mono text-3xl py-2">Project </div>
      <div className="grow flex overflow-x-hidden overflow-y-auto">
        <NavigationSpeedDial />
        <NavigationSideBar />
        <div className="grow grid grid-rows-12 overflow-hidden p-2">
          <div className="row-span-3 xl:row-span-1 px-4 flex flex flex-wrap justify-evenly py-4">
            <div className=" items-center">
              <div className="ml-5 w-72 ">
                <Select
                  value="All"
                  onChange={(val) => setOwnerFilter(val)}
                  fullwidth
                  label="Filter By Owner"
                >
                  {[...projectSpecificOwners, "All"]?.map((ele, index) => (
                    <Option key={index} value={ele}>
                      {ele}
                    </Option>
                  ))}
                </Select>
              </div>
            </div>
            <div className=" w-72">
              <div className="ml-5 ">
                <Select
                  value="All"
                  onChange={(val) => setTagFilter(val)}
                  label="Filter By Tag"
                >
                  {["All", ...projectSpecificTags]?.map((ele, index) => (
                    <Option key={index} value={ele}>
                      {ele}
                    </Option>
                  ))}
                </Select>
              </div>
            </div>
            <div className="w-72">
              <div className="ml-5 ">
                <Select
                  value="Due Date"
                  label="Sort By"
                  onChange={(val) => setSortBy(val)}
                >
                  <Option value="Due Date">Due Date</Option>
                  <Option value="Priority">Priority</Option>
                </Select>
              </div>
            </div>
          </div>
          <div className="row-span-9 flex flex-col xl:row-span-11 p-3">
            <Typography className="mb-3" variant="h4">
              List Of Task associated with Project
            </Typography>
            <div className=" grow overflow-x-hidden overflow-y-auto p-2 flex flex-col gap-4 Vscrollbar">
              {arr?.map((ele, index) => (
                <div
                  key={ele._id}
                  className=" bg-white rounded-lg p-3 flex gap-4 flex-wrap"
                >
                  <Typography className="p-2 bg-orange-200 rounded-lg">
                    TASK {index + 1}: {ele.name}
                  </Typography>
                  <Typography className="p-2 bg-green-100 rounded-lg">
                    STATUS : {ele.status}
                  </Typography>
                  <Typography
                    onClick={() => navigate(`/task/${ele._id}`)}
                    variant="lead"
                    className="mr-auto p-2 cursor-pointer bg-blue-200 text-white rounded-lg"
                  >
                    Know More
                  </Typography>
                  <Typography
                    onClick={() => navigate(`/task/${ele._id}`)}
                    variant="lead"
                    className="mr-auto p-2 cursor-pointer bg-red-300 text-white rounded-lg"
                  >
                    Due : {ele.Due}
                  </Typography>
                </div>
              ))}
              {arr?.length == 0 && (
                <Typography>
                  No Task With Such Filtering Parameter Exists
                </Typography>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectDetail;
