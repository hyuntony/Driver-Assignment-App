import React from 'react'
import './Delete-Confirmation.css'

function DeleteConfirmation(props) {
  const onClick = () => {
    props.setList(oldList => {
      let newList = JSON.parse(JSON.stringify(oldList));
      newList[props.driverI].orders.splice(props.orderI, 1);
      return newList;
    })
    props.setTrigger(false);
  }

  return (props.trigger) ? (
    <div className="delete-popup">
      <div className="popup-inner">
        <button className="close-btn" onClick={() => props.setTrigger(false)}>close</button>
        {props.children}<br />
        <button className="delete-btn" onClick={() => onClick()}>Delete</button>
      </div>
    </div>
  ) : "";
}

export default DeleteConfirmation
