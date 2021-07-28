import React from 'react'
import {useRouter} from 'next/router';

export default function EventPage (slug) {
    const router = useRouter();
    console.log(router)
    return (
        <div>
            Hi there mr {router.query.slug}
        </div>
    )
}
