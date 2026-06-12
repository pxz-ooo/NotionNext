import { useGlobal } from '@/lib/global'
import SmartLink from '@/components/SmartLink'
import LazyImage from '@/components/LazyImage'
import Announcement from './Announcement'

const PAPER_READER_URL = 'https://pxz-ooo.github.io/daily-paper-reader/#/'

/**
 * 侧边栏 - 自定义: 论文检索 + AI HOT 导航
 * @param {*} props
 * @returns
 */
export default function SideBar (props) {
  const { notice, posts } = props
  const { categoryOptions } = useGlobal()

  // 筛选 AI HOT 相关分类
  const aiHotCategories = categoryOptions?.filter(c =>
    c.name?.includes('AI') || c.name?.includes('日报') || c.name?.includes('全量')
  )

  // 筛选近期 AI HOT 文章
  const recentAiPosts = posts?.filter(p =>
    p.category?.includes('AI') || p.category?.includes('日报') || p.category?.includes('全量')
  ).slice(0, 6)

  return (
    <div className='space-y-6'>
      {/* 论文检索 */}
      <div className='px-3'>
        <div className='dark:text-white mb-2 text-sm font-bold text-gray-800'>
          <i className='mr-1 fas fa-book-open' />
          论文检索
        </div>
        <a
          href={PAPER_READER_URL}
          target='_blank'
          rel='noopener noreferrer'
          className='flex items-center gap-2 px-3 py-2 rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-100 dark:border-blue-800 hover:shadow-md transition-all duration-200 text-sm text-blue-700 dark:text-blue-300'
        >
          <span className='text-lg'>🔍</span>
          <div>
            <div className='font-medium'>Daily Paper Reader</div>
            <div className='text-xs opacity-70'>每日论文推荐 →</div>
          </div>
        </a>
      </div>

      {/* AI HOT 分类导航 */}
      {aiHotCategories?.length > 0 && (
        <div className='px-3'>
          <div className='dark:text-white mb-2 text-sm font-bold text-gray-800'>
            <i className='mr-1 fas fa-newspaper' />
            AI HOT
          </div>
          <div className='space-y-1'>
            {aiHotCategories.map(cat => (
              <SmartLink
                key={cat.name}
                href={`/category/${encodeURIComponent(cat.name)}`}
                className='flex items-center justify-between px-3 py-1.5 rounded-md text-sm hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors'
              >
                <span>
                  <i className='fas fa-folder mr-2 text-yellow-500' />
                  {cat.name}
                </span>
                <span className='text-xs text-gray-400'>{cat.count}</span>
              </SmartLink>
            ))}
          </div>
        </div>
      )}

      {/* 近期 AI HOT */}
      {recentAiPosts?.length > 0 && (
        <div className='px-3'>
          <div className='dark:text-white mb-2 text-sm font-bold text-gray-800'>
            <i className='mr-1 fas fa-clock' />
            近期文章
          </div>
          <div className='space-y-2'>
            {recentAiPosts.map(post => (
              <SmartLink
                key={post.id}
                href={post.href}
                className='flex gap-2 px-1 py-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors'
              >
                {post.pageCoverThumbnail && (
                  <LazyImage
                    src={post.pageCoverThumbnail}
                    className='w-10 h-10 rounded object-cover flex-shrink-0'
                  />
                )}
                <div className='flex-1 min-w-0'>
                  <div className='text-sm truncate'>{post.title}</div>
                  <div className='text-xs text-gray-400'>{post.date?.start_date}</div>
                </div>
              </SmartLink>
            ))}
          </div>
        </div>
      )}

      {/* 公告 */}
      <Announcement post={notice} />
    </div>
  )
}
