import { useState } from 'react';
import Item from './Item';

////////////////////////////////////
// Packing list component
export default function PackingList({
  items,
  onDeleteItem,
  onToggleItems,
  onClearList,
}) {
  ////// sort state ///////
  const [sortBy, setSortBy] = useState('input');

  let sortedItems;

  /////sorting condition for each items////
  // input
  if (sortBy === 'input') sortedItems = items;

  // description
  if (sortBy === 'description')
    sortedItems = items
      // slice take a copy of the array, its a muitating method
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));

  //packed
  if (sortBy === 'packed')
    sortedItems = items
      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed));

  return (
    <div className='list'>
      <ul>
        {sortedItems.map((item) => (
          <Item
            item={item}
            onDeleteItem={onDeleteItem}
            onToggleItems={onToggleItems}
            key={item.id}
          />
        ))}
      </ul>

      {/* SORTING ITEM */}
      <div className='actions'>
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value='input'>Sort by input order</option>
          <option value='description'>Sort by description</option>
          <option value='packed'>Sort by packed status</option>
        </select>
        {/* Clear list  button */}
        <button onClick={onClearList}>Clear List</button>
      </div>
    </div>
  );
}
