import { useState } from 'react';
import Logo from './components/Logo';
import Form from './components/Form';
import PackingList from './components/PackingList';
import Stats from './components/Stats';

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

  function handleClearList() {
    // alert
    const confirmed = window.confirm(
      'Are you sure you want to delete all items?'
    );
    //also pass in contion to the state item
    if (confirmed) setItems([]);
  }

  return (
    <div className='app'>
      <Logo />
      <Form onAddItem={handleAddItems} />
      <PackingList
        items={items}
        onDeleteItem={handleDeleteItem}
        onToggleItems={handleToggleItem}
        onClearList={handleClearList}
      />
      <Stats items={items} />
    </div>
  );
}
