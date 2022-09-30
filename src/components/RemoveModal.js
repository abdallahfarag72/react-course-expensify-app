import React from "react";
import Modal from "react-modal";

const RemoveModal = (props) => {
    return (
        <div>
            <Modal
                isOpen={props.modalOpen}
                onRequestClose={props.handleRemoveModal}
                ariaHideApp={false} // removing the app element error
                contentLabel={'Remove Confirmation'} // for accessability purpose only
                closeTimeoutMS={200}
                className={'modal'}
            >
                <h3 className="modal__title" >Are you sure you want to remove this expense?</h3>
                <div className="modal__buttons">
                    <button className="button" onClick={props.onRemove} >Remove Expense</button>
                    <button className="button button--secondary" onClick={props.handleRemoveModal} >Cancel</button>
                </div>
            </Modal>
        </div>
    )
}

export default RemoveModal
