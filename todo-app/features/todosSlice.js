import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchTodos } from "../api/todoApi";

export const loadTodos = createAsyncThunk("todos/loadTodos", async () => {
  return await fetchTodos();
});

const todosSlice = createSlice({
  name: "todos",
  initialState: {
    list: [],
    status: null,
  },
  reducers: {
    // Добавление новой задачи
    addTodo: (state, action) => {
      state.list.push(action.payload);
    },
    // Редактирование задачи
    editTodo: (state, action) => {
      const index = state.list.findIndex(
        (todo) => todo.id === action.payload.id
      );
      if (index !== -1) {
        state.list[index] = action.payload;
      }
    },
    // Удаление задачи
    deleteTodo: (state, action) => {
      state.list = state.list.filter((todo) => todo.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadTodos.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loadTodos.fulfilled, (state, action) => {
        state.list = action.payload;
        state.status = "succeeded";
      })
      .addCase(loadTodos.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const { addTodo, editTodo, deleteTodo } = todosSlice.actions;
export default todosSlice.reducer;
