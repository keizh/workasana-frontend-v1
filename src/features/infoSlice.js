import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { postNewTeamSYNC } from "../features/userSlice";

export const fetchTeams = createAsyncThunk("fetch/teams", async () => {
  const res = await fetch(`${import.meta.env.VITE_SERVER_BASE_URL}/teams`, {
    method: "GET",
    headers: {
      Authorization: localStorage.getItem(`token`),
    },
  });
  const dataRes = await res.json();
  return dataRes;
});

export const fetchOwners = createAsyncThunk("fetch/owners", async () => {
  const res = await fetch(`${import.meta.env.VITE_SERVER_BASE_URL}/user`, {
    method: "GET",
    headers: {
      Authorization: localStorage.getItem(`token`),
    },
  });
  const dataRes = await res.json();
  return dataRes;
});

export const fetchTags = createAsyncThunk("fetch/tags", async () => {
  const res = await fetch(`${import.meta.env.VITE_SERVER_BASE_URL}/tags`, {
    method: "GET",
    headers: {
      Authorization: localStorage.getItem(`token`),
    },
  });
  const dataRes = await res.json();
  return dataRes;
});

export const postNewTask = createAsyncThunk(
  "post/newTask",
  async (data, { dispatch }) => {
    const res = await fetch(`${import.meta.env.VITE_SERVER_BASE_URL}/tasks`, {
      method: "POST",
      headers: {
        Authorization: localStorage.getItem(`token`),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const dataRes = await res.json();
    dispatch(postNewTeamSYNC(dataRes.newTaskSaved));
    return dataRes;
  }
);

export const postNewProject = createAsyncThunk(
  "post/newProject",
  async (data, { dispatch }) => {
    const res = await fetch(
      `${import.meta.env.VITE_SERVER_BASE_URL}/projects`,
      {
        method: "POST",
        headers: {
          Authorization: localStorage.getItem(`token`),
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    const dataRes = await res.json();
    return dataRes;
  }
);

export const fetchProjects = createAsyncThunk("fetch/projects", async () => {
  const res = await fetch(`${import.meta.env.VITE_SERVER_BASE_URL}/projects`, {
    method: "GET",
    headers: {
      Authorization: localStorage.getItem(`token`),
    },
  });
  const dataRes = await res.json();
  return dataRes;
});

export const postNewTeamASYNC = createAsyncThunk(
  "post/newTeam",
  async (data, { dispatch }) => {
    const res = await fetch(`${import.meta.env.VITE_SERVER_BASE_URL}/teams`, {
      method: "POST",
      headers: {
        Authorization: localStorage.getItem(`token`),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const dataRes = await res.json();
    return dataRes;
  }
);

export const fetchSpecificTask = createAsyncThunk(
  "fetch/specificTask",
  async (id) => {
    const res = await fetch(
      `${import.meta.env.VITE_SERVER_BASE_URL}/tasks/${id}`,
      {
        method: "GET",
        headers: {
          Authorization: localStorage.getItem(`token`),
        },
      }
    );
    console.log(`line 111`, res);
    const dataRes = await res.json();
    return dataRes;
  }
);

export const fetchProjectSpecificTask = createAsyncThunk(
  "fetch/ProjectspecificTask",
  async (id) => {
    const res = await fetch(
      `${import.meta.env.VITE_SERVER_BASE_URL}/tasks/project/${id}`,
      {
        method: "GET",
        headers: {
          Authorization: localStorage.getItem(`token`),
        },
      }
    );
    console.log(`line 111`, res);
    const dataRes = await res.json();
    return dataRes;
  }
);

export const fetchLastWeekReport = createAsyncThunk(
  "fetch/LastWeekReport",
  async () => {
    const res = await fetch(
      `${import.meta.env.VITE_SERVER_BASE_URL}/report/last-week`,
      {
        method: "GET",
        headers: {
          Authorization: localStorage.getItem(`token`),
        },
      }
    );
    const dataRes = await res.json();
    console.log(`fetchLastWeekReport`, dataRes);
    return dataRes;
  }
);

export const fetchTotalDaysOff = createAsyncThunk(
  "fetch/totalDaysOfPendingWork",
  async () => {
    const res = await fetch(
      `${import.meta.env.VITE_SERVER_BASE_URL}/report/pending`,
      {
        method: "GET",
        headers: {
          Authorization: localStorage.getItem(`token`),
        },
      }
    );
    const dataRes = await res.json();
    console.log(`fetchTotalDaysOff`, dataRes);
    return dataRes;
  }
);

// who --> team , owner , project
// whom --> teamId , ownerId , projectId

export const fetchClosedBy = createAsyncThunk(
  "fetch/closedTask",
  async ({ who, whom }) => {
    console.log(`called`);
    const res = await fetch(
      `${
        import.meta.env.VITE_SERVER_BASE_URL
      }/report/closed-tasks?groupByCategory=${who}&value=${whom}`,
      {
        method: "GET",
        headers: {
          Authorization: localStorage.getItem(`token`),
        },
      }
    );
    const dataRes = await res.json();
    console.log(`call finished`);
    return dataRes;
  }
);

const infoSlice = createSlice({
  name: "user",
  initialState: {
    teams: [],
    tags: [],
    owners: [],
    projects: [],
    projectSpecificTasks: [],
    projectSpecificOwners: [],
    projectSpecificTags: [],
    specificTask: null,
    status: "idle",
    lastWeekData: [],
    totalDaysOfWorkPending: null,
    err: null,
    taskClosed: { team: null, project: null, owners: null },
  },
  reducers: {
    markSTCompletedSYNC: (state) => {
      state.specificTask.status = "Completed";
    },
    removeST: (state) => {
      state.specificTask = null;
    },
    removePT: (state) => {
      state.projectSpecificTasks = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTeams.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchTeams.fulfilled, (state, action) => {
        state.status = "successful";
        state.teams = action.payload.teams;
      })
      .addCase(fetchTeams.rejected, (state, action) => {
        state.status = "error";
        state.err = action.error;
      });

    builder
      .addCase(fetchOwners.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchOwners.fulfilled, (state, action) => {
        state.status = "successful";
        state.owners = [...action.payload.data];
      })
      .addCase(fetchOwners.rejected, (state, action) => {
        state.status = "error";
        state.err = action.error;
      });

    builder
      .addCase(fetchTags.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchTags.fulfilled, (state, action) => {
        state.status = "successful";
        state.tags = [...action.payload.allTags];
      })
      .addCase(fetchTags.rejected, (state, action) => {
        state.status = "error";
        state.err = action.error;
      });

    builder
      .addCase(fetchProjects.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.status = "successful";
        state.projects = [...action.payload.allProjects];
      })
      .addCase(fetchProjects.rejected, (state) => {
        state.status = "error";
        state.err = action.error;
      });

    builder
      .addCase(postNewTask.pending, (state) => {
        state.status = "loading";
      })
      .addCase(postNewTask.fulfilled, (state, action) => {
        state.status = "successful";
      })
      .addCase(postNewTask.rejected, (state, action) => {
        state.status = "error";
        state.err = action.error;
      });

    builder
      .addCase(postNewProject.pending, (state) => {
        state.status = "loading";
      })
      .addCase(postNewProject.fulfilled, (state, action) => {
        state.status = "successful";
        state.projects = [...state.projects, action.payload.newProjectSaved];
      })
      .addCase(postNewProject.rejected, (state, action) => {
        state.status = "error";
        state.err = action.error;
      });

    builder
      .addCase(postNewTeamASYNC.pending, (state) => {
        state.status = "loading";
      })
      .addCase(postNewTeamASYNC.fulfilled, (state, action) => {
        state.status = "successful";
        state.teams = [action.payload.newTeamSaved, ...state.teams];
      })
      .addCase(postNewTeamASYNC.rejected, (state, action) => {
        state.status = "error";
        state.err = action.error;
      });

    builder
      .addCase(fetchSpecificTask.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSpecificTask.fulfilled, (state, action) => {
        state.status = "successful";
        state.specificTask = action.payload.data;
      })
      .addCase(fetchSpecificTask.rejected, (state, action) => {
        state.status = "error";
        state.err = action.error;
      });

    builder
      .addCase(fetchProjectSpecificTask.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProjectSpecificTask.fulfilled, (state, action) => {
        state.status = "successful";
        state.projectSpecificTasks = action.payload.data;
        // state.projectSpecificOwners : [],
        // state.projectSpecificTags: [],
        state.projectSpecificOwners = Array.from(
          new Set(
            action.payload.data.reduce((acc, ele) => {
              const ownersName = ele.owners.map((ele) => ele.name);
              acc.push(...ownersName);
              return acc;
            }, [])
          )
        );
        state.projectSpecificTags = Array.from(
          new Set(
            action.payload.data.reduce((acc, ele) => {
              const TagsName = ele.tags.map((ele) => ele);
              acc.push(...TagsName);
              return acc;
            }, [])
          )
        );
      })
      .addCase(fetchProjectSpecificTask.rejected, (state, action) => {
        state.status = "error";
        state.err = action.error;
      });

    builder
      .addCase(fetchLastWeekReport.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchLastWeekReport.fulfilled, (state, action) => {
        state.status = "successful";
        state.lastWeekData = action.payload.taskCompletedLastWeek;
      })
      .addCase(fetchLastWeekReport.rejected, (state, action) => {
        state.status = "error";
        state.err = action.error;
      });

    builder
      .addCase(fetchTotalDaysOff.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTotalDaysOff.fulfilled, (state, action) => {
        state.status = "successful";
        state.totalDaysOfWorkPending = action.payload.totalDaysOfWorkPending;
      })
      .addCase(fetchTotalDaysOff.rejected, (state, action) => {
        state.status = "error";
        state.err = action.error;
      });

    builder
      .addCase(fetchClosedBy.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchClosedBy.fulfilled, (state, action) => {
        state.status = "successful";
        // tct~total completed tasks
        // tpt~total pending tasks
        state.taskClosed = {
          ...state.taskClosed,
          [action.payload.groupByCategory]: {
            tpt: action.payload.totalTasks - action.payload.totalCompletedTasks,
            tct: action.payload.totalCompletedTasks,
          },
        };
      })
      .addCase(fetchClosedBy.rejected, (state, action) => {
        state.status = "error";
        state.err = action.error;
      });
  },
});

export const { markSTCompletedSYNC, removeST, removePT } = infoSlice.actions;
export default infoSlice;