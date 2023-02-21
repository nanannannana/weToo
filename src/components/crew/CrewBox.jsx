import React, { useEffect, useState } from 'react';
import crewdata from '../../crewdata.js';
import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector } from 'react-redux';
import classes from './CrewBox.module.css';
import ChatBox from './ChatBox.jsx';

const CrewBox = () => {
  let [crews] = useState(crewdata);
  const crew = useSelector((state) => state.crew.crewInfo);
  console.log('crew', crew);

  const [content, setContent] = useState({
    id: 0,
    title: 'Weto',
    content: 'Welcome to the Weto!!😊',
  });

  const handleClickButton = (e) => {
    const { id } = e.target;
    setContent(id);
    console.log(id);
  };

  return (
    <>
      <div className={classes.crewBoxContainer}>
        {crew.map((v, i) => (
          <>
            <div className={classes.crewBox}>
              <img alt="img" src={v.image} className={classes.crewImg} />
              <Button
                variant="light"
                onClick={handleClickButton}
                //  id={v.id}
                key={i}
              >
                {v.title}
              </Button>
            </div>
          </>
        ))}
        {/* {crews.map((data, i) => {
          return (
            <>
              <div className={classes.crewBox}>
                <Card crews={crews[i]} i={i} />
                <Button
                  variant="light"
                  onClick={handleClickButton}
                  id={data.id}
                  key={data.id}
                >
                  {data.title}
                </Button>
              </div>
            </>
          );
        })} */}

        {/* {content && <div className={classes.CrewContentBox}>sdfsf</div>} */}
      </div>
      <div className={classes.mainChatBox}>
        <ChatBox content={content} />
      </div>
    </>
  );
};

export default CrewBox;

// function Card(props) {
//   let [crews] = useState(crewdata);
//   return (
//     <div>
//       <div>

//       </div>
//     </div>
//   );
// }
