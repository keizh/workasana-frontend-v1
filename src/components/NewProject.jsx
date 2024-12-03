/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { Select as SSingle, Option, Textarea } from "@material-tailwind/react";
import React from "react";
import auth from "../utils/auth";
import Select from "react-select";
import { postNewProject } from "../features/infoSlice";
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

export function NewProject() {
  const dispatch = useDispatch();
  const initialProject = {
    name: "",
    description: "",
  };
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen((cur) => !cur);
  const token = localStorage.getItem("token");
  const [project, setProject] = useState(initialProject);
  const [press, setPress] = useState(false);
  const [loader, setLoader] = useState(false);

  const onPressHandler = () => {
    if (project.name != "" && project.description != "") {
      setPress(true);
    }
  };
  //  NS ~ NON - Select
  const onChangeHandlerNS = (e) => {
    const { name, value } = e.target;
    setProject((project) => ({
      ...project,
      [name]: value,
    }));
    // console.log(project);
    // console.log(`press`, press);
  };

  useEffect(() => {
    onPressHandler();
  }, [project]);

  const onSubmitHander = async (event) => {
    event.preventDefault();
    if (!press) return;
    setLoader(true);
    await dispatch(postNewProject(project));
    console.log(project);
    setTimeout(() => {
      setLoader(false);
      setProject(initialProject);
      handleOpen();
    });
  };

  return (
    <>
      <Button className="p-5" color="green" onClick={handleOpen}>
        Create New Project
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
                New Project
              </Typography>
              {/* task name ------------ */}
              <Typography className="-mb-2" variant="h6">
                Task Name
              </Typography>
              <Input
                value={project.name}
                onChange={onChangeHandlerNS}
                label="Name"
                name="name"
                size="lg"
              />
              {/* Project description ------------ */}
              <Typography className="-mb-2" variant="h6">
                Task Name
              </Typography>
              <Textarea
                value={project.description}
                onChange={onChangeHandlerNS}
                label="Project Description"
                name="description"
                size="lg"
              />
            </CardBody>
            <CardFooter className="pt-0">
              <Button
                loading={loader}
                color={press ? "green" : "red"}
                fullWidth
                type="submit"
                className="flex justify-center gap-2"
              >
                Create Project
              </Button>
            </CardFooter>
          </form>
        </Card>
      </Dialog>
    </>
  );
}
export default NewProject;
