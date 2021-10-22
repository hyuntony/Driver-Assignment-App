import React, {useState, useRef} from 'react';

function DriverOrder({data}) {
  const [list, setList] = useState(data);
  const [dragging, setDragging] = useState(false);

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
                  draggable
                  onDragOver={(e) => {e.preventDefault()}}
                  onDragStart={(e) => {handleDragStart(e, {driverI, orderI})}}
                  onDragEnter={dragging?(e) => {handleDragEnter(e, {driverI, orderI})}:null}
                  key={order.id} 
                  className={dragging?getStyles({driverI, orderI}):"dnd-item"}
                >
                  <div>{order.description}</div>
                  <div>Revenue: $<span style={{ color: 'green' }}>{order.revenue}</span></div>
                  <div>Cost: $<span style={{ color: 'red' }}>{order.cost}</span></div>
                </div>
              ))}
            </div>
          ))}
        </div>
  )
}

export default DriverOrder;