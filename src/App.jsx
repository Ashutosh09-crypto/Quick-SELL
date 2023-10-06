import { useEffect, useState } from 'react'
import './App.css'
import Card from './card'
import CardList from './CardList';
import { v4 as uuidv4 } from 'uuid';

import {
  groupBy, titleComparator, priortyCompator,
  getSavedGrouping, getSavedOrdering, priorityToText
} from './utils';
import UserPhoto from './UserPhoto';

const userNames = new Map();

function App() {
  const [data, setData] = useState(0)
  const [grouping, setGrouping] = useState(getSavedGrouping)
  const [ordering, setOrdering] = useState(getSavedOrdering)
  const [cardLists, setCardLists] = useState([{}])


  async function fetch_user_data() {
    const response = await fetch("https://api.quicksell.co/v1/internal/frontend-assignment");
    const jsonResponse = await response.json();
    jsonResponse.tickets = jsonResponse.tickets.map((t) => {
      const taskUser = jsonResponse.users[parseInt(t.userId.split("-")[1]) - 1];
      userNames.set(t.userId, taskUser);
      return { ...t, user: taskUser };
    })
    return jsonResponse;
  }

  const handleGroupingChange = (e) => {
    const newGrouping = e.target.value;
    localStorage.setItem('grouping', newGrouping);
    setGrouping(newGrouping);
    updateCardList(newGrouping, ordering, data)
  }

  const handleOrderingChange = (e) => {
    const newOrdering = e.target.value;
    localStorage.setItem('ordering', newOrdering);
    setOrdering(newOrdering);
    updateCardList(grouping, newOrdering, data)
  }

  const updateCardList = (groupingPar, orderingPar, jsonResponse) => {

    const groupedData = groupBy(jsonResponse.tickets, d => d[groupingPar])
    let newCL = []
    groupedData.forEach((value, key) => {
      let nm = key
      let displayProp = key
      if (groupingPar === "userId") {
        console.log(key)
        nm = userNames.get(key).name
        displayProp = <UserPhoto availableStatus={userNames.get(key).available} />
      }
      else if (groupingPar === "priority") {
        nm = priorityToText(key)
      }

      newCL.push({
        listName: nm,
        tasks: value.sort(orderingPar === "title" ? titleComparator : priortyCompator),
        prop: displayProp
      })
    })
    setCardLists(newCL)
  }

  useEffect(() => {
    fetch_user_data().then((jsonResponse) => {
      setData(jsonResponse);
      updateCardList(grouping, ordering, jsonResponse);
    });
  }, []);


  return (
    <div className='wrapper'>
      <div className='navbar'>

        {/* this part can be componented for modularity */}

        <label>Grouping
          <select onChange={handleGroupingChange} defaultValue={grouping}>
            <option value="userId">User</option>
            <option value="status">Status</option>
            <option value="priority">Priority</option>
          </select>
        </label>

        <label>
          Ordering
          <select onChange={handleOrderingChange} defaultValue={ordering}>
            <option value="title">Title</option>
            <option value="priority">Priority</option>
          </select>
        </label>
      </div>

      <div className='cardlist-wrapper'>
        {cardLists.map((cardlist) => {
          return <CardList key={uuidv4()} tasks={cardlist.tasks}
            listName={cardlist.listName}
            displayProp={cardlist.prop} />
        })}
      </div>

    </div>
  );
}

export default App