export type selecteChatDto = {
    oponentId: String,
    oponentName: String,
    oponentPic: string
    belongsTo: string
}

export type ChatUserListDto = {
    selectedChat: selecteChatDto,
    setSelectedChat: any
}

export type ChatMessageDto = {
    selectedChat: selecteChatDto,
    socket :any
}



export type ChatActionsDto = {
    selectedChat: selecteChatDto
    socket : any
} 
