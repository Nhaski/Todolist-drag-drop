import React, {useState} from "react";
import './App.css';
// import Counter from './components/Counter'
// import MyButton from "./components/UI/button/MyButton";

const App = () => {
  const [cardlist, setCardList] = useState ([
    {id: 1, order: 3, text: 'карточка 3'},
    {id: 2, order: 1, text: 'карточка 1'},
    {id: 3, order: 2, text: 'карточка 2'},
    {id: 4, order: 4, text: 'карточка 4'},
  ])

  const [currentCard, setCurrentCard] = useState(null);  // запоминаем взятую карточку

  function onDragStartHandler(e, card) {
    console.log('drag', card);
    setCurrentCard(card)
  }

  function dragEndHandler(e) {
    e.target.style.background = 'white'
  }

  function dragOverHandler(e) {
    e.preventDefault()
    e.target.style.background = 'lightgray'
  }

  function dropHandler(e, card) {
    e.preventDefault()
    // меняем карточки местами (меняем исходный массив)
    // если текущий эл-т массива и его id = карточки в кот-ю закидываем 
    // то этой карточке (она снизу) присваиваем порядок карточки кот-ю держим
    setCardList(cardlist.map(c => {
      if (c.id === card.id) {
        return {...c, order: currentCard.order}
      }
      if (c.id === currentCard.id) {
        return {...c, order: card.order}
      }
      return c
    }))
    e.target.style.background = 'white'
  }

  //  создаем сортировочную функцию 
  const sortCards = (a, b) => {
    if(a.order > b.order) {
      return 1
    } else {
      return -1
    }

  }

  return (
    <div className="app">
      {cardlist.sort(sortCards).map(card => 
        <div
          onDragStart={(e) => onDragStartHandler(e, card)} // срабатывает когда взяли карточку
          onDragLeave={(e) => dragEndHandler(e)} // вышли за пределы другой карточки
          onDragEnd={(e) => dragEndHandler(e)} // отпустили перемещение
          onDragOver={(e) => dragOverHandler(e)} // находимся над другим объектом
          onDrop={(e) => dropHandler(e, card)} // отпустили карточку и раасчитываем на какое-то событие

          draggable={true}
          className={'card'}>
          {card.text} 
        </div>  
      )}
    </div>
  )
}

export default App;