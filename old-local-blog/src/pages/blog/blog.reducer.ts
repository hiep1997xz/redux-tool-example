import { createAction, createReducer } from "@reduxjs/toolkit"
import { initalPostList } from "constants/blog"
import { Post } from "types/blog.type"

interface BlogState {
  postList: Post[]
  editingPost: Post | null
}

const initialState: BlogState = {
  postList: initalPostList,
  editingPost: null
}

//action add post
export const addPost = createAction<Post>('blog/addPost')

//delete post
export const deletePost = createAction<string>('blog/deletePost')

//edit post

// fill data khi click edit
export const startEditingPost = createAction<string>('blog/startEditingPost')
// cancle clear data form
export const cancelEditingPost = createAction('blog/cancelEditingPost')
// submit edit
export const finishEditingPost = createAction<Post>('blog/finishEditingPost')

const blogReducer = createReducer(initialState, (builder) => {
  // building callback -> co type action -> typescript
  // action add -> delete -> startEditingPost
  builder
    .addCase(addPost, (state, action) => {
      //immerjs thu vien redux giup cta mutate 1 state an toan
      const post = action.payload
      // push -> add new post item
      state.postList.push(post)
    })
    .addCase(deletePost, (state, action) => {
      // splice -> delete post item
      // findIndex -> check id post item bi delete
      const postId = action.payload
      const foundPostIndex = state.postList.findIndex((post) => post.id === postId)
      if (foundPostIndex !== -1) {
        state.postList.splice(foundPostIndex, 1)
      }
    })
    .addCase(startEditingPost, (state, action) => {
      const postId = action.payload
      const foundPost = state.postList.find((post) => post.id === postId) || null
      state.editingPost = foundPost
    })
    .addCase(cancelEditingPost, (state) => {
      state.editingPost = null
    })
    .addCase(finishEditingPost, (state, action) => {
      const postId = action.payload.id
      // some khi return true se dung lai
      state.postList.some((post, index) => {
        if (post.id === postId) {
          state.postList[index] = action.payload
          return true
        }
        return false
      })
      state.editingPost = null
    })
    .addMatcher(
      (action) => action.type.includes('cancel'),
      (state, action) => {
        console.log(state)
        // add matcher cho phep chung ta them matcher function
        // neu matcher function tra ve tru thi no nhay vao case nay
      }
    )
    .addDefaultCase((state, action) => {
      // neu muon them default case khi khon match case nao
    })
})

// map object -> type action chuyen het thanh any -> js

// const blogReducer = createReducer(
//   initalState,
//   {
//     [addPost.type]: (state, action: PayloadAction<Post>) => {
//       // immerjs
//       // immerjs giúp chúng ta mutate một state an toàn
//       const post = action.payload
//       state.postList.push(post)
//     },
//     [deletePost.type]: (state, action) => {
//       console.log('start', current(state))
//       const postId = action.payload
//       const foundPostIndex = state.postList.findIndex((post) => post.id === postId)
//       if (foundPostIndex !== -1) {
//         state.postList.splice(foundPostIndex, 1)
//       }
//       console.log('finish', current(state))
//     },
//     [startEditingPost.type]: (state, action) => {
//       const postId = action.payload
//       const foundPost = state.postList.find((post) => post.id === postId) || null
//       state.editingPost = foundPost
//     },
//     [cancelEditingPost.type]: (state) => {
//       state.editingPost = null
//     },
//     [finishEditingPost.type]: (state, action) => {
//       const postId = action.payload.id
//       state.postList.some((post, index) => {
//         if (post.id === postId) {
//           state.postList[index] = action.payload
//           return true
//         }
//         return false
//       })
//       state.editingPost = null
//     }
//   },
// sd matcher trong map object
//   [
//     {
//       matcher: ((action: any) => action.type.includes('cancel')) as any,
//       reducer(state, action) {
//         console.log(current(state))
//       }
//     }
//   ],
//   (state) => {
//     console.log(state)
//   }
// )

export default blogReducer