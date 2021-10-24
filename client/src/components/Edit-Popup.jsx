import React from 'react';
import {useForm} from 'react-hook-form';
import axios from 'axios';


import './Edit-Popup.css';

function EditPopup(props) {
  const {register, formState: {errors}, handleSubmit} = useForm();

  const onSubmit = (data) => {
    axios
      .post('/orders/update', {
        orderId: props.orderId,
        revenue: data.revenue,
        cost: data.cost
      })
      .then((res) => {
        console.log(res);

        props.setList(oldList => {
          let newList = JSON.parse(JSON.stringify(oldList));
          newList[props.driverI].orders[props.orderI].revenue = Number(data.revenue);
          newList[props.driverI].orders[props.orderI].cost = Number(data.cost);
          return newList;
        })
        props.setTrigger(false);
      })
  }

  return (props.trigger) ? (
    <div className="edit-popup">
      <div className="popup-inner">
        <button className="close-btn" onClick={() => props.setTrigger(false)}>close</button>
        <div>
          Description:<br />
          {props.children}
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label>
            Revenue:<br />
            <input {...register("revenue", {required: true})} type="number" step="0.01" placeholder={props.revenue} />
          </label>
          <label>
            Cost:<br />
            <input {...register("cost", {required: true})} type="number" step="0.01" placeholder={props.cost} />
          </label>
          <span>{errors.revenue && "Revenue is required"}</span>
          <span>{errors.cost && "Cost is required"}</span>
          <br /><br />
          <input className="submit-btn" type="submit" />
        </form>
      </div>
    </div>
  ) : "";
}

export default EditPopup
