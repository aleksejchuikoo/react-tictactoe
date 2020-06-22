import React, { Component } from 'react'
import './Modal.css'

export class Modal extends Component {

  render() {
    let {symb, isOpen, handlerClose, draw, win} = this.props
    return (
      <div className='modalOverlay' style={isOpen ? {display: 'flex'} : {display: 'none'}}>
        <div className="modalWindow">
          <div className="modal-header">
            <div className="modal-title">
              Congratulations!
            </div>
            <div>
              <button onClick={handlerClose} className="btn-close">&times;</button>
            </div>
          </div>
          <div className="modal-body">
            {draw && 'Draw! Friendship won.'}
            {win && `Winner ${symb}`}
          </div>
          <div className="modal-footer">
            <button onClick={handlerClose} className="btn btn-close">
              Close
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default Modal
