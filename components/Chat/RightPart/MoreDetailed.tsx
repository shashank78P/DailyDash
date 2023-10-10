import { Button, Menu, MenuItem, Select, Tab, Tabs } from '@mui/material'
import React from 'react'

const MoreDetailed = () => {
    const [value, setValue] = React.useState(2);
    const [age, setAge] = React.useState(2);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <Tabs
                value={value}
                indicatorColor='secondary'
                // textColor='primary'
                onChange={handleChange}
                style={{ width: "100%", margin: "10px 0" }}
            >
                <Tab label="chats" style={{ color: "#334155", width: "100%" }} />
                <Tab label="Docs" style={{ color: "#334155", width: "100%" }} />
                <Tab label="Media" style={{ color: "#334155", width: "100%" }} />
            </Tabs>
            <div>
                <Button
                    id="basic-button"
                    aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                >
                    Dashboard
                </Button>
                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                        'aria-labelledby': 'basic-button',
                    }}
                    style={{maxWidth : "900px" }}
                >
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex adipisci pariatur rem! Facilis aperiam ea nisi rerum, repellat sequi perferendis, aliquid maxime impedit ad enim nam laboriosam minima? Quam, ex?
                </Menu>
            </div>
        </>
    )
}

export default MoreDetailed
