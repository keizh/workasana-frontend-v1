import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchUserTasks = createAsyncThunk(
  "fetch/usertasks",
  async (userId) => {
    console.log(`userId`, userId);
    const res = await fetch(
      `${import.meta.env.VITE_SERVER_BASE_URL}/tasks/me/${userId}`,
      {
        method: "GET",
        headers: {
          Authorization: localStorage.getItem(`token`),
        },
      }
    );
    const dataRes = await res.json();
    return dataRes;
  }
);

export const markCompletedASYNC = createAsyncThunk(
  "post/markTask",
  async (taskId) => {
    console.log(`post/markTask has been hit`);
    const res = await fetch(
      `${import.meta.env.VITE_SERVER_BASE_URL}/tasks/${taskId}`,
      {
        method: "POST",
        headers: {
          Authorization: localStorage.getItem(`token`),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: "Completed" }),
      }
    );
    const dataRes = await res.json();
    console.log(`dataRes`, dataRes);
    return dataRes;
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    userId: "",
    name: "",
    email: "",
    userTasks: [],
    status: "idle",
    errorUser: null,
  },
  reducers: {
    postNewTeamSYNC: (state, action) => {
      state.userTasks = [...state.userTasks, action.payload];
    },
    userUpdate: (state, action) => {
      console.log(`hit hard----------->`);
      state.userId = action.payload.userId;
      state.name = action.payload.name;
      state.email = action.payload.email;
    },
    markCompletedSYNC: (state, action) => {
      state.userTasks = state.userTasks.map((ele) => {
        if (ele._id == action.payload) {
          ele.status = "Completed";
        }
        return ele;
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserTasks.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUserTasks.fulfilled, (state, action) => {
        state.status = "successful";
        state.userTasks = [...action.payload.tasks];
      })
      .addCase(fetchUserTasks.rejected, (state, action) => {
        state.status = "error";
        state.errorUser = action.error;
      });

    builder
      .addCase(markCompletedASYNC.pending, (state) => {
        state.status = "loading";
      })
      .addCase(markCompletedASYNC.fulfilled, (state) => {
        state.status = "successful";
      })
      .addCase(markCompletedASYNC.rejected, (state, action) => {
        state.status = "error";
        state.errorUser = action.error;
      });
  },
});

export const { postNewTeamSYNC, userUpdate, markCompletedSYNC, filterTask } =
  userSlice.actions;
export default userSlice;
