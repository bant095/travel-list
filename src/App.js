import { useState } from 'react';

// const initialItems = [
//   { id: 1, description: 'Passports', quantity: 2, packed: false },
//   { id: 2, description: 'Socks', quantity: 12, packed: true },
//   { id: 3, description: 'Charger', quantity: 1, packed: false },
// ];

export default function App() {
  ///// STATE FUNCTION //////
  const [items, setItems] = useState([]);

  ///////////FUNCTIONS ////////
  //ADD Function
  function handleAddItems(item) {
    setItems((items) => [...items, item]);
  }

  //DELETE FUNCTION
  function handleDeleteItem(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }

  //Update Function
  function handleToggleItem(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  /// CLEAR LIST FUNCTION

  return (
    <div className='app'>
      <Logo />
      <Form onAddItem={handleAddItems} />
      <PackingList
        items={items}
        onDeleteItem={handleDeleteItem}
        onToggleItems={handleToggleItem}
      />
      <Stats items={items} />
    </div>
  );
}

///////////////LOGO COMPONENT /////////
function Logo() {
  return <h1>Far Away </h1>;
}

//////////////////
//////// FORM COMPONENT //////

function Form({ onAddItem }) {
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();

    if (!description) return;

    const newItem = { description, quantity, packed: false, id: Date.now() };
    console.log(newItem);

    onAddItem(newItem);

    setDescription('');
    setQuantity(1);
  }

  //////// FORM UI AND FUNCTIONALITY
  //ADD ITEMS
  return (
    <form className='add-form' onSubmit={handleSubmit}>
      <h3>What do you need for your trip?</h3>
      <select
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type='text'
        placeholder='Item...'
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button>Add</button>
    </form>
  );
}

////////////////////////////////////
// Packing list component

function PackingList({ items, onDeleteItem, onToggleItems }) {
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
        <button>Clear List</button>
      </div>
    </div>
  );
}

/////////////////////////////
//ITEM COMPONENT

function Item({ item, onDeleteItem, onToggleItems }) {
  return (
    <li>
      {/* checkbox */}
      <input
        type='checkbox'
        value={item.packed}
        onChange={() => onToggleItems(item.id)}
      />
      <span style={item.packed ? { textDecoration: 'line-through' } : {}}>
        {item.quantity} {item.description}
      </span>
      <button className='btn' onClick={() => onDeleteItem(item.id)}>
        X
      </button>
    </li>
  );
}

/////////////////////////////
/////////STATS COMPONENT ////////

function Stats({ items }) {
  if (!items.length)
    return (
      <p className='stats'>
        <em>Start adding some items to your packing list</em>
      </p>
    );

  const numItems = items.length;
  //cal item packed
  const numPacked = items.filter((item) => item.packed).length;
  // calc percentage
  const percentage = Math.round((numPacked / numItems) * 100);

  return (
    <footer className='stats'>
      <em>
        {percentage === 100
          ? 'You got everything! Ready to go'
          : `You have ${numItems} items on your list, and you already packed
        ${numPacked} (${percentage}%)`}
      </em>
    </footer>
  );
}
