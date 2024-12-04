/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { Select as SSingle, Option } from "@material-tailwind/react";
import React from "react";
import auth from "../utils/auth";
import Select from "react-select";
import { postNewTask } from "../features/infoSlice";
import {
  Button,
  Dialog,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Checkbox,
} from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";

export function NewTask() {
  const dispatch = useDispatch();
  const { teams, tags, owners, projects } = useSelector((state) => state.info);
  const { userId } = useSelector((state) => state.user);

  const initialTask = {
    name: "",
    project: "",
    team: "",
    owners: new Array(),
    tags: new Array(),
    timeToComplete: 5,
    status: "",
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen((cur) => !cur);

  const token = localStorage.getItem("token");

  const [task, setTask] = useState(initialTask);
  const [press, setPress] = useState(false);
  const [loader, setLoader] = useState(false);

  const onPressHandler = () => {
    if (
      task.name?.length != "" &&
      task.project?.length != "" &&
      task.team?.length != "" &&
      task.owners?.length > 0 &&
      task.tags?.length > 0 &&
      task.timeToComplete > 0 &&
      task.status?.length != ""
    ) {
      setPress(true);
    } else {
      setPress(false);
    }
  };
  //  NS ~ NON - Select
  const onChangeHandlerNS = (e) => {
    const { name, value } = e.target;
    setTask((task) => ({
      ...task,
      [name]: name == "timeToComplete" ? parseInt(value) : value,
    }));
    // console.log(task);
    // console.log(`press`, press);
  };

  //   S ~ Select
  const onChangeHandlerSReactSelect = (value, object) => {
    console.log(value);
    console.log(object);
    const { name } = object;

    setTask((task) => ({
      ...task,
      [name]:
        name == "owners"
          ? Array.from(new Set([...value.map((ele) => ele.value), userId]))
          : Array.from(new Set([...value.map((ele) => ele.value)])),
    }));
    // console.log(task);
    // console.log(`press`, press);
  };
  const onChangeHandlerSMaterialTailwind = (value, name) => {
    // console.log(value);
    // console.log(name);
    setTask((task) => ({
      ...task,
      [name]: value,
    }));
    // console.log(task);
    // console.log(`press`, press);
  };

  useEffect(() => {
    onPressHandler();
  }, [task]);
  useEffect(() => {
    if (userId && userId != "") {
      task.owners.push(userId);
    }
  }, [task.owners, userId]);

  const onSubmitHander = async (event) => {
    event.preventDefault();
    if (!press) return;
    setLoader(true);
    await dispatch(postNewTask(task));
    console.log(task);
    setTimeout(() => {
      setLoader(false);
      setPress(false);
      setTask(initialTask);
      handleOpen();
    });
  };

  return (
    <>
      <Button className="p-5" color="green" onClick={handleOpen}>
        Create New Task
      </Button>
      <Dialog
        size="xs"
        open={open}
        handler={handleOpen}
        className="bg-transparent shadow-none"
      >
        <Card className="mx-auto w-full max-w-[24rem]">
          <form onSubmit={onSubmitHander}>
            <CardBody className="flex flex-col gap-4">
              <Typography variant="h4" color="blue-gray">
                New Task
              </Typography>
              {/* task name ------------ */}
              <Typography className="-mb-2" variant="h6">
                Task Name
              </Typography>
              <Input
                value={task.name}
                onChange={onChangeHandlerNS}
                label="Name"
                name="name"
                size="lg"
              />
              {/* project name -------------------- */}
              {/* single select */}
              <Typography className="-mb-2" variant="h6">
                Project Name
              </Typography>
              {projects?.length > 0 ? (
                <SSingle
                  label="Project Name"
                  name="project"
                  onChange={(val) =>
                    onChangeHandlerSMaterialTailwind(val, "project")
                  }
                >
                  {projects.map((ele, index) => (
                    <Option value={ele._id} key={index}>
                      {ele.name}
                    </Option>
                  ))}
                </SSingle>
              ) : (
                <Typography className="-mb-2" color={"red"} variant="h6">
                  NO PROJECTS
                </Typography>
              )}
              {/* team  -------------------------- */}
              {/* single select */}
              <Typography className="-mb-2" variant="h6">
                team
              </Typography>
              {teams?.length > 0 ? (
                <SSingle
                  label="Team Name"
                  name="team"
                  onChange={(val) =>
                    onChangeHandlerSMaterialTailwind(val, "team")
                  }
                >
                  {teams.map((ele, index) => (
                    <Option value={ele._id} key={index}>
                      {ele.name}
                    </Option>
                  ))}
                </SSingle>
              ) : (
                <Typography className="-mb-2" color={"red"} variant="h6">
                  NO TEAMS
                </Typography>
              )}
              {/* owners ----------------------------------*/}
              {/* multi select */}
              <Typography className="-mb-2" variant="h6">
                Owners
              </Typography>
              {owners?.length > 0 ? (
                // <Select label="Tag" name="tags" onChange={onChangeHandler}>
                //   {tags.map((ele, index) => (
                //     <Option key={index}>{ele.name}</Option>
                //   ))}
                // </Select>
                <Select
                  options={owners
                    .filter((ele) => ele._id != userId)
                    .map((ele) => ({
                      value: ele._id,
                      label: ele.name,
                    }))}
                  isMulti
                  name="owners"
                  className="basic-multi-select"
                  classNamePrefix="select"
                  onChange={onChangeHandlerSReactSelect}
                  // onChange={(val) => console.log(val)}
                />
              ) : (
                <Typography className="-mb-2" color={"red"} variant="h6">
                  NO USERs
                </Typography>
              )}
              <Typography className="-mb-2" variant="small">
                Creator of task automatically becomes part of the task
              </Typography>
              {/* Tags --------------------------------- */}
              {/* multi select */}
              <Typography className="-mb-2" variant="h6">
                Tags
              </Typography>
              {tags?.length > 0 ? (
                // <Select label="Tag" name="tags" onChange={onChangeHandler}>
                //   {tags.map((ele, index) => (
                //     <Option key={index}>{ele.name}</Option>
                //   ))}
                // </Select>
                <Select
                  options={tags.map((ele) => ({
                    value: ele.name,
                    label: ele.name,
                  }))}
                  isMulti
                  name="tags"
                  className="basic-multi-select"
                  classNamePrefix="select"
                  onChange={onChangeHandlerSReactSelect}
                />
              ) : (
                <Typography className="-mb-2" color={"red"} variant="h6">
                  NO TAGS
                </Typography>
              )}
              {/* timetoComplet */}
              <Typography className="-mb-2" variant="h6">
                Time to Complete ( days )
              </Typography>
              <Input
                type="number"
                value={task.timeToComplete}
                onChange={onChangeHandlerNS}
                label="Time To Complete"
                name="timeToComplete"
                size="lg"
              />
              {/* status */}
              {/* single select */}
              <Typography className="-mb-2" variant="h6">
                status
              </Typography>
              <SSingle
                label="Status"
                name="status"
                onChange={(val) =>
                  onChangeHandlerSMaterialTailwind(val, "status")
                }
              >
                {["To Do", "In Progress", "Completed", "Blocked"].map(
                  (ele, index) => (
                    <Option key={index} value={ele}>
                      {ele}
                    </Option>
                  )
                )}
              </SSingle>
            </CardBody>
            <CardFooter className="pt-0">
              <Button
                loading={loader}
                color={press ? "green" : "red"}
                fullWidth
                type="submit"
                className="flex justify-center gap-2"
              >
                Create Task
              </Button>
            </CardFooter>
          </form>
        </Card>
      </Dialog>
    </>
  );
}
export default NewTask;
