import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";
import React, {useState} from "react";


type Props = { isOpened: boolean, handleAgree: () => void, handleClose: () => void, handleDisagree: () => void }
export const ConfirmationDialog: React.FC<Props> = ({isOpened, handleAgree, handleClose, handleDisagree}) => {

    return <React.Fragment>
        <Dialog open={isOpened} onClose={handleClose}>
            <DialogTitle>Are you sure?</DialogTitle>
            <DialogContent>
                <DialogContentText>This changes cannot be discarded after confirmation</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => {handleDisagree();handleClose()}}>Disagree</Button>
                <Button onClick={()=> {handleAgree();handleClose()}} autoFocus>Agree</Button>
            </DialogActions>
        </Dialog>
    </React.Fragment>


}
