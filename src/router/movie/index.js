export default {
    path: "/movie",
    component: () => import('@/views/Movie'),
    children: [
        // 重定向
        {
            path: '/',
            redirect: '/movie/nowPlaying'
        },
        {
            path: 'city',
            component: () => import('@/components/City')
        },
        {
            path: 'nowPlaying',
            component: () => import('@/components/NowPlaying')
        },
        {
            path: 'comingSoon',
            component: () => import('@/components/ComingSoon')
        },
        {
            path: 'search',
            component: () => import('@/components/Search')
        },
        {
            path: 'detail/1/:movieId',
            components: {
                default: () => import('@/components/NowPlaying'),
                detail: () => import('@/views/Movie/detail')
            },
            props: {
                detail: true
            }
        },
        {
            path: 'detail/2/:movieId',
            components: {
                default: () => import('@/components/ComingSoon'),
                detail: () => import('@/views/Movie/detail')
            },
            props: {
                detail: true
            }
        }
    ]
}
