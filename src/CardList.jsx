import { useState } from "react";
import Card from "./card";
import UserPhoto from "./UserPhoto";
import Priority from "./priority";

import "./CardList.css"


function CardList({ tasks, listName, displayProp }) {
    // const taskCards = ;
    if (tasks === undefined)
        return (<></>);

    return (
        <div className="card-list-wrapper" >
            <div className="list-header">
                <div className="list-heading">
                    {displayProp}
                    <span className="list-name">{listName}</span>
                    <span>{tasks.length}</span>
                </div>
                <div className="list-buttons">
                    <button>+</button>
                    <button>-</button>
                </div>
            </div>
            {
                tasks.map((t) => {
                    return <Card key={t.id} task={t}></Card>
                })
            }

        </div >
    );
}


export default CardList;