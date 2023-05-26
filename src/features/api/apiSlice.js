import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3500" }),
  endpoints: (builder) => ({
    getTodos: builder.query({
      query: () => "/todos",
    }),
    addTodo: builder.mutation({
      // mutation is used because we need to mutate the data instead of just query or getting the data
      query: (todo) => ({
        // whole todo object is passed where as in delete just todo's id is passed
        url: "/todos",
        method: "POST",
        body: todo,
      }),
    }),
    updateTodo: builder.mutation({
      query: (todo) => ({
        url: `/todos/${todo.id}`,
        method: "PATCH", // PUT is change the FULL of an existing record whereas PATCH is used to change a PART of an existing resource
        body: todo,
      }),
    }),
    deleteTodo: builder.mutation({
      query: ({ id }) => ({
        // id destructered from the 'todo' which is passed in
        url: `/todos/${id}`,
        method: "DELETE",
        body: id,
      }),
    }),
  }),
});

export const {
  useGetTodosQuery,
  useAddTodoMutation,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
} = apiSlice; // useGetTodosQuery is custom hook provided to us by rtk query
