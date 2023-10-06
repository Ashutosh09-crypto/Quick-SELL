function groupBy(list, keyGetter) {
    if (list === undefined)
        return;
    const map = new Map();
    list.forEach((item) => {
        const key = keyGetter(item);
        const collection = map.get(key);
        if (!collection) {
            map.set(key, [item]);
        } else {
            collection.push(item);
        }
    });
    return map;
}

function titleComparator(a, b) {
    return (a.title).localeCompare(b.title);
}

function priortyCompator(a, b) {
    return (a.priority) > (b.priority) ? 1 : -1;
}

function getSavedGrouping() {
    return localStorage.getItem("grouping") || "userId";
}

function getSavedOrdering() {
    return localStorage.getItem("ordering") || "title";
}

function priorityToText(priority) {
    let priorities = ["No Priority", "Low", "Medium", "High", "Urgent"]
    return priorities[priority];
}

export { groupBy, titleComparator, priortyCompator, getSavedGrouping, getSavedOrdering, priorityToText };