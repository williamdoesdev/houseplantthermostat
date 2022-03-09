import React from "react"

export default function Rec(props) {
  return (
    <div className="rec-container">
      <img src={props.icon} />
      <div className="rec-info">
        <div className="rec-info-datapoint">
          <h2>{props.ideal}</h2>
          <div className="rec-info-datapoint-labels">
            <div className="rec-info-datapoint-flexbox">
              <img src={props.unit} alt="" />
              <p>Ideal</p>
            </div>
          </div>
        </div>
        <div className="rec-info-datapoint">
          <h2>{props.min}</h2>
          <div className="rec-info-datapoint-labels">
            <div className="rec-info-datapoint-flexbox">
              <img src={props.unit} alt="" />
              <p>Min</p>
            </div>
          </div>
        </div>
        <div className="rec-info-datapoint">
          <h2>{props.max}</h2>
          <div className="rec-info-datapoint-labels">
            <div className="rec-info-datapoint-flexbox">
              <img src={props.unit} alt="" />
              <p>Max</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
