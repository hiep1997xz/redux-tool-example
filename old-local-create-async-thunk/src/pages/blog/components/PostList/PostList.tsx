import { deletePost, getPostList, startEditingPost } from 'pages/blog/blog.slice'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { RootState, useAppDispatch } from 'store'
import PostItem from '../PostItem'
import Skeleton from '../skeleton'

const PostList = () => {
  const postList = useSelector((state: RootState) => state.blog.postList)
  const loading = useSelector((state: RootState) => state.blog.loading)
  const dispatch = useAppDispatch()

  useEffect(() => {
    const promise = dispatch(getPostList())
    // call api sucess 1 lan
    return () => promise.abort()
  }, [dispatch])

  const handleDelete = (postId: string) => {
    dispatch(deletePost(postId))
  }

  const handleStartEditing = (postId: string) => {
    dispatch(startEditingPost(postId))
  }

  return (
    <div className='bg-white py-6 sm:py-8 lg:py-12'>
      <div className='mx-auto max-w-screen-xl px-4 md:px-8'>
        <div className='mb-10 md:mb-16'>
          <h2 className='mb-4 text-center text-2xl font-bold text-gray-800 md:mb-6 lg:text-3xl'>Example Blog</h2>
          <p className='mx-auto max-w-screen-md text-center text-gray-500 md:text-lg'>
            Đừng bao giờ từ bỏ. Hôm nay khó khăn, ngày mai sẽ trở nên tồi tệ. Nhưng ngày mốt sẽ có nắng
          </p>
        </div>
        <div className='grid gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-2 xl:grid-cols-2 xl:gap-8'>
          {loading && (
            <>
              <Skeleton />
              <Skeleton />
            </>
          )}
          {!loading &&
            postList.map((post: any) => (
              <PostItem post={post} key={post.id} handleDelete={handleDelete} handleStartEditing={handleStartEditing} />
            ))}
        </div>
      </div>
    </div>
  )
}

export default PostList
