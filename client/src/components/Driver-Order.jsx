import React, { useState, useRef } from 'react';

import EditPopup from './Edit-Popup';
import DeleteConfirmation from './Delete-Confirmation';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEquals, faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons'

function DriverOrder({data}) {
  const [list, setList] = useState(data);
  const [dragging, setDragging] = useState(false);
  const [buttonPopup, setButtonPopup] = useState(false);
  const [confirmationPopup, setConfirmationPopup] = useState(false);

  const dragItem = useRef();
  const dragNode = useRef();

  const handleDragStart = (e, params) => {
    console.log('drag starting..', params)
    dragItem.current = params;
    dragNode.current = e.target;
    dragNode.current.addEventListener('dragend', handleDragEnd);
    setTimeout(() => {
      setDragging(true);
    }, 0)
  }

  const handleDragEnter = (e, params) => {
    console.log('Entering drag..', params)
    const currentItem = dragItem.current;
    if (e.target !== dragNode.current) {
      console.log("TARGET IS NOT THE SAME");
      setList(oldList => {
        let newList = JSON.parse(JSON.stringify(oldList));
        newList[params.driverI].orders.splice(params.orderI, 0, newList[currentItem.driverI].orders.splice(currentItem.orderI, 1)[0])
        dragItem.current = params
        return newList
      })
    }
  }

  const handleDragEnd = () => {
    console.log('Ending drag..')
    setDragging(false);
    dragNode.current.removeEventListener('dragend', handleDragEnd);
    dragItem.current = null;
    dragNode.current = null;
  }

  const getStyles = (params) => {
    const currentItem = dragItem.current;
    if (currentItem.driverI === params.driverI && currentItem.orderI === params.orderI) {
      return 'current dnd-item'
    }
    return 'dnd-item'
  }

  return (
    <div className="drag-drop">
          {list.map((driver, driverI) => (
            <div 
              key={driver.fullname} 
              className="dnd-group"
              onDragEnter={dragging && !driver.orders.length?(e) => handleDragEnter(e, {driverI, orderI: 0}):null}
              onDragOver={(e) => {e.preventDefault()}}
            >
              <div className="group-title">{driver.fullname}</div>
              {driver.orders.map((order, orderI) => (
                <div
                  draggable={buttonPopup || confirmationPopup? false : true}
                  onDragOver={(e) => {e.preventDefault()}}
                  onDragStart={(e) => {handleDragStart(e, {driverI, orderI})}}
                  onDragEnter={dragging?(e) => {handleDragEnter(e, {driverI, orderI})}:null}
                  key={order.id} 
                  className={dragging?getStyles({driverI, orderI}):"dnd-item"}
                >
                  <div className="equal-icon"><FontAwesomeIcon icon={faEquals} /></div>
                  <button 
                    className="edit-icon"
                    onClick={() => setButtonPopup(order.id)}
                  >
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                  <button 
                    className="delete-icon"
                    onClick={() => setConfirmationPopup(order.id)}
                  >
                    <FontAwesomeIcon icon={faTrashAlt} />
                  </button>
                  <div>{order.description}</div>
                  <div>Revenue: $<span className="green">{order.revenue}</span></div>
                  <div>Cost: $<span className="red">{order.cost}</span></div>
                  <EditPopup
                    setList={setList}
                    revenue={order.revenue}
                    cost={order.cost}
                    driverI={driverI}
                    orderI={orderI}
                    trigger={(buttonPopup === order.id)? true : false}
                    setTrigger={setButtonPopup}
                    >
                    <h3>{order.description}</h3>
                  </EditPopup>
                  <DeleteConfirmation
                    setList={setList}
                    driverI={driverI}
                    orderI={orderI}
                    trigger={(confirmationPopup === order.id)? true: false}
                    setTrigger={setConfirmationPopup}
                  >
                    <h3>Are you sure you want to delete the Order?</h3>
                  </DeleteConfirmation>
                </div>
              ))}
            </div>
          ))}
        </div>
  )
}

export default DriverOrder;