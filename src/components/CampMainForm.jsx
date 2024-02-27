import React from 'react';
import { Card } from 'antd';

const { Meta } = Card;
function TextExample() {
  // Sample data
  const cardData = [
    {
      id: 1,
      title: 'Card Title 1',
      subtitle: 'Card Subtitle 1',
      text: 'Some quick example text for Card 1.',
      link1: 'Card Link 1',
      link2: 'Another Link 1'
    },
    {
      id: 2,
      title: 'Card Title 2',
      subtitle: 'Card Subtitle 2',
      text: 'Some quick example text for Card 2.',
      link1: 'Card Link 2',
      link2: 'Another Link 2'
    },
    {
      id: 2,
      title: 'Card Title 2',
      subtitle: 'Card Subtitle 2',
      text: 'Some quick example text for Card 2.',
      link1: 'Card Link 2',
      link2: 'Another Link 2'
    },
    {
      id: 2,
      title: 'Card Title 2',
      subtitle: 'Card Subtitle 2',
      text: 'Some quick example text for Card 2.',
      link1: 'Card Link 2',
      link2: 'Another Link 2'
    },
    {
      id: 2,
      title: 'Card Title 2',
      subtitle: 'Card Subtitle 2',
      text: 'Some quick example text for Card 2.',
      link1: 'Card Link 2',
      link2: 'Another Link 2'
    },
    {
      id: 2,
      title: 'Card Title 2',
      subtitle: 'Card Subtitle 2',
      text: 'Some quick example text for Card 2.',
      link1: 'Card Link 2',
      link2: 'Another Link 2'
    },
    {
      id: 2,
      title: 'Card Title 2',
      subtitle: 'Card Subtitle 2',
      text: 'Some quick example text for Card 2.',
      link1: 'Card Link 2',
      link2: 'Another Link 2'
    },
    {
      id: 2,
      title: 'Card Title 2',
      subtitle: 'Card Subtitle 2',
      text: 'Some quick example text for Card 2.',
      link1: 'Card Link 2',
      link2: 'Another Link 2'
    },
    {
      id: 2,
      title: 'Card Title 2',
      subtitle: 'Card Subtitle 2',
      text: 'Some quick example text for Card 2.',
      link1: 'Card Link 2',
      link2: 'Another Link 2'
    },
    {
      id: 2,
      title: 'Card Title 2',
      subtitle: 'Card Subtitle 2',
      text: 'Some quick example text for Card 2.',
      link1: 'Card Link 2',
      link2: 'Another Link 2'
    },
    {
      id: 2,
      title: 'Card Title 2',
      subtitle: 'Card Subtitle 2',
      text: 'Some quick example text for Card 2.',
      link1: 'Card Link 2',
      link2: 'Another Link 2'
    },
    {
      id: 2,
      title: 'Card Title 2',
      subtitle: 'Card Subtitle 2',
      text: 'Some quick example text for Card 2.',
      link1: 'Card Link 2',
      link2: 'Another Link 2'
    },
    {
      id: 2,
      title: 'Card Title 2',
      subtitle: 'Card Subtitle 2',
      text: 'Some quick example text for Card 2.',
      link1: 'Card Link 2',
      link2: 'Another Link 2'
    },
    {
      id: 2,
      title: 'Card Title 2',
      subtitle: 'Card Subtitle 2',
      text: 'Some quick example text for Card 2.',
      link1: 'Card Link 2',
      link2: 'Another Link 2'
    },
    {
      id: 2,
      title: 'Card Title 2',
      subtitle: 'Card Subtitle 2',
      text: 'Some quick example text for Card 2.',
      link1: 'Card Link 2',
      link2: 'Another Link 2'
    },
    // Add more data as needed
  ];

  const handleCardClick = (index) => {
    console.log(`Card clicked with index: ${index}`);
  };

  return (
    <>
      {cardData.map((item, index) => (
        <Card
          key={item.id}
          hoverable
          style={{ width: 240, border: '10px solid blue', textAlign: 'center', margin: '1rem' }}
          onClick={() => handleCardClick(index)}
        >
          <Meta title={item.title} description={item.text} />
        </Card>
      ))}

      
    </>
  );
}

export default TextExample;
