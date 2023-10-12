export type selecteChatDto = {
    opponentId: String,
    opponentPic: string,
    opponentName: String,
    belongsTo: string,
    type: string,
}

export type ChatUserListDto = {
    selectedChat: selecteChatDto,
    setSelectedChat: any
    refetchList : any
    refetchUnReadMessages? : any
}

export type ChatMessageDto = {
    selectedChat: selecteChatDto,
    socket :any,
    refetch : any
    setRefetchList: any
}



export type ChatActionsDto = {
    selectedChat: selecteChatDto
    socket : any
} 
