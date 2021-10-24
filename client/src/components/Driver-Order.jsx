import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';

import EditPopup from './Edit-Popup';
import DeleteConfirmation from './Delete-Confirmation';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEquals, faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons'

function DriverOrder() {
  const [list, setList] = useState([]);
  const [dragging, setDragging] = useState(false);
  const [buttonPopup, setButtonPopup] = useState(false);
  const [confirmationPopup, setConfirmationPopup] = useState(false);

  useEffect(() => {
    axios
      .get('/orders')
      .then((res) => {
        const data = res.data;
        setList(data);
        console.log(data)
      })
  },[]);

  const dragItem = useRef();
  const dragNode = useRef();
  const dragOrderId = useRef();
  const dragDriverId = useRef();

  const handleDragStart = (e, params, orderId) => {
    console.log('drag starting..', params)
    dragOrderId.current = orderId;
    dragItem.current = params;
    dragNode.current = e.target;
    dragNode.current.addEventListener('dragend', handleDragEnd);
    setTimeout(() => {
      setDragging(true);
    }, 0)
  }

  const handleDragEnter = (e, params, driverId) => {
    console.log('Entering drag..', params);
    dragDriverId.current = driverId;
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

    axios
      .post('/orders/assign', {
        orderId: dragOrderId.current,
        driverId: dragDriverId.current
      })
      .then((res) => {
        console.log(res);
      })

    setDragging(false);
    dragNode.current.removeEventListener('dragend', handleDragEnd);
    dragItem.current = null;
    dragNode.current = null;
    dragOrderId.current = null;
    dragDriverId.current = null;
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
              key={driver._id} 
              className="dnd-group"
              onDragEnter={dragging && !driver.orders.length?(e) => handleDragEnter(e, {driverI, orderI: 0}):null}
              onDragOver={(e) => {e.preventDefault()}}
            >
              <div className="group-title">{driver.fullname}</div>
              {driver.orders.map((order, orderI) => (
                <div
                  draggable={buttonPopup || confirmationPopup? false : true}
                  onDragOver={(e) => {e.preventDefault()}}
                  onDragStart={(e) => {handleDragStart(e, {driverI, orderI}, order._id)}}
                  onDragEnter={dragging?(e) => {handleDragEnter(e, {driverI, orderI}, driver._id)}:null}
                  key={order._id} 
                  className={dragging?getStyles({driverI, orderI}):"dnd-item"}
                >
                  <div className="equal-icon"><FontAwesomeIcon icon={faEquals} /></div>
                  <button 
                    className="edit-icon"
                    onClick={() => setButtonPopup(order._id)}
                  >
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                  <button 
                    className="delete-icon"
                    onClick={() => setConfirmationPopup(order._id)}
                  >
                    <FontAwesomeIcon icon={faTrashAlt} />
                  </button>
                  <div>{order.description}</div>
                  <div>Revenue: $<span className="green">{order.revenue.toFixed(2)}</span></div>
                  <div>Cost: $<span className="red">{order.cost.toFixed(2)}</span></div>
                  <div className="order-id">order-id: {order._id}</div> 
                  <EditPopup
                    setList={setList}
                    revenue={order.revenue}
                    cost={order.cost}
                    orderId={order._id}
                    driverI={driverI}
                    orderI={orderI}
                    trigger={(buttonPopup === order._id)? true : false}
                    setTrigger={setButtonPopup}
                    >
                    <h3>{order.description}</h3>
                  </EditPopup>
                  <DeleteConfirmation
                    setList={setList}
                    orderId={order._id}
                    driverI={driverI}
                    orderI={orderI}
                    trigger={(confirmationPopup === order._id)? true: false}
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