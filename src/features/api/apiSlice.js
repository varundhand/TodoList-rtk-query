import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3500" }),
  tagTypes: ["Todos"], //! the data gets cached when we run mutations and we need to INVALIDATE PREVIOUS CACHE in order to update new changes. So we assign tag to the mutations which lets us tell which mutation to invalidate cache and automatically update the data
  endpoints: (builder) => ({
    getTodos: builder.query({
      query: () => "/todos",
      transformResponse: (res) => res.sort((a, b) => b.id - a.id), // sorted the tasks in descending order
      providesTags: ["Todos"],
    }),
    addTodo: builder.mutation({
      // mutation is used because we need to mutate the data instead of just query or getting the data
      query: (todo) => ({
        // whole todo object is passed where as in delete just todo's id is passed
        url: "/todos",
        method: "POST",
        body: todo,
      }),
      invalidatesTags: ["Todos"],
    }),
    updateTodo: builder.mutation({
      query: (todo) => ({
        url: `/todos/${todo.id}`,
        method: "PATCH", // PUT is change the FULL of an existing record whereas PATCH is used to change a PART of an existing resource
        body: todo,
      }),
      invalidatesTags: ["Todos"],
    }),
    deleteTodo: builder.mutation({
      query: ({ id }) => ({
        // id destructered from the 'todo' which is passed in
        url: `/todos/${id}`,
        method: "DELETE",
        body: id,
      }),
      invalidatesTags: ["Todos"],
    }),
  }),
});

export const {
  useGetTodosQuery,
  useAddTodoMutation,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
} = apiSlice; // useGetTodosQuery is custom hook provided to us by rtk query
