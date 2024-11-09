import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchTodos } from "../api/todoApi";

// Асинхронный action loadTodos для загрузки задач с API
// Использует createAsyncThunk для выполнения асинхронного запроса и обработки состояний
export const loadTodos = createAsyncThunk("todos/loadTodos", async () => {
  return await fetchTodos();
});

// Срез состояния todosSlice для управления состоянием задач
const todosSlice = createSlice({
  name: "todos",
  initialState: {
    list: [], // Массив для хранения списка задач
    status: null, // Статус загрузки данных (loading, succeeded, failed)
  },
  reducers: {
    // Редьюсер addTodo — добавляет новую задачу в список
    addTodo: (state, action) => {
      state.list.push(action.payload);
    },
    // Редьюсер editTodo — редактирует существующую задачу
    editTodo: (state, action) => {
      const index = state.list.findIndex(
        (todo) => todo.id === action.payload.id
      );
      if (index !== -1) {
        state.list[index] = action.payload;
      }
    },
    // Редьюсер deleteTodo — удаляет задачу из списка по её ID
    deleteTodo: (state, action) => {
      state.list = state.list.filter((todo) => todo.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    // Обработка асинхронного запроса loadTodos с тремя состояниями:
    builder
      .addCase(loadTodos.pending, (state) => {
        // Обновляет статус на "loading" при начале загрузки данных
        state.status = "loading";
      })
      .addCase(loadTodos.fulfilled, (state, action) => {
        // При успешной загрузке сохраняет данные в список задач и обновляет статус
        state.list = action.payload;
        state.status = "succeeded";
      })
      .addCase(loadTodos.rejected, (state) => {
        // При ошибке обновляет статус на "failed"
        state.status = "failed";
      });
  },
});

// Экспорт действий addTodo, editTodo и deleteTodo для использования в компонентах
export const { addTodo, editTodo, deleteTodo } = todosSlice.actions;

// Экспорт редьюсера для добавления в хранилище Redux
export default todosSlice.reducer;
