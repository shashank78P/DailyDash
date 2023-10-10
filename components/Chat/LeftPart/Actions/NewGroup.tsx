import { Avatar, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, List, ListItem, ListItemAvatar, ListItemButton, ListItemText } from '@mui/material'
import React from 'react'

type ThreeDotActionResultDto = {
    setThreeDotActionResult: any,
    ThreeDotActionResult: any,
}

const NewGroup = ({ setThreeDotActionResult, ThreeDotActionResult }: ThreeDotActionResultDto) => {

    const [checked, setChecked] = React.useState([1]);

    const handleToggle = (value: number) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };

    console.log(checked);

    return (
        <>
            <Dialog
                open={ThreeDotActionResult == "CreateGroup"}
                onClose={() => {

                }}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    Create New Group
                </DialogTitle>
                <DialogContent>
                    <h1 className='text-sm'>Add email</h1>
                    <input type="email" name="" id="" className='w-[300px] border p-2 my-2 mb-2 rounded-lg' autoFocus={true} />
                    <p className='text-red-500 text-xs'>Not found</p>
                
                    <List dense sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                        {[0, 1, 2, 3,4,5,6,7,8,9,10].map((value) => {
                            const labelId = `checkbox-list-secondary-label-${value}`;
                            return (
                                <ListItem
                                    key={value}
                                    secondaryAction={
                                        <Checkbox
                                            edge="end"
                                            onChange={handleToggle(value)}
                                            checked={checked.indexOf(value) !== -1}
                                            inputProps={{ 'aria-labelledby': labelId }}
                                        />
                                    }
                                    disablePadding
                                >
                                    <ListItemButton>
                                        <ListItemAvatar>
                                            <Avatar
                                                alt={`Avatar n°${value + 1}`}
                                                src={`/static/images/avatar/${value + 1}.jpg`}
                                            />
                                        </ListItemAvatar>
                                        <ListItemText id={labelId} primary={`Line item ${value + 1}`} />
                                    </ListItemButton>
                                </ListItem>
                            );
                        })}
                    </List>
                </DialogContent>
                <DialogActions>
                    <button className='mx-2 text-red-500'
                        onClick={() => {
                            setThreeDotActionResult("")
                        }}
                    >Cancel</button>
                    <button className='mx-2 p-2 px-4 rounded-lg text-white border border-blue-700 bg-blue-700'>Find</button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default NewGroup
