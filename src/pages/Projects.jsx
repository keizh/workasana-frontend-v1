import NavigationSpeedDial from "../components/NavigationSpeedDial";
import NavigationSideBar from "../components/NavigationSideBar";

function Projects() {
  return (
    <div className="h-screen w-screen flex flex-col relative">
      <div className=" text-center font-mono text-3xl py-2">Projects</div>
      <div className="grow flex">
        <NavigationSpeedDial />
        <NavigationSideBar />
        <div className="grow bg-red-100"></div>
      </div>
    </div>
  );
}

export default Projects;
