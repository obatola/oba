import React, { useEffect, useState } from 'react';
import { useFetch } from '../../Hooks/useFetch';
import { fetchAPI } from '../../utils';

interface IActivity {
    activity: string;
    type: string;
    participants: number;
    price: number;
    link: string;
    key: string;
    accessibility: number;
}

interface IActivityViewerProps {
    activity: IActivity | null;
}

const ActivityViewer = ({activity}: IActivityViewerProps) => {
    if (!activity) {
        return (<>sorry no activity today</>)
    }

    return (
        <div>
            <div>activity: {activity.activity}</div>
            <div>type: {activity.type}</div>
            <div>accessibility: {activity.accessibility}</div>
            <div>price: {activity.price > 0 ? `$${activity.price}` : 'Free!!!' }</div>
            <div>participants: {activity.participants} people</div>
        </div>
    )
}

export const ActivityOfTheDay = () => {
    const {response: activity, error, isLoading, doFetch: fetchActivity} = useFetch<IActivity>('https://www.boredapi.com/api/activity');

    useEffect(() => {
        fetchActivity();
    }, []);

    if (isLoading) {
        return <div>loading activity...</div>
    }

    return (
        <div>
            <ActivityViewer activity={activity} />
        </div>
    )
}