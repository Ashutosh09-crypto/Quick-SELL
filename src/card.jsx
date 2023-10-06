import { useEffect, useState } from 'react'
import Priority from './priority';
import UserPhoto from './UserPhoto';
import Status from './Status';
import Tag from "./Tag";
import './Card.css'


function Card({ task }) {
    const taskTags = task.tag.map((tagName) => {
        return <Tag key={tagName} tagName={tagName} />;
    });
    return (
        <div className="card">
            <div className="task-detail">
                <p>{task.id}</p>
                <div className="flex-wrapper">

                    {/* wrap this status inside a condition */}
                    {/* not shown if the grouping is by progress */}
                    <Status status={1}></Status>


                    <h1 className="task-title">{task.title}</h1>
                </div>

                <div className="flex-wrapper">

                    {/* not shown if the grouping is by priority */}
                    <Priority priority={task.priority}></Priority>
                    <div className="tag-list">{taskTags}</div>

                </div>
            </div>

            {/* not shown if the grouping is by user */}
            <UserPhoto availableStatus={true} />
        </div>
    );
}

export default Card;