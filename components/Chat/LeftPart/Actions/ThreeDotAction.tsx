import React from 'react'
import { Avatar, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, List, ListItem, ListItemAvatar, ListItemButton, ListItemText } from '@mui/material'
import UserIco from '@/components/assets/UserIco'
import UsersGroup from '@/components/assets/UsersGroupIco'
import SettingsIco from '@/components/assets/SettingsIco'

type ThreeDotActionDto = {
    setOpen: any,
    setThreeDotActionResult: any,
    open: boolean
}

const ThreeDotAction = ({ setOpen, open, setThreeDotActionResult }: ThreeDotActionDto) => {

    const handleClose = () => {
        setOpen(false);
    };
    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {"More options"}
            </DialogTitle>
            <List sx={{ pt: 0 }}>
                <ListItem disableGutters key={"New Contact"}>
                    <ListItemButton onClick={() => {
                        setThreeDotActionResult("AddUser")
                        setOpen(false);
                    }}>
                        <UserIco width={20} height={20} />
                        <ListItemText primary={"New Contact"} style={{ "marginLeft": "10px" }} />
                    </ListItemButton>
                </ListItem>
                <ListItem disableGutters key={"New Group"}>
                    <ListItemButton onClick={() => {
                        setThreeDotActionResult("CreateGroup")
                        setOpen(false);
                    }}>
                        <UsersGroup width={20} height={20} />
                        <ListItemText primary={"New Group"} style={{ "marginLeft": "10px" }} />
                    </ListItemButton>
                </ListItem>
                <ListItem disableGutters key={"Settings"}>
                    <ListItemButton onClick={() => { console.log("dfsf") }}>
                        <SettingsIco width={20} height={20} color={'black'} />
                        <ListItemText primary={"Settings"} style={{ "marginLeft": "10px" }} />
                    </ListItemButton>
                </ListItem>
            </List>
        </Dialog>
    )
}

export default ThreeDotAction
